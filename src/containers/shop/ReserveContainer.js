import React, { useState,useEffect, useCallback } from 'react';
import {useHistory} from 'react-router-dom';
import { Paths } from 'paths';
import styles from './Reserve.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import TabMenu from 'components/tab/TabMenu';
import MenuItemList from 'components/item/MenuItemList';
import Message from 'components/message/Message'
import CustomItemList from 'components/item/CustomItemList';
import PreferModal from 'components/modal/PreferModal';
import BottomNav from 'components/nav/BottomNav';
import Loading from '../../components/asset/Loading';
import CartLink from '../../components/cart/CartLink';
import SwipeableViews from "react-swipeable-views";
import {getCustomMenuList} from '../../api/menu/menu';
import TabTests from '../../components/tab/SwiperTabs';

const tabInit = [
    {
        url:`${Paths.ajoonamu.shop}?menu=0`,
        name: '추천메뉴'
    },
    {
        url:`${Paths.ajoonamu.shop}?menu=1`,
        name: '메뉴1'
    },
    {
        url:`${Paths.ajoonamu.shop}?menu=2`,
        name: '메뉴2'
    },
    {
        url:`${Paths.ajoonamu.shop}?menu=3`,
        name: '메뉴3'
    },

]

const ReserveContainer = ({ tab='0'}) => {

    const [open, setOpen] = useState(false);
    const history= useHistory();
    const [loading, setLoading] = useState(false);
    const [budget, setBudget] = useState(0); //맞춤 가격
    const [desireQuan, setDesireQuan] = useState(0); //희망수량
    const [itemType, setItemType] = useState("reserve"); //사용자 선택 값 1.예약주문 2.배달주문
    const [test, setTest] = useState(false); // 예약주문 요청시 결과값.
    const [title ,setTitle] = useState('추천메뉴');
    const [index, setIndex] = useState(parseInt(tab));
    const [customMenuList ,setCustomMenuList] = useState(null);

    const onChangeTabIndex =(value) =>{
        console.log(value);
        setIndex(value);
    }
    const onChangeSwiperIndex =(index)=>{
        setIndex(index);
        history.replace(`${Paths.ajoonamu.shop}?menu=${index}`)
    }

    const onChangeTitle = useCallback(()=>{
        if(index===0) setTitle("추천메뉴");
        else if(index===1) setTitle("메뉴1");
        else if(index===2) setTitle("메뉴2")
        else if(index===3)  setTitle("메뉴3");
        
    },[index])

    const getCustomList = async () => {
        setLoading(true);
        console.log(loading);
        const res = await getCustomMenuList();
        console.log(res);
        setCustomMenuList(res);
        setLoading(false);
    };

    useEffect(()=>{
        setIndex(parseInt(tab));
    },[tab])

    useEffect(() => {
        onChangeTitle();
    }, [onChangeTitle])


    //맞춤 주문하기 버튼 클릭
    const handleOpen = () => setOpen(true);
    // 모달창 닫기
    const handleClose = () => setOpen(false);

    //주문 종류 선택
    const onChangeType = (e) => setItemType(e.target.value);

    //전체 예산 입력
    const onChangeBudget = (e) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
            setBudget(e.target.value)
        }
    }
    const onChangeDesireQune = (value) => {
        setDesireQuan(value);
    }
    // 모달창 설정 버튼 클릭 => 맞춤 주문 설정.
    const onCustomOrder = () => {
        if(budget===0) return;
        console.log("맞춤주문 시작");
        setOpen(false);
        getCustomList();
    }
 


    return (
        <>
            <Loading open={loading} />
            <TabTests idx={index} onChange={onChangeTabIndex}/>
            <TitleBar title={title} />
            <div className={styles['container']}>
                <div className={styles['pd-box']}>
                    <SwipeableViews
                        enableMouseEvents
                        index={index}
                        onChangeIndex={onChangeSwiperIndex}
                        animateHeight={customMenuList ? true : false}
                    >
                        <div>
                            {customMenuList ? (
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
                        </div>
                        <div>
                            <MenuItemList />
                        </div>
                        <div>
                            <Message
                                msg={'추천드릴 메뉴 구성이 존재하지 않습니다.'}
                                src={true}
                                isButton={false}
                            />
                        </div>
                        <div>
                            <Message
                                msg={
                                    '배달 가능한 매장이 없거나 메뉴가 존재하지 않습니다.'
                                }
                                isButton={false}
                                src={true}
                            />
                        </div>
                    </SwipeableViews>
                </div>
            </div>
            <PreferModal
                open={open}
                handleClose={handleClose}
                itemType={itemType}
                onChangeType={onChangeType}
                budget={budget}
                onChangeBudget={onChangeBudget}
                desireQuan={desireQuan}
                onCustomOrder={onCustomOrder}
                onChangeDesireQune={onChangeDesireQune}
            />
            <BottomNav></BottomNav>
            <CartLink/>
        </>
    );
}
export default ReserveContainer;

