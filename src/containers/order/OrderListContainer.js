import React,{useState, useEffect,useRef} from 'react';
import styles from './OrderList.module.scss';
import {useHistory} from 'react-router-dom';
import { Paths } from 'paths';
import TitleBar from 'components/titlebar/TitleBar';
import TabMenu from 'components/tab/TabMenu';
import OrderItemList from 'components/order/OrderItemList';
import BottomNav from 'components/nav/BottomNav';
import BottomModal from 'components/nav/BottomModal';
import SwipeableViews from "react-swipeable-views";
import date from 'components/svg/title-bar/date.svg';
import Message from 'components/message/Message';
import { IconButton } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';


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

const OrderListContainer = ({ tab = '0' }) => {
    const [open,setOpen] = useState(false);
    const [index, setIndex] = React.useState(parseInt(tab));
    
    const history = useHistory();
    const SWIPER = useRef(null);
    
    const handleOpen =()=>setOpen(true);
    const handleClose =()=>setOpen(false);

    const onChangeTabIndex =(e,value) =>{
        setIndex(value);
        SWIPER.current.slideTo(value,300);
    }
    const onChangeSwiperIndex =(index)=>{
        setIndex(index);
        history.replace(`${Paths.ajoonamu.order_list}?tab=${index}`);
    }
    return (
        <>
            <TitleBar title={'주문내역'}>
                <IconButton onClick={handleOpen}>
                    <img src={date} alt="데이트" />
                </IconButton>
            </TitleBar>
            <TabMenu tabs={tabInit} index={index} onChange={onChangeTabIndex} />
            <div className={styles['container']}>
                <Swiper
         spaceBetween={50}
         slidesPerView={1}
         onSlideChange={(swiper) => onChangeSwiperIndex(swiper.activeIndex)}
         onSwiper={(swiper) => {SWIPER.current=swiper}}
         autoHeight={true}
                >

                    <SwiperSlide className={styles['pd-box']}>
                        <OrderItemList />
                    </SwiperSlide>
                    <SwiperSlide className={styles['pd-box']}>
                        <Message
                            src={true}
                            msg={'주문 내역이 존재하지 않습니다.'}
                            isButton={true}
                            buttonName={'주문하러 가기'}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
            <BottomNav />
            <BottomModal open={open} handleClose={handleClose} />
        </>
    );
};

export default OrderListContainer;
