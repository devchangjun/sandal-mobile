import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory,useLocation } from 'react-router-dom';
import { Paths } from 'paths';
import styles from './Coupon.module.scss';
import classNames from 'classnames/bind';

//components
import TabMenu from '../../components/tab/TabMenu';
import CouponItemList from '../../components/coupon/CouponItemList';
import DownCouponList from '../../components/coupon/DownCouponList';
import UseCouponItemList from '../../components/coupon/UseCouponItemList';
import Loading from '../../components/asset/Loading';
import Message from '../../components/message/Message';
import { Button } from '@material-ui/core';
import SwipeableViews from "react-swipeable-views";
import BottomModal from '../../components/nav/BottomModal';
import TitleBar from '../../components/titlebar/TitleBar';

import date from 'components/svg/title-bar/date.svg';
import { IconButton } from '@material-ui/core';

//api
import { getMyCoupons, getDownloadCpList, downloadCoupon, couponInput } from '../../api/coupon/coupon';

//hooks
import produce from 'immer';

//lib
import { useStore } from '../../hooks/useStore';
import { useModal } from '../../hooks/useModal';
import { calculateDate } from '../../lib/calculateDate';



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

const CouponConatiner = ({ tab = '0' }) => {

    const openModal = useModal();
    const location = useLocation();
    const history = useHistory();
    const myCouponTitle = useRef(null);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(
        calculateDate(new Date(), 7, 'DATE'),
    );
    const [endDate, setEndDate] = useState(new Date());
    const user_token = useStore();

    const [index, setIndex] = React.useState(parseInt(tab));
    const [cp_list, setCpList] = useState([]);
    const [user_input_cp, setUserInputCp] = useState('');
    const [down_cp_list, setDownCpList] = useState([]);
    const [show, setShow] = useState(false);


    const [open,setOpen] = useState(false);
    const handleOpen =()=>setOpen(true);
    const handleClose =()=>setOpen(false);

    const onChangeUserInputCp = (e) => setUserInputCp(e.target.value);

    const onScroll = useCallback(e => {
        if (index === 0) {
            const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
            if (scrollTop > 210) setShow(true)
            if (scrollTop < 250) setShow(false)
        }
    }, [index]);

    const onChangeTabIndex = (e, value) => setIndex(value);
    const onChangeSwiperIndex = useCallback((index) => {
        setIndex(index);
        history.replace(`${Paths.ajoonamu.coupon}?tab=${index}`);
    }, [history]);
    const getMyCouponList = async () => {
        setLoading(true);
        if (user_token) {
            try {
                const res = await getMyCoupons(user_token);
                setCpList(res);
            } catch (e) {
                console.error(e);
            }
        }
        setLoading(false);
    };

    // 다운로드 가능한 쿠폰 리스트
    const getDownCouponList = async () => {
        if (user_token) {
            try {
                const res = await getDownloadCpList(user_token);
                console.log(res);
                setDownCpList(res);
            }
            catch (e) {
                console.error(e);
            }

        }
    };

    const callCouponDownload = useCallback(
        async (cp) => {
            try {
                const res = await downloadCoupon(user_token, cp.cz_id);
                console.log(res);
                if (
                    res.data.msg === '이미 해당 쿠폰존에서 받은 쿠폰이력이 있습니다.'
                ) {
                    openModal('이미 다운로드 한 쿠폰입니다.', res.data.msg);
                } else {

                    openModal('다운로드 성공했습니다.', res.data.msg);
                    const newState = cp_list.concat(cp);
                    setCpList(newState);
                }
                const idx = down_cp_list.findIndex(
                    (item) => item.cz_id === cp.cz_id,
                );
                setDownCpList(
                    produce(down_cp_list, (draft) => {
                        draft[idx].check = true;
                    }),
                );
            } catch (e) {

            }
        },
        [user_token, down_cp_list, openModal],
    );

    const inputCoupon = useCallback(async () => {
        if (user_input_cp === '') {
            return;
        }
        try {
            const res = await couponInput(user_token, user_input_cp);
            console.log(res);
            if (res.data.msg === '성공') {
                openModal('쿠폰 등록이 완료되었습니다.');
                getMyCouponList();
            }
            else if (res.data.msg === '이미 발급된 쿠폰입니다.') {
                openModal('쿠폰번호를 확인해주세요',res.data.msg);
            }
            else if (res.data.msg === "해당 쿠폰번호에 맞는 쿠폰이 존재하지 않습니다.") {
                openModal('쿠폰번호를 확인해주세요', res.data.msg);
            }
        } catch (e) {

        }
    }, [user_token, user_input_cp, openModal]);



    const getChild= useCallback(()=>{
        const {pathname,search} =location; 
        if(pathname==='/coupon'){
            if(search.indexOf('tab=2')!==-1){
                return(
                    <IconButton onClick={handleOpen}>
                    <img src={date} alt="date" />
                  </IconButton>
                )
            }
        }

    },[location]);
   

    useEffect(() => {
        getMyCouponList();
    }, [])
    useEffect(() => {
        getDownCouponList();
    }, [])
    useEffect(()=>{
        getChild();
    },[getChild])

    useEffect(() => {
        setShow(false);
    }, [index])

    useEffect(() => {
        window.scrollTo(0, 0);
        index === 0 && window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [index, onScroll]);


    return (
        <>
            <TitleBar title={'쿠폰'}>
                {getChild()}
            </TitleBar>
            {loading ? (
                <Loading open={true} />
            ) : (
                <>
                    <div className={cx('title', { show: show })}>내 쿠폰</div>
                    <TabMenu
                        tabs={tabInit}
                        index={index}
                        onChange={onChangeTabIndex}
                    />
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
                                        value={user_input_cp}
                                        onChange={onChangeUserInputCp}
                                        placeholder={'쿠폰 코드를 입력하세요'}
                                    />
                                    <Button
                                        className={styles['submit-btn']}
                                        onClick={inputCoupon}
                                    >
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
                                    {cp_list.length !== 0 ? (
                                        <CouponItemList cp_list={cp_list} />
                                    ) : (
                                        <Message
                                            msg={
                                                '보유하고 있는 쿠폰이 없습니다'
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className={cx('coupon-list', 'pd-box')}>
                                    {down_cp_list.length !== 0 ? (
                                        <DownCouponList
                                            check={true}
                                            cp_list={down_cp_list}
                                            onClick={callCouponDownload}
                                        />
                                    ) : (
                                        <Message
                                            msg={
                                                '받을 수 있는 쿠폰이 존재하지 않습니다.'
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className={cx('coupon-list', 'pd-box')}>
                                    <UseCouponItemList />
                                </div>
                            </div>
                        </SwipeableViews>
                    </div>
                </>
            )}
            <BottomModal
                startDate={startDate} setStartDate={setStartDate}
                endDate={endDate} setEndDate={setEndDate}
                open={open} handleClose={handleClose}
                // onClick={getOrderItems}
                onClick={() => {}}
            />
        </>
    );
}

export default CouponConatiner;
