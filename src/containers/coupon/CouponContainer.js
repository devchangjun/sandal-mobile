import React, { useEffect,useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Paths } from 'paths';
import styles from './Coupon.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import classNames from 'classnames/bind';
import TabMenu from 'components/tab/TabMenu';
import CouponItemList from 'components/coupon/CouponItemList';
import UseCouponItemList from 'components/coupon/UseCouponItemList';
import BottomNav from 'components/nav/BottomNav';
import { Button } from '@material-ui/core';
import SwipeableViews from "react-swipeable-views";

const cx = classNames.bind(styles);
// 스와이퍼 테스트
const tabInit = [
    {
        url: `${Paths.ajoonamu.coupon}?tab=0`,
        name: '내쿠폰',
    },
    {
        url: `${Paths.ajoonamu.coupon}?tab=1`,
        name: '쿠폰받기',

    },
    {
        url: `${Paths.ajoonamu.coupon}?tab=2`,
        name: '쿠폰사용내역',
    },
]


const CouponConatiner = ({ tab='0' }) => {

    const my_coupon = useRef(null);
    const history = useHistory();

    const [index, setIndex] = React.useState(parseInt(tab));

    const onScroll = useCallback(e => {
        if (index === 0) {
            const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
            if (scrollTop > 250) {
                my_coupon.current.classList.add(cx('shadow'));
            }
            else {
                my_coupon.current.classList.remove(cx('shadow'));
            }
        }
    }, [index]);

    const onChangeTabIndex =(e,value) =>{
        setIndex(value);
    }
    const onChangeSwiperIndex =(index)=>{
        setIndex(index);
        history.replace(`${Paths.ajoonamu.coupon}?tab=${index}`);
    }

    useEffect(() => {

        index === 0 && window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };

    }, [index, onScroll]);

    return (
        <>
            <TitleBar title={'쿠폰함'} />
            <TabMenu tabs={tabInit} index={index} onChange={onChangeTabIndex} />
            <div className={cx('container')}>
                <SwipeableViews
                    enableMouseEvents
                    index={index}
                    onChangeIndex={onChangeSwiperIndex}
                    animateHeight={true}
                >
                    <div>
                        <div className={cx('coupon-title', 'pd-box')}>
                            쿠폰 코드 입력
                        </div>
                        <div className={cx('coupon-form', 'pd-box')}>
                            <input
                                className={styles['code-input']}
                                type="text"
                                placeholder={'쿠폰 코드를 입력하세요'}
                            />
                            <Button className={styles['submit-btn']}>
                                쿠폰등록
                            </Button>
                        </div>
                        <div
                            className={cx('sticky-title', 'pd-box')}
                            ref={my_coupon}
                        >
                            내 쿠폰
                        </div>
                        <div className={cx('coupon-list', 'pd-box')}>
                            <CouponItemList check={false} />
                        </div>
                    </div>
                    <div>
                        <div className={cx('coupon-list', 'pd-box')}>
                            <CouponItemList check={true} />
                        </div>
                    </div>
                    <div>
                        <div className={cx('coupon-list', 'pd-box')}>
                            <UseCouponItemList />
                        </div>
                    </div>
                </SwipeableViews>
            </div>
            <BottomNav />
        </>
    );
}

export default CouponConatiner;