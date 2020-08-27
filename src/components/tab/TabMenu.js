import React ,{useEffect}from 'react';
import { Link,NavLink } from 'react-router-dom';
import styled from 'styled-components';
import styles from './TabMenu.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import Button from '@material-ui/core/Button';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const TabLink = styled(Link)`
    text-decoration: none;
    color: black;
    /* display: table-cell; 
    width: 100px;
    height: 100%;
    border-bottom: 3px solid transparent;
    vertical-align: middle;
    text-align: center; */
`;

const TabMenu = ({ tabs, onSetSwiper, ctl,onChangeMenu }) => {
    const activeStyle = {
        borderBottom: '3px solid #000',
    };
    useEffect(()=>{
        console.log("탭 메뉴");
        console.log(ctl);
        render();
    },[ctl])

    const check  = tabs.length > 3 ? true : false;

    const render = () => {
        console.log("탭 다시 진짜 제랜더")
        console.log(ctl);
        return (
            <>
                <div className={styles['tab-menu']}>
                    <Swiper
                        onSwiper={(swiper) => onSetSwiper(swiper)}
                        controller = {{control:ctl}}
                        initialSlide={0}
                        spaceBetween={0}
                        slidesPerView={5}
                        freeMode={true}
                        onSlideChange={(swiper) => {
                            console.log('부모 스위퍼 변환');
                            // console.log(swiper.activeIndex)
                            // swiper.controller.control.slideTo(0,true)
                        }}
                        onClick={(swiper) => {
                            // console.log(ctl);
                            onChangeMenu(swiper);
                            // console.log(swiper.controller.control.slideTo(swiper.clickedIndex,300,true));
                        }}
                    >
                        {tabList}
                        {/* {tabList} */}
                    </Swiper>
                </div>
            </>
        );
    };
    const tabList = tabs.map((tab) => (

        <SwiperSlide className={styles['tab-item']}>
            <div className={styles['tab-name']}>
                    {tab.name}
            </div>
        </SwiperSlide>
    ));
    return (
       <>
           <div className={styles['tab-menu']}>
                    <Swiper
                        onSwiper={(swiper) => onSetSwiper(swiper)}
                        controller = {{control:ctl}}
                        initialSlide={0}
                        spaceBetween={0}
                        slidesPerView={tabs.length}
                        freeMode={true}
                        onSlideChange={(swiper) => {
                            console.log('부모 스위퍼 변환');
                            // console.log(swiper.activeIndex)
                            // swiper.controller.control.slideTo(0,true)
                        }}
                        onClick={(swiper) => {
                            // console.log(ctl);
                            console.log(swiper.controller.control.slideTo(swiper.clickedIndex,300,true));
                        }}
                    >
                        {tabList}
                        {/* {tabList} */}
                    </Swiper>
                </div>
       </>
    );
};

const TabItem = ({ name }) => {
    return (
        // <Button className={styles['tab-item']}>{name}</Button>
        <SwiperSlide>{name}</SwiperSlide>
    );
};
export default TabMenu;
