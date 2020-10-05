import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Paths } from 'paths';
import styles from './Reserve.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import MenuItemList from 'components/item/MenuItemList';
import Message from 'components/message/Message'
import CustomItemList from 'components/item/CustomItemList';
import PreferModal from 'components/modal/PreferModal';
import Loading from '../../components/asset/Loading';
import CartLink from '../../components/cart/CartLink';
import SwipeableViews from "react-swipeable-views";
import { getPreferMenuList, getMenuList } from '../../api/menu/menu';
import { getCategory } from '../../api/category/category';
import TabTests from '../../components/tab/SwiperTabs';
import TabMenu from '../../components/tab/TabMenu';
import { get_catergory, get_menulist, add_menuitem } from '../../store/product/product';

import { useScroll } from '../../hooks/useScroll';
import {useStore} from '../../hooks/useStore';

const OFFSET = 8;
const LIMIT = 8;

const tabInit = [
    {
        url:`${Paths.ajoonamu.order_list}?tab=0`,
        name: '예약주문'
    },
    {
        url:`${Paths.ajoonamu.order_list}?tab=1`,
        name: '배달주문'
    },
];


const ReserveContainer = ({ menu }) => {

    const { categorys, items } = useSelector((state) => state.product);
    const { addr1 } = useSelector((state) => state.address);
    const { store } = useSelector((state) => state.store);

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [budget, setBudget] = useState(0); //맞춤 가격
    const [desireQuan, setDesireQuan] = useState(1); //희망수량
    const [orderType, setOrderType] = useState('reserve'); //사용자 선택 값 1.예약주문 2.배달주문
    const [title, setTitle] = useState('추천메뉴');
    const [tabIndex, setTabIndex] = useState(menu);

    const [preferList, setPreferMenuList] = useState([]);
    const [generalList, setGeneralMenuList] = useState([]); //추천메뉴 리스트

    const { isScrollEnd } = useScroll(loading); //스크롤 끝 판단.
    const [posts, setPosts] = useState([]); //보여줄 배열
    const [isPaging, setIsPaging] = useState(false); //페이징중인지
    const [offset, setOffset] = useState(8);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onChangeDesireQune = (value) => setDesireQuan(value);
    const onChangeOrderType = (e) => setOrderType(e.target.value);

    const onChangeTabIndex = useCallback(index => {
        history.push(`${Paths.ajoonamu.shop}?menu=${index}`);
    }, [history]);
    const onChangeSwiperIndex = useCallback(index => {
        history.push(`${Paths.ajoonamu.shop}?menu=${index}`);
    }, [history]);


    //가격 변경
    const onChangeBudget = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setBudget(e.target.value);
        }
    };

    //수량 변경
    const onIncrement = useCallback(() => {
        setDesireQuan(desireQuan + 1);
    }, [desireQuan]);

    const onDecrement = useCallback(() => {
        if (desireQuan > 1) {
            setDesireQuan(desireQuan - 1);
        }
    }, [desireQuan]);

    //맞춤 주문 설정
    const onClickCustomOrder = () => {
        if (budget === 0) return;
        setOpen(false);
        getCustomList();
    };

    const getCustomList = async () => {
        setLoading(true);
        try {
            const res = await getPreferMenuList();
            console.log(res);
            setPreferMenuList(res);
        }
        catch (e) {

        }
        setLoading(false);
    };

    //첫 로딩시 카테고리 받아오기
    const getCategoryList = useCallback(async () => {

        //카테고리 길이가 1이면 받아오기.   
        if (categorys.length === 1) {
            try{
                const res = await getCategory();
                let ca_list = res.filter((item) => item.ca_id !== 12); //이거 나중에 뺴야함.
                dispatch(get_catergory(ca_list));
            }
         
            catch(e){
                console.error(e);
            }
        }
    }, []);


    //첫 로딩시 메뉴 받아오기
    const getProductList = useCallback(async () => {
        setLoading(true);
        console.log('시작');
        try {
            // 카테고리별로 메뉴 리스트 받아오기.
            let arr = [];
            if (categorys.length !== 1 && store && !items) {
                console.log('들어옴');
                for (let i = 1; i < categorys.length; i++) {
                    const { ca_id } = categorys[i];
                    const result = await getMenuList(ca_id, 0, LIMIT, store.shop_id);
                    const temp = { ca_id: ca_id, items: result.data.query.items };
                    arr.push(temp);
                }
                dispatch(get_menulist(arr));
            }

  
        }
        catch (e) {
            console.error(e);
        }
        setLoading(false);
    }, [categorys, store, items, dispatch]);

    //오프셋이 바뀌었을때 페이지네이션으로 메뉴를 불러오는 함수.
    const PageNationMenuList = useCallback(async () => {
        if (!loading) {
            // setLoading(true);
            try {
                console.log('페이지네이션 실행')
                //현재 탭이 추천메뉴 탭이 아니고, 카테고리를 받아오고난뒤, 아이템과 스토어가  있으면 실행
                if (tabIndex !== 0 && categorys.length !== 1 && items && store) {
                    setIsPaging(true);
                    const res = await getMenuList(
                        categorys[tabIndex].ca_id,
                        offset,
                        LIMIT,
                        store.shop_id
                    );

                    const get_list = res.data.query.items;
                    if (get_list.length !== 0) {
                        setOffset(offset + LIMIT);
                        dispatch(
                            add_menuitem({
                                ca_id: categorys[tabIndex].ca_id,
                                items: get_list,
                            }),
                        );
                    }
                    setTimeout(() => {
                        setIsPaging(false);
                    }, 1000);
                }
            }
            catch (e) {

            }
            // setLoading(false);
        }
    }, [tabIndex, categorys, offset, items, loading, store, dispatch]);


    const onClickMenuItem = useCallback((item_id) => {
        history.push(`${Paths.ajoonamu.product}?item_id=${item_id}`);
    }, [history]);


    const renderMenuList = useCallback((ca_id) => {
        const index = items.findIndex((item) => item.ca_id === ca_id);
        return (
            <>
                {items ?  (
                    <MenuItemList
                        menuList={items[index].items}
                        onClick={onClickMenuItem}
                    />
                ) : (
                        <Message
                            msg={'추천드릴 메뉴 구성이 존재하지 않습니다.'}
                            src={true}
                            isButton={false}
                        />
                    )}
            </>
        );
    }, [items, onClickMenuItem]
    );


    const renderSwiperItem = useCallback(() => {
        const item = categorys.map((category) => (
            <div key={category.ca_id}>
                {category.ca_id === 0 ? (
                    <>
                        {preferList.length !== 0 ? (
                            <div className={styles['title']}>
                                맞춤 메뉴
                                <CustomItemList menuList={preferList} />
                            </div>
                        ) : (
                                <Message
                                    msg={
                                        '전체 예산과 희망 수량을 선택하시면 메뉴 구성을 추천 받으실 수 있습니다.'
                                    }
                                    isButton={true}
                                    onClick={handleOpen}
                                    buttonName={'맞춤 주문 하기'}
                                />
                            )}
                    </>
                ) : (
                    // <h1>{category.ca_id}</h1> 
                        <>{renderMenuList(category.ca_id)}</>
                    )}
            </div>
        ));
        return item;
    }, [categorys, preferList, renderMenuList,items]);


    //첫 로딩시 카테고리 셋팅
    useEffect(() => {
        getCategoryList();
        window.scrollTo(0, 0);
    }, [getCategoryList]);

    // 첫 로딩시 메뉴 셋팅
    useEffect(() => {
        getProductList();
    }, [getProductList])

    
    //탭 바뀌었을때 오프셋 갱신
    useEffect(() => {
        setOffset(OFFSET);
    }, [tabIndex]);

    useEffect(() => {
        setTabIndex(menu);
    }, [menu])
    useEffect(()=>{
        console.log('오프셋바뀜');
        console.log(offset);
    },[offset])


    // useEffect(() => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         const url = JSON.parse(sessionStorage.getItem('url'));
    //         if (url) {
    //             //이전 페이지가 상품페이지라면 오프셋 유지.
    //             if (url.prev === '/product') {
    //                 const OS = sessionStorage.getItem('offset');
    //                 if (OS) {
    //                     setOffset(parseInt(OS));
    //                 }
    //             }
    //         }
    //         setLoading(false);
    //     }, 100);
    // }, []);



    useEffect(() => {
        items && tabIndex !== 0 && setPosts(items[tabIndex - 1].items);
    }, [items, tabIndex]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (categorys.length !== 1) {
            const title = categorys[tabIndex].ca_name;
            setTitle(title);
        }
    }, [tabIndex, history, categorys]);
    //스크롤 끝과 페이징중인지 확인후 페이지네이션 실행.
    useEffect(() => {
        if (isScrollEnd && !isPaging) {
            PageNationMenuList();
        }
    }, [isScrollEnd]);



    return (
        <>
          <TitleBar title={title} isHome={true} />
                    {categorys.length !== 1 && (
                        <TabTests
                            idx={tabIndex}
                            onChange={onChangeTabIndex}
                            categorys={categorys}
                        />
                    )}
            {loading ? <Loading open={true} /> :
                <>
                    <div className={styles['container']}>
                        <SwipeableViews
                            enableMouseEvents
                            onChangeIndex={onChangeSwiperIndex}
                            animateHeight={!isPaging}
                            index={tabIndex}
                            className={styles['test']}
                        >
                        {items && renderSwiperItem()}
                        </SwipeableViews>

                    </div>
                    <PreferModal
                        open={open}
                        handleClose={handleClose}
                        itemType={orderType}
                        onChangeType={onChangeOrderType}
                        budget={budget}
                        onChangeBudget={onChangeBudget}
                        desireQuan={desireQuan}
                        onCustomOrder={onClickCustomOrder}
                        onChangeDesireQune={onChangeDesireQune}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                    />
                    <CartLink />

                </>

            }

        </>
    );

}
export default ReserveContainer;

