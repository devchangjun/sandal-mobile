import React, {useState, useEffect,useCallback, useRef } from 'react';
import { Paths } from 'paths';
import styles from './Coupon.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import classNames from 'classnames/bind';
import TabMenu from 'components/tab/TabMenu';
import CouponItemList from 'components/coupon/CouponItemList';
import UseCouponItemList from 'components/coupon/UseCouponItemList';
import BottomNav from 'components/nav/BottomNav';
import { Button } from '@material-ui/core';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller } from 'swiper'

SwiperCore.use([Controller]);

const cx = classNames.bind(styles);

const tabInit = [
    {
        url: `${Paths.ajoonamu.coupon}/mycoupon`,
        name: '내쿠폰',
    },
    {
        url: `${Paths.ajoonamu.coupon}/download_cp`,
        name: '쿠폰받기',

    },
    {
        url: `${Paths.ajoonamu.coupon}/list_use`,
        name: '쿠폰사용내역',

    },
]


const CouponConatiner = ({ tab = 'mycoupon' }) => {

    const my_coupon = useRef(null);
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);


    const onScroll = useCallback(e => {
        if (tab === 'mycoupon') {
            const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
            if (scrollTop > 250) {
                my_coupon.current.classList.add(cx('shadow'));
                console.log("gd");
            }
            else {
                my_coupon.current.classList.remove(cx('shadow'));
                console.log("삭제");
            }
        }
    }, [tab]);

    useEffect(() => {
        tab === 'mycoupon' && window.addEventListener('scroll', onScroll);
        return () => {
            // window.scrollTo(0, 0)
            window.removeEventListener('scroll', onScroll);
        };

    }, [tab, onScroll]);

    const onSetSwiper =(swiper) =>{
        setFirstSwiper(swiper);
    }


    return (
        <>
            <TitleBar title={"쿠폰함"} />
            <TabMenu tabs={tabInit} onSetSwiper={onSetSwiper} ctl ={secondSwiper} />
                <div className={cx('container')}>

                <Swiper
                        onSwiper={(swiper) => {
                           setSecondSwiper(swiper);
                           console.log("스위퍼 셋");
                        }}
                        controller={{ control: firstSwiper }}
                        initialSlide={0}
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={(swiper) => {
                                console.log("자식 스위퍼 변환");
                                console.log(swiper);
                        }}
                  
                    >
                        <SwiperSlide>
                        <>
                            <div className={cx('coupon-title', 'pd-box')}>
                                쿠폰 코드 입력
                            </div>
                            <div className={cx('coupon-form', 'pd-box')}>
                                <input className={styles['code-input']} type="text" placeholder={"쿠폰 코드를 입력하세요"} />
                                <Button className={styles['submit-btn']}>쿠폰등록</Button>
                                
                            </div>
                            <div className={cx('sticky-title', 'pd-box')} ref={my_coupon}>
                                내 쿠폰
                           </div>
                            <div className={cx('coupon-list', 'pd-box')}>
                                <CouponItemList check={false} />
                            </div>
                        </>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className={cx('coupon-list', 'pd-box')}>
                            <CouponItemList check={true} />
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className={cx('coupon-list', 'pd-box')}>
                            <UseCouponItemList />
                        </div>
                        </SwiperSlide>
                     </Swiper>



                    {/* {tab === 'mycoupon' &&
                        <>
                            <div className={cx('coupon-title', 'pd-box')}>
                                쿠폰 코드 입력
                            </div>
                            <div className={cx('coupon-form', 'pd-box')}>
                                <input className={styles['code-input']} type="text" placeholder={"쿠폰 코드를 입력하세요"} />
                                <Button className={styles['submit-btn']}>쿠폰등록</Button>
                                
                            </div>
                            <div className={cx('sticky-title', 'pd-box')} ref={my_coupon}>
                                내 쿠폰
                           </div>
                            <div className={cx('coupon-list', 'pd-box')}>
                                <CouponItemList check={false} />
                            </div>
                        </>}
                    {tab === 'download_cp' &&
                        <div className={cx('coupon-list', 'pd-box')}>
                            <CouponItemList check={true} />
                        </div>
                    }
                    {tab === 'list_use' &&
                        <div className={cx('coupon-list', 'pd-box')}>
                            <UseCouponItemList />
                        </div>
                    } */}
                </div>
            <BottomNav />
        </>
    )
}

export default CouponConatiner;