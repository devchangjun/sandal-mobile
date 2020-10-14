import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Paths } from 'paths';
import styles from './Reserve.module.scss';

//components
import TitleBar from 'components/titlebar/TitleBar';
import MenuItemList from 'components/item/MenuItemList';
import Message from 'components/message/Message';
import PreferModal from 'components/modal/PreferModal';
import Loading from '../../components/asset/Loading';
import CartLink from '../../components/cart/CartLink';
import TabTests from '../../components/tab/SwiperTabs';
import { Swiper, SwiperSlide } from 'swiper/react';

//api
import { getPreferMenuList, getMenuList } from '../../api/menu/menu';
import { getCategory } from '../../api/category/category';
import produce from 'immer';

//store
import {
    get_catergory,
    get_menulist,
    add_menuitem,
} from '../../store/product/product';

//hooks
import {
    useDomScroll,
    useRestore,
} from '../../hooks/useScroll';

const OFFSET = 8;
const LIMIT = 8;

const ReserveContainer = ({ menu }) => {
    const SWIPER = useRef(null);
    const SWIPER_SLIDE = useRef(null);
    const { categorys, items } = useSelector((state) => state.product);
    const { addr1 } = useSelector((state) => state.address);
    const { store } = useSelector((state) => state.store);

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('추천메뉴');
    const [tabIndex, setTabIndex] = useState(menu);

    const [preferList, setPreferMenuList] = useState([]);
    const [generalList, setGeneralMenuList] = useState([]); //추천메뉴 리스트

    const {restoreScroll, restoreOffset} = useRestore();
    const { isScrollEnd, onScroll } = useDomScroll(); //스크롤 끝 판단.
    const [isPaging, setIsPaging] = useState(false); //페이징중인지
    const [offset, setOffset] = useState(8);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onChangeTabIndex = useCallback(
        (index) => {
            history.push(`${Paths.ajoonamu.shop}?menu=${index}`);
            SWIPER.current.slideTo(index, 300);
        },
        [history],
    );
    const onChangeSwiperIndex = useCallback(
        (index) => {
            history.push(`${Paths.ajoonamu.shop}?menu=${index}`);
        },
        [history],
    );
    //맞춤 주문 설정
    const onClickCustomOrder = async (budget, desireQuan) => {
        setOpen(false);
        setLoading(true);
        try {
            const res = await getPreferMenuList(
                0,
                100,
                0,
                100,
                1,
                budget,
                desireQuan,
                addr1,
                store.shop_id,
            );
            setPreferMenuList(res.items_prefer);
            setGeneralMenuList(res.items_general);
        } catch (e) {}
        setLoading(false);
    };

    //첫 로딩시 카테고리 받아오기
    const getCategoryList = useCallback(async () => {
        //카테고리 길이가 1이면 받아오기.
        if (categorys.length === 0) {
            try {
                const res = await getCategory();
                console.log(res);
                dispatch(get_catergory(res));
            } catch (e) {
                console.error(e);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //첫 로딩시 메뉴 받아오기
    const getProductList = useCallback(async () => {
        setLoading(true);
        try {
            // 카테고리별로 메뉴 리스트 받아오기.
            let arr = [];
            if (categorys.length !== 0 && store && !items) {
                for (let i = 0; i < categorys.length; i++) {
                    const { ca_id } = categorys[i];
                    const result = await getMenuList(
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
                dispatch(get_menulist(arr));
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }, [categorys, store, items, dispatch]);

    //오프셋이 바뀌었을때 페이지네이션으로 메뉴를 불러오는 함수.
    const PageNationMenuList = useCallback(async () => {
        if (!loading) {
            try {
                console.log('페이지네이션 실행');
                //현재 탭이 추천메뉴 탭이 아니고, 카테고리를 받아오고난뒤, 아이템과 스토어가  있으면 실행
                if (
                    tabIndex !== 0 &&
                    categorys.length !== 0 &&
                    items &&
                    store
                ) {
                    const res = await getMenuList(
                        categorys[tabIndex - 1].ca_id,
                        offset,
                        LIMIT,
                        store.shop_id,
                    );
                    console.log(res);

                    const get_list = res.data.query.items;
                    if (get_list.length !== 0) {
                        setIsPaging(true);
                        console.log('페이지네이션 오프셋 갱신');
                        setOffset(offset + LIMIT);

                        dispatch(
                            add_menuitem({
                                ca_id: categorys[tabIndex - 1].ca_id,
                                items: get_list,
                            }),
                        );
                    } else {
                        console.log('받아온 아이템 없음');
                    }
                    setTimeout(() => {
                        setIsPaging(false);
                    }, 1000);
                }
            } catch (e) {}
        }
    }, [tabIndex, categorys, offset, items, loading, store, dispatch]);

    const onClickMenuItem = useCallback(
        (item_id) => {
            history.push(`${Paths.ajoonamu.product}?item_id=${item_id}`);
            sessionStorage.setItem('offset', offset);
        },
        [history, offset],
    );

    const renderSwiperItem = useCallback(() => {
        const item = categorys.map((category, index) => (
            <SwiperSlide
                key={category.ca_id}
                onScroll={onScroll}
                className={styles['swiper-slide']}
                ref={index === tabIndex - 1 ? SWIPER_SLIDE : null}
            >
                {items[index].items.length !== 0 ? (
                    <MenuItemList
                        menuList={items[index].items.slice(0, offset)}
                        onClick={onClickMenuItem}
                    />
                ) : (
                    <Message
                        msg={
                            '배달 가능한 매장이 없거나 메뉴가 존재하지 않습니다.'
                        }
                        src={true}
                        isButton={false}
                    />
                )}
            </SwiperSlide>
        ));
        return item;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categorys, items, onClickMenuItem, offset, SWIPER_SLIDE, tabIndex]);

    //첫 로딩시 카테고리 셋팅
    useEffect(() => {
        getCategoryList();
        window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // 첫 로딩시 메뉴 셋팅
    useEffect(() => {
        if (!isPaging) {
            getProductList();
        }
    }, [getProductList, isPaging]);

    //탭 바뀌었을때 오프셋 갱신
    useEffect(() => {
        setOffset(OFFSET);
    }, [tabIndex]);

    useEffect(() => {
        setTabIndex(menu);
    }, [menu]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            restoreOffset(setOffset);
            setLoading(false);
        }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //로딩 완료 되었을 때 스크롤 위치로 이동.
    useEffect(() => {
        setTimeout(() => {
            restoreScroll(SWIPER_SLIDE.current);
        }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (categorys.length !== 0) {
            if (tabIndex === 0) {
                setTitle('추천메뉴');
            } else {
                const title = categorys[tabIndex - 1].ca_name;
                setTitle(title);
            }
        }
    }, [tabIndex, history, categorys]);

    //스크롤 끝과 페이징중인지 확인후 페이지네이션 실행.
    useEffect(() => {
        if (isScrollEnd && !isPaging) {
            PageNationMenuList();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isScrollEnd]);

    return (
        <>
            <TitleBar title={title} isHome={true} />
            {loading ? (
                <Loading open={true} />
            ) : (
                <>
                    {store ? (
                        <>
                            {categorys.length !== 0 && (
                                <TabTests
                                    idx={tabIndex}
                                    onChange={onChangeTabIndex}
                                    categorys={produce(categorys, (draft) => {
                                        draft.unshift({
                                            ca_name: '추천메뉴',
                                        });
                                    })}
                                />
                            )}
                            <div className={styles['container']}>
                                <Swiper
                                    className={styles['swiper']}
                                    initialSlide={tabIndex}
                                    slidesPerView={1}
                                    onSlideChange={(swiper) => {
                                        onChangeSwiperIndex(swiper.activeIndex);
                                    }}
                                    autoHeight={true}
                                    onSwiper={(swiper) =>
                                        (SWIPER.current = swiper)
                                    }
                                >
                                    <SwiperSlide
                                        className={styles['swiper-slide']}
                                        onScroll={onScroll}
                                        ref={
                                            tabIndex === 0 ? SWIPER_SLIDE : null
                                        }
                                    >
                                        {preferList.length !== 0 ? (
                                            <>
                                                <div
                                                    className={styles['title']}
                                                >
                                                    맞춤 메뉴
                                                </div>
                                                <MenuItemList
                                                    menuList={preferList}
                                                    onClick={onClickMenuItem}
                                                />
                                            </>
                                        ) : (
                                            <Message
                                                msg={
                                                    `전체 예산과 희망 수량을 선택하시면\n 메뉴 구성을 추천 받으실 수 있습니다.`
                                                }
                                                isButton={true}
                                                onClick={handleOpen}
                                                buttonName={'맞춤 주문 하기'}
                                            />
                                        )}
                                    </SwiperSlide>
                                    {items && renderSwiperItem()}
                                </Swiper>
                            </div>
                            <PreferModal
                                open={open}
                                handleClose={handleClose}
                                onCustomOrder={onClickCustomOrder}
                            />
                            <CartLink />
                        </>
                    ) : (
                        <div className={styles['msg']}>
                            <Message
                                msg={'주소지가 설정되지 않았습니다.'}
                                src={true}
                                isButton={true}
                                buttonName={'주소지 설정하기'}
                                onClick={() =>
                                    history.push(Paths.ajoonamu.address)
                                }
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};
export default ReserveContainer;
