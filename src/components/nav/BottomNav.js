import React, { useState, useEffect, useCallback, useReducer } from 'react';
import styles from './BottomNav.module.scss';
import classNames from 'classnames/bind';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from 'paths';
import {BottomNavHome,BottomNavCoupon,BottomNavOrderlist,BottomNavMypage} from 'components/svg/bottom-nav';

import IconButton from '@material-ui/core/IconButton';

import deliveryImage from '../svg/bottom-nav/delivery.svg';
import deliveryCloseImage from '../svg/bottom-nav/delivery-close.svg';

import { withRouter } from 'react-router-dom';

const cx = classNames.bind(styles);


const initState = {
    home: false,
    coupon: false,
    order: false,
    mypage: false,
}

const tabReducer = (state, action) => {
    switch (action.type) {
        case 'HOME':
            return {
                ...state,
                home:true,
            }
        case 'COUPON':
            return {
                ...state,
                coupon:true,
            }
        case 'ORDER':
            return {
                ...state,
                order:true,
            }
        case 'MYPAGE':
            return {
                ...state,
                mypage:true,
            }
        default:
            return state;
    }
}

const BottomNav = (props) => {


    const[tab, dispatchTab] = useReducer(tabReducer,initState);

    const onUpdateTab = useCallback(()=>{
        console.log(props.match.path);
        if(props.match.path==="/"){
            dispatchTab({type:"HOME"});
        }
        else if(props.match.path.indexOf("coupon")!==-1){
            dispatchTab({type:"COUPON"});
        }
        else if(props.match.path.indexOf("order_list")!==-1){
            dispatchTab({type:"ORDER"});
        }
        else if(props.match.path.indexOf("mypage")!==-1 ||props.match.path.indexOf("account")!==-1 ){
            dispatchTab({type:"MYPAGE"});
        }
    },[props])

    useEffect(() => {
        onUpdateTab();
    }, [onUpdateTab]);

    const history = useHistory();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleChange = () => {
        console.log("체인지");
    }

    const onClickHome = () => {
        history.push(Paths.index);
    }
    const onClickCoupon = () => {
        history.push(`${Paths.ajoonamu.coupon}/mycoupon`)
    }
    const onClickOrderList = () => {
        history.push(`${Paths.ajoonamu.order_list}/order`)
    }
    const onClickMyPage = () => {
        history.push(`${Paths.ajoonamu.mypage}`);
    }


    return (
        <>
            <div className={styles['bottom-nav']}>
                <div className={styles['pd-box']}>

                    <div className={styles['nav-list']}>
                        <IconButton className={styles['nav-item']} onClick={onClickHome}>
                            <div className={styles['icon']}>
                                <BottomNavHome active ={tab.home}/>
                            </div>
                            <div className={cx('menu-name',{active : tab.home})}>홈</div>
                        </IconButton>
                        <IconButton className={styles['nav-item']} onClick={onClickCoupon}>
                            <div className={styles['icon']}>
                                <BottomNavCoupon active ={tab.coupon}/>
                            </div>
                            <div className={cx('menu-name',{active : tab.coupon})}>쿠폰</div>
                        </IconButton>
                        <div className={cx('nav-item', 'order')}>
                            <input type="checkbox" className={styles["menu-open"]} checked={open} onChange={handleChange} />
                            <div className={styles["menu-open-button"]} onClick={handleOpen}>
                                <div className={cx('menu', { visible: !open })}>
                                    <img src={deliveryImage} alt="bottom-nav-delivery" />
                                </div>
                                <div className={cx('menu', { visible: open })}>
                                    <img src={deliveryCloseImage} alt="bottom-nav-delivery" />
                                </div>
                            </div>
                            <Link to={`${Paths.ajoonamu.shop}/custom`} className={styles["menu-item"]} onClick={handleClose}>예약주문</Link>
                            <Link to="#" className={styles["menu-item"]} onClick={handleClose}>택배배송</Link>
                        </div>
                        <IconButton className={styles['nav-item']} onClick={onClickOrderList}>
                            <div className={styles['icon']}>
                                <BottomNavOrderlist active={tab.order}/>
                            </div>
                            <div className={cx('menu-name',{active : tab.order})}>주문내역</div>
                        </IconButton>
                        <IconButton className={styles['nav-item']} onClick={onClickMyPage}>
                            <div className={styles['icon']}>
                                <BottomNavMypage active={tab.mypage}/>
                            </div>
                            <div className={cx('menu-name',{active : tab.mypage})}>마이페이지</div>
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className={cx('dim', {'open': open})} onClick={handleClose} />
        </>
    )
}

export default withRouter(BottomNav);
