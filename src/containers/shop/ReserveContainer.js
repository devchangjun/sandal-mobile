import React, { useState,useEffect, useCallback } from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { Paths } from 'paths';
import styles from './Reserve.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import MenuItemList from 'components/item/MenuItemList';
import Message from 'components/message/Message'
import CustomItemList from 'components/item/CustomItemList';
import PreferModal from 'components/modal/PreferModal';
import BottomNav from 'components/nav/BottomNav';
import Loading from '../../components/asset/Loading';
import CartLink from '../../components/cart/CartLink';
import SwipeableViews from "react-swipeable-views";
import {getCustomMenuList ,getMenuList} from '../../api/menu/menu';
import {getCategory} from '../../api/category/category';
import TabTests from '../../components/tab/SwiperTabs';
import {get_catergory, get_menulist} from '../../store/product/product';


const ReserveContainer = ({ menu }) => {

    const { categorys, items } = useSelector((state)=> state.product);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [budget, setBudget] = useState(0); //맞춤 가격
    const [desireQuan, setDesireQuan] = useState(0); //희망수량
    const [orderType, setOrderType] = useState('reserve'); //사용자 선택 값 1.예약주문 2.배달주문
    const [title, setTitle] = useState('추천메뉴');
    const [index, setIndex] = useState(menu);
    const [customMenuList, setCustomMenuList] = useState([]);
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

    const onChangeBudget = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setBudget(e.target.value);
        }
    };

    const onClickCustomOrder = () => {
        if (budget === 0) return;
        setOpen(false);
        getCustomList();
    };

    const getCustomList = async () => {
        setLoading(true);
        const res = await getCustomMenuList();
        setCustomMenuList(res);
        setLoading(false);
    };

    const getProductList = useCallback(async () => {
        setLoading(true);
        const token = sessionStorage.getItem('access_token');
        if (token && categorys.length === 1) {
            const res = await getCategory(token);
            res.sort((a, b) => a.ca_id - b.ca_id);
            // 카테고리를 분류 순서로 정렬.
            dispatch(get_catergory(res));
            let arr = [];
            for (let i = 0; i < res.length; i++) {
                const result = await getMenuList(token, res[i].ca_id);
                const temp = { ca_id: res[i].ca_id, items: result };
                arr.push(temp);
            }
            arr.sort((a, b) => a.ca_id - b.ca_id);
            dispatch(get_menulist(arr));
        }
        setLoading(false);
    }, [categorys, dispatch]);

        
    const onClickMenuItem = useCallback((item_id) =>{
        history.push(`${Paths.ajoonamu.product}?item_id=${item_id}`);
    },[history]);


    useEffect(() => {
        getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (categorys.length !== 1) {
            const title = categorys[index].ca_name;
            setTitle(title);
        }
    }, [index, history, categorys]);

    useEffect(() => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            history.replace('/');
        }
    }, [history]);

    const renderMenuList = useCallback((ca_id) => {
        const index = items.findIndex((item) => item.ca_id === ca_id);
        return (
            <>
                {index !== -1 ? (
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
    useEffect(()=>{
        setIndex(menu);
    },[menu])
    
    const renderSwiperItem = useCallback(() => {
        const item = categorys.map((category) => (
            <div key={category.ca_id}>
                {category.ca_id === 0 ? (
                    <>
                        {customMenuList.length !== 0 ? (
                            <div className={styles['title']}>
                                맞춤 메뉴
                                <CustomItemList menuList={customMenuList} />
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
                    <>{renderMenuList(category.ca_id)}</>
                )}
            </div>
        ));
        return item;
    }, [categorys, customMenuList, renderMenuList]);

    const render = useCallback(() => (
            <>
                {loading ? (
                    <Loading open={loading} />
                ) : (
                    <div className={styles['container']}>
                        <div className={styles['pd-box']}>
                            <SwipeableViews
                                enableMouseEvents
                                onChangeIndex={onChangeSwiperIndex}
                                animateHeight={categorys.length !== 1}
                                index={categorys && index}
                            >
                                {categorys && renderSwiperItem()}
                            </SwipeableViews>
                        </div>
                    </div>
                )}
            </>
        ), [categorys, index, loading, onChangeSwiperIndex, renderSwiperItem]);

    return (
        <>
            {loading && <Loading open={loading} />}
            <TitleBar title={title} isHome={true} />
            {categorys.length !== 1 && (
                <TabTests
                    idx={index}
                    onChange={onChangeTabIndex}
                    categorys={categorys}
                />
            )}
            {render()}
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
            />
            <BottomNav></BottomNav>
            <CartLink />
        </>
    );

}
export default ReserveContainer;

