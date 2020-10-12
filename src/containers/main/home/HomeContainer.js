import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Paths } from 'paths';

import SwipeableViews from 'react-swipeable-views';
import Message from '../../../components/message/Message';
import Title from 'components/titlebar/Title';
import styles from './HomeContainer.module.scss';
import BestMenuItemList from 'components/item/BestMenuItemList';
import HomeSlick from './HomeSlick';
import TabMenu from '../../../components/tab/TabMenu';
import BannerImg from 'components/svg/banner/subBanner1.png';
import Loading from 'components/asset/Loading';

//api
import { getMainMenuList } from '../../../api/menu/menu';
import { getCategory } from '../../../api/category/category';
import {
    getBreakCategory,
    getBreakMenu,
} from '../../../api/break_fast/break_fast';

//store

import {
    get_break_category,
    get_break_menuList,
    add_break_menuitem,
} from '../../../store/product/breakfast';

import { get_best_menu, add_best_menu } from '../../../store/product/bestmenu';
import { get_catergory } from '../../../store/product/product';

const OFFSET = 8;
const LIMIT = 8;

const tabInit = [
    {
        // url: `${Paths.ajoonamu.shop}?menu=0`,
        name: '예약주문',
    },
    {
        // url: '/',
        // url: `${Paths.ajoonamu.shop}?menu=1`,
        name: '기업조식',
    },
];

const HomeContainer = () => {
    const [index, setIndex] = useState(0);
    const { categorys: best_cate } = useSelector((state) => state.product);
    const {categorys: break_cate  } = useSelector((state) => state.breakfast);
    const { items: best_menu } = useSelector((state) => state.bestmenu);
    const { items: break_menu } = useSelector((state) => state.breakfast);
    const { store } = useSelector((state) => state.store);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [menuList, setMenuList] = useState([]);

    const history = useHistory();

    const onChangeTabIndex = (e, value) => {
        setIndex(value);
    };
    const onChangeSwiperIndex = (index) => {
        setIndex(index);
        // history.replace(`${Paths.ajoonamu.order_list}?tab=${index}`);
    };

    //첫 로딩시 카테고리 받아오기
    const callCategoryList = useCallback(async () => {
        //카테고리 길이가 1이면 받아오기.
        console.log('카테고리')
        if (best_cate.length === 0) {
            try {
                const res = await getCategory();
                console.log(res);
                dispatch(get_catergory(res));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    //첫 로딩시 베스트 메뉴 받아오기
    const callBestMenuListApi = useCallback(async () => {
        setLoading(true);
        try {
        console.log('베스트메뉴')
            // 카테고리별로 메뉴 리스트 받아오기.
            let arr = [];
            if (best_cate.length !== 0 && !best_menu) {
                const { ca_id } = best_cate[0];
                const result = await getMainMenuList(ca_id, 0, LIMIT);
                const temp = {
                    ca_id: ca_id,
                    items: result.data.query.items,
                };
                arr.push(temp);
                dispatch(get_best_menu(arr));
            }

            // if (categorys.length !== 0 && !best_menu) {
            //     for (let i = 0; i < categorys.length; i++) {
            //         const { ca_id } = categorys[i];
            //         const result = await getMainMenuList(ca_id, 0, LIMIT);
            //         const temp = {
            //             ca_id: ca_id,
            //             items: result.data.query.items,
            //         };
            //         arr.push(temp);
            //     }
            //     dispatch(get_best_menu(arr));
            // }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }, [best_cate, best_menu, dispatch]);

    //첫 로딩시 기업조식 카테고리 받아오기
    const callBreakCategoryApi = useCallback(async () => {
        console.log('조식카테고리')
        if (break_cate.length === 0) {
            try {
                const res = await getBreakCategory();
                console.log(res);
                dispatch(get_break_category(res.data.query.categorys));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    //첫 로딩시 기업조식 메뉴 받아오기
    //기업조식은 배달주소 필요.
    const callBreakMenuListApi = useCallback(async () => {
        console.log('기업조식')
        try {
            // 카테고리별로 메뉴 리스트 받아오기.
            let arr = [];
            if (break_cate.length !== 0 && store && !break_menu ) {
                for(let i=0 ; i<break_cate.length ;i++){
                    const { ca_id } = break_cate[i];
                    const result = await getBreakMenu(
                        ca_id,
                        0,
                        LIMIT,
                        store.shop_id,
                    );
                    const temp = {
                        ca_id: ca_id,
                        items: result.data.query.items,
                    };
                    arr.push(temp);
                }
                dispatch(get_break_menuList(arr));
            }
        } catch (e) {
            console.error(e);
        }
    }, [break_cate, store, break_menu,dispatch]);

    useEffect(()=>{
        const tab= parseInt(sessionStorage.getItem('home_tab'));
        setIndex(tab);
    },[])
    useEffect(()=>{
        sessionStorage.setItem('home_tab',index);
    },[index])

    useEffect(() => {
        callCategoryList();
        callBreakCategoryApi();
    }, []);
    useEffect(() => {
        callBestMenuListApi();
    }, [callBestMenuListApi]);
    useEffect(() => {
        callBreakMenuListApi();
    }, [callBreakMenuListApi]);

    return (
        <>
            <Title />
            <TabMenu
                tabs={tabInit}
                index={index}
                onChange={onChangeTabIndex}
            />
            <div className={styles['container']}>
                <div className={styles['carousel']}>
                    <HomeSlick />
                </div>
                <div
                    className={styles['banner']}
                    onClick={() => {
                        history.push(`${Paths.ajoonamu.shop}?tab=${0}`);
                        window.scrollTo(0, 0);
                    }}
                >
                    <img src={BannerImg} alt="subBanner" />
                </div>
                {loading ? (
                    <Loading open={loading} />
                ) : (
                    <SwipeableViews
                        enableMouseEvents
                        index={index}
                        onChangeIndex={onChangeSwiperIndex}
                        animateHeight={false}
                    >
                        <div className={styles['menu-list']}>
                            <h3 className={styles['menu-list-title']}>
                                베스트 메뉴
                            </h3>
                            {best_menu && (
                                <>
                                {best_menu[0].items.length!==0 &&
                                      <BestMenuItemList
                                      menuList={best_menu[0].items}
                                  />
                                }
                                </>
                            )}
                        </div>

                        <div className={styles['menu-list']}>
                            <h3 className={styles['menu-list-title']}>
                                기업조식
                            </h3>
                            {store? (
                                <>
                                    {break_menu && (
                                        <>
                                        {break_menu[0].items.length!==0 && 
                                           <BestMenuItemList
                                           menuList={break_menu[0].items}
                                       />
                                        }
                                     
                                        </>
                                    )}
                                </>
                            ):
                            <Message msg={'주소지가 설정되지 않았습니다.'}
                            src={true}
                            isButton={true}
                            buttonName={"주소지 설정하기"}
                            />
                            }
                        </div>
                    </SwipeableViews>
                )}
            </div>
        </>
    );
};

export default HomeContainer;
