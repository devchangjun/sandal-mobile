import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Paths } from 'paths';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwipeableViews from 'react-swipeable-views';
import Message from '../../../components/message/Message';
import Title from 'components/titlebar/Title';
import styles from './HomeContainer.module.scss';
import BestMenuItemList from 'components/item/BestMenuItemList';
import HomeSlick from './HomeSlick';
import TabMenu from '../../../components/tab/TabMenu';
import BannerImg from 'components/svg/banner/subBanner1.png';
import Loading from 'components/asset/Loading';
import { ButtonBase } from '@material-ui/core';
import cn from 'classnames/bind';
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

//hooks
import { useScroll ,useDomScroll } from '../../../hooks/useScroll';

const cx = cn.bind(styles);
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

    // useScroll();
    const SWIPER = useRef(null);
    const SUB_TAB = useRef(null);
    const SWIPER_SLIDE = useRef(null);
    const [index, setIndex] = useState(0);
    const { categorys: best_cate } = useSelector((state) => state.product);
    const { categorys: break_cate } = useSelector((state) => state.breakfast);
    const { items: best_menu } = useSelector((state) => state.bestmenu);
    const { items: break_menu } = useSelector((state) => state.breakfast);
    const { store } = useSelector((state) => state.store);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    // const { isScrollEnd, onScroll } = useDomScroll(); //스크롤 끝 판단.

    const [isPaging, setIsPaging] = useState(false); //페이징중인지
    const [offset, setOffset] = useState(8);
    const [swiper_open ,setSwiperOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    const [best_post_index ,setBestPostIndex] = useState(0);
    const [break_post_index , setBreakIndex] = useState(0);

    const history = useHistory();

    const onChangeTabIndex = (e, value) => {

        SWIPER_SLIDE.current.scrollTo(0,0);
        SWIPER.current.slideTo(value, 300);
        setIndex(value);

    };
    const onChangeSwiperIndex = (index) => {
        setIndex(index);
        // history.replace(`${Paths.ajoonamu.order_list}?tab=${index}`);
    };

    //첫 로딩시 카테고리 받아오기
    const callCategoryList = useCallback(async () => {
        //카테고리 길이가 1이면 받아오기.
        if (best_cate.length === 0) {
            try {
                const res = await getCategory();
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
            // 카테고리별로 메뉴 리스트 받아오기.
            let arr = [];

            if (best_cate.length !== 0 && !best_menu) {
                for (let i = 0; i < best_cate.length; i++) {
                    const { ca_id } = best_cate[i];
                    const result = await getMainMenuList(ca_id, 0, LIMIT);
                    console.log(result);
                    const temp = {
                        ca_id: ca_id,
                        items: result.data.query.items,
                    };
                    arr.push(temp);
                }
                dispatch(get_best_menu(arr));
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }, [best_cate, best_menu, dispatch]);

    //첫 로딩시 기업조식 카테고리 받아오기
    const callBreakCategoryApi = useCallback(async () => {
        if (break_cate.length === 0) {
            try {
                const res = await getBreakCategory();
                dispatch(get_break_category(res.data.query.categorys));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    //첫 로딩시 기업조식 메뉴 받아오기
    //기업조식은 배달주소 필요.
    const callBreakMenuListApi = useCallback(async () => {
        try {
            // 카테고리별로 메뉴 리스트 받아오기.
            let arr = [];
            if (break_cate.length !== 0 && store && !break_menu) {
                for (let i = 0; i < break_cate.length; i++) {
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
    }, [break_cate, store, break_menu, dispatch]);

    useEffect(() => {
        const tab = parseInt(sessionStorage.getItem('home_tab'));
        setIndex(tab ? tab : 0);
    }, []);
    useEffect(() => {
        sessionStorage.setItem('home_tab', index);
    }, [index]);

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


    useEffect(() => {
        window.addEventListener('scroll', onWindowScroll, false);
        return () => {
            window.removeEventListener('scroll', onWindowScroll, false);
        };
    });

    const onWindowScroll =() => {
 
        let height =SUB_TAB.current.getBoundingClientRect().top;
        console.log(height);


        if(height<=80){
            setHidden(true);
            setSwiperOpen(true);

        }
        else{
            setHidden(false);
            setSwiperOpen(false);

        }
    };

    const onScroll =(e) =>{
        let scrollHeight = e.target.scrollHeight;
        let scrollTop = e.target.scrollTop;
        let clientHeight = e.target.clientHeight;
        let height  = scrollTop+clientHeight;
        console.log(scrollTop);
        if(scrollTop <= 0) {
            console.log('숨기기');
            setSwiperOpen(false);
            setHidden(false);
        }
        else{
            
        }
    } 


    return (
        <>
            <Title />
            <TabMenu tabs={tabInit} index={index} onChange={onChangeTabIndex} />
            <div className={cx('container')}>
                <div className={cx('carousel') }>
                    <HomeSlick />
                </div>
                <div
                    className={cx('banner')}
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
                    <>
                        <Swiper
                            ref={SUB_TAB}
                            className={cx('swiper',{sub:swiper_open})}
                            initialSlide={index}
                            slidesPerView={1}
                            onSlideChange={(swiper) => {
                                onChangeSwiperIndex(swiper.activeIndex);
                            }}
                            autoHeight={true}
                            onSwiper={(swiper) => (SWIPER.current = swiper)}
                        >
                            <SwiperSlide className={styles['swiper-slide']} ref= {index===0 ? SWIPER_SLIDE : null} onScroll={onScroll}>
                                {best_cate.length !== 0 && (
                                    <Swiper
                                        spaceBetween={15}
                                        nested={true}
                                        slidesPerView={5}
                                        className={cx('categorys')}
                                        onClick={(swiper) => {
                                            if (swiper.clickedIndex!==undefined) {
                                                console.log(swiper.clickedIndex);
                                                setBestPostIndex(
                                                    swiper.clickedIndex,
                                                );
                                            }
                                        }}
                                    >
                                        <>
                                            {best_cate.map((c,index) => (
                                                <SwiperSlide
                                                    className={cx('item',{active : index===best_post_index} )}
                                                    key={c.ca_id}
                                                >
                                                    <ButtonBase>
                                                        {c.ca_name}
                                                    </ButtonBase>
                                                </SwiperSlide>
                                            ))}
                                        </>
                                    </Swiper>
                                )}
                                <h3 className={cx('menu-list-title',{sub:swiper_open})}>
                                    베스트 메뉴
                                </h3>
                                {best_menu && (
                                    <>
                                        {best_menu[best_post_index].items
                                            .length !== 0 && (
                                            <BestMenuItemList
                                                menuList={
                                                    best_menu[best_post_index]
                                                        .items
                                                }
                                            />
                                        )}
                                    </>
                                )}
                            </SwiperSlide>

                            <SwiperSlide className={styles['swiper-slide']} ref={index===1 ? SWIPER_SLIDE :null} onScroll={onScroll}>
                            {break_cate.length !== 0 && (
                                    <Swiper
                                        spaceBetween={15}
                                        nested={true}
                                        slidesPerView={5}
                                        className={cx('categorys')}
                                        onClick={(swiper) => {
                                            if (swiper.clickedIndex!==undefined) {
                                                console.log(swiper.clickedIndex);
                                                setBreakIndex(
                                                    swiper.clickedIndex,
                                                );
                                            }
                                        }}
                                    >
                                        <>
                                            {break_cate.map((c,index) => (
                                                <SwiperSlide
                                                className={cx('item',{active : index===break_post_index} )}
                                                    key={c.ca_id}
                                                >
                                                    <ButtonBase>
                                                        {c.ca_name}
                                                    </ButtonBase>
                                                </SwiperSlide>
                                            ))}
                                        </>
                                    </Swiper>
                                )}
                                
                                
                                <h3 className={styles['menu-list-title']}>
                                    기업조식
                                </h3>
                                {store ? (
                                    <>
                                        {break_menu && (
                                            <>
                                                {break_menu[break_post_index].items.length !==
                                                    0 && (
                                                    <BestMenuItemList
                                                        menuList={
                                                            break_menu[break_post_index].items
                                                        }
                                                    />
                                                )}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <Message
                                        msg={'주소지가 설정되지 않았습니다.'}
                                        src={true}
                                        isButton={true}
                                        buttonName={'주소지 설정하기'}
                                    />
                                )}
                            </SwiperSlide>
                        </Swiper>
                    </>
                )}
            </div>
        </>
    );
};

const BestMenuContainer =()=>{

    return(
        <div>
            
        </div>
    )
}


export default HomeContainer;
