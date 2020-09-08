import React, { useState,useEffect, useCallback } from 'react';
import {useHistory} from 'react-router-dom';
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
import { useEventCallback } from '@material-ui/core';



const ReserveContainer = ({ tab='0'}) => {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error , setError] = useState(false);
    const [budget, setBudget] = useState(0); //맞춤 가격
    const [desireQuan, setDesireQuan] = useState(0); //희망수량
    const [orderType, setOrderType] = useState('reserve'); //사용자 선택 값 1.예약주문 2.배달주문
    const [title, setTitle] = useState('추천메뉴');
    const [index, setIndex] = useState(parseInt(tab));
    const [customMenuList, setCustomMenuList] = useState(null);
    const [menuList , setMenuList] = useState(null); 
    const [categorys, setCategorys] = useState([
        {ca_id:0,ca_name:"추천메뉴",ca_order:0,ca_use:1},
    ]);

    const onChangeTabIndex = (index) => setIndex(index);
    const onChangeSwiperIndex = (index) => setIndex(index);
    const onChangeDesireQune = (value) => setDesireQuan(value);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onChangeOrderType = (e) => setOrderType(e.target.value);

    //전체 예산 입력
    const onChangeBudget = (e) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
            setBudget(e.target.value);
        }
    };

    // 모달창 설정 버튼 클릭 => 맞춤 주문 설정.
    const onCustomOrder = () => {
        if (budget === 0) return;
        console.log('맞춤주문 시작');
        setOpen(false);
        getCustomList();
    };

    const getCustomList = async () => {
        setLoading(true);
        console.log(loading);
        const res = await getCustomMenuList();
        setCustomMenuList(res);
        setLoading(false);
    };
    const getMenuItemList = async (id)=>{
        setLoading(true);
        const token = sessionStorage.getItem('access_token');
        if (token) {
            const res = await getMenuList(token,id);
            setMenuList(res);
            setSuccess(true);
        }
        else{
            setError(true);
        }
        setLoading(false);
    }
    const getCategoryList = async () => {
        setLoading(true);
        const token = sessionStorage.getItem('access_token');
        if (token) {
            const res = await getCategory(token);
            setCategorys(
                categorys.concat(res)
            )
        }
        else{
            setError(true);
        }
        setLoading(false);
    };
    useEffect(() => {
        getCategoryList();
    }, []);

 


    useEffect(()=>{
        history.replace(`${Paths.ajoonamu.shop}?menu=${index}`);
        if (categorys.length!==1) {
            const id = categorys[index].ca_id;
            const title = categorys[index].ca_name;
            if(id!==0) getMenuItemList(id);
            // setTitle(title);

        }
    },[index,categorys]);
    useEffect(()=>{
        const token = sessionStorage.getItem("access_token");
        if(!token){
            history.replace("/");
        }
    })


    const renderSwiperItem =useCallback(()=>{
          const item = categorys.map((category) => (
              <div>
                  {category.ca_id === 0 ? (
                      <>
                      {
                            customMenuList  ? (
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
                            )
                      }
                      </>
                  ) : (
                      <>
                      {
                          menuList ? (
                            <MenuItemList menuList={menuList}/>
                          ) : (
                            <Message
                            msg={'추천드릴 메뉴 구성이 존재하지 않습니다.'}
                            src={true}
                            isButton={false}
                        />
                          )
                         }
                      </>
                  )}
              </div>
          ));
          return item;
    },[categorys,customMenuList,menuList]);

    const render = () => {

        return (
            <>
                <div className={styles['container']}>
                    <div className={styles['pd-box']}>
                        <SwipeableViews
                            enableMouseEvents
                            index={index}
                            onChangeIndex={onChangeSwiperIndex}
                            animateHeight={success ? true : false}
                            children={
                                categorys &&
                                renderSwiperItem()
                                
                            }
                        >
              
                        </SwipeableViews>
                    </div>
                </div>
                <PreferModal
                    open={open}
                    handleClose={handleClose}
                    itemType={orderType}
                    onChangeType={onChangeOrderType}
                    budget={budget}
                    onChangeBudget={onChangeBudget}
                    desireQuan={desireQuan}
                    onCustomOrder={onCustomOrder}
                    onChangeDesireQune={onChangeDesireQune}
                />
                <BottomNav></BottomNav>
                <CartLink />
            </>
        );
    };

    return (
        <>
      
            <TitleBar title={title} />
            {categorys.length!==1 && <TabTests
                idx={index}
                onChange={onChangeTabIndex}
                categorys={categorys}
                /> }
            {loading ? <Loading open={loading} /> : render()}
        </>
    );

}
export default ReserveContainer;

