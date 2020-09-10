import React, {useState, useEffect,useCallback, useRef } from 'react';
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
import {getMyCoupons} from '../../api/coupon/coupon';
import Loading from '../../components/asset/Loading';
import Message from '../../components/message/Message';

const cx = classNames.bind(styles);

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


    const history = useHistory();
    const myCouponTitle = useRef(null);
    const [loading, setLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);

    const [index, setIndex] = React.useState(parseInt(tab));
    const [myCoupon ,setMyCoupon] = useState([]);
    const [show, setShow] = useState(false);

    const onScroll = useCallback(e => {
        if (index === 0) {
            const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
            if (scrollTop > 210) setShow(true)
            if (scrollTop<250) setShow(false)
        }
    }, [index]);

    const onChangeTabIndex =(e,value) =>setIndex(value);
    const onChangeSwiperIndex =useCallback((index)=>{
        setIndex(index);
        history.replace(`${Paths.ajoonamu.coupon}?tab=${index}`);
    },[history]);
    const getMyCouponList = async () => {
        setLoading(true);
        const token = sessionStorage.getItem("access_token");
        if (token) {
            const res = await getMyCoupons(token);
            setMyCoupon(res);
            setSuccess(true);
        }
        else setError(true);
        setLoading(false);
    };


    useEffect(()=>{
        getMyCouponList();
        console.log("스크롤 초기화");
    },[])

    useEffect(()=>{
        setShow(false);        
    },[index])

    useEffect(() => {
        window.scrollTo(0,0);
        index === 0 && window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };

    }, [index, onScroll]);

    return (
        <>
        
            <Loading open={loading} />
            <TitleBar title={'쿠폰함'} />
            <div className={cx('title',{show:show})}> 
                 내 쿠폰
            </div>
            <TabMenu tabs={tabInit} index={index} onChange={onChangeTabIndex} />
            <div className={cx('container')}>
                <SwipeableViews
                    enableMouseEvents
                    index={index}
                    onChangeIndex={onChangeSwiperIndex}
                    animateHeight={ (success && !error) ? true : false}
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
                            className={cx('coupon-title', 'pd-box')}
                            ref={myCouponTitle}
                        >
                            내 쿠폰
                        </div>
                        <div className={cx('coupon-list', 'pd-box')}>
                            {myCoupon.length!==0?
                            <CouponItemList check={false} cp_list={myCoupon}/>
                            :
                            <Message
                                msg={"보유하고 있는 쿠폰이 없습니다"}/>
                            }
                        </div>
                    </div>
                    <div>
                        <div className={cx('coupon-list', 'pd-box')}>
                        {myCoupon.length!==0 ?
                            <CouponItemList check={true}  cp_list={myCoupon}/>
                            :
                            <Message
                                msg={"받을 수 있는 쿠폰이 존재하지 않습니다."}/>
                            }
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