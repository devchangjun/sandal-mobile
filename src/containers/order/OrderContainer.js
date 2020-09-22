import React, { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import produce from 'immer';
import { Paths }from 'paths';
import { ButtonBase } from '@material-ui/core';
import TitleBar from 'components/titlebar/TitleBar';
import Button from 'components/button/Button';
import PointModal from 'components/modal/PointModal';
import CouponModal from 'components/modal/CouponModal';
import PaymentModal from 'components/modal/PaymentModal';
import OrderCheck from 'components/svg/order/OrderCheck';
import styles from './Order.module.scss';
import Back from 'components/svg/header/Back';
import {getOrderCoupons} from '../../api/coupon/coupon';
import {getCartList} from '../../api/cart/cart';
import { numberFormat } from '../../lib/formatter';
import {useStore} from '../../hooks/useStore';


const cx = classNames.bind(styles);

const cp_init = [
    {
        cp_id: 1,
        event_name: '첫 주문 3,000원 할인 쿠폰',
        sale: '3000원',
        sub_name: '첫주문시 사용',
        date: '2020-05-10 ~ 2020-06-10 까지',
        select: false,
    },

    {
        cp_id: 2,
        event_name: '첫 주문 3,000원 할인 쿠폰',
        sale: '4000원',
        sub_name: '첫 주문시 사용',
        date: '2020-05-10 ~ 2020-06-10 까지',
        select: false,
    },

    {
        cp_id: 3,
        event_name: '첫 주문 3,000원 할인 쿠폰',
        sale: '4000원',
        sub_name: '첫 주문시 사용',
        date: '2020-05-10 ~ 2020-06-10 까지',
        select: false,
    },
    {
        cp_id: 4,
        event_name: '첫 주문 3,000원 할인 쿠폰',
        sale: '4000원',
        sub_name: '첫 주문시 사용',
        date: '2020-05-10 ~ 2020-06-10 까지',
        select: false,
    },
    {
        cp_id: 5,
        event_name: '첫 주문 3,000원 할인 쿠폰',
        sale: '4000원',
        sub_name: '첫 주문시 사용',
        date: '2020-05-10 ~ 2020-06-10 까지',
        select: false,
    },
];
const initPayment = [
    {
        payment: '신용카드',
    },
    {
        payment: '가상계좌 결제',
    },
    {
        payment: '휴대폰 결제',
    },
    {
        payment: '만나서 직접 결제',
    },
];

const OrderContainer = () => {
    // 포인트모달, 결제방식 모달 때 사용할 것.
    const history = useHistory();
    const user_token = useStore();
    const [pointOpen, setPointOpen] = useState(false);
    const onClickPointOpen = () => setPointOpen(true);
    const onClickPointClose = () => setPointOpen(false);
    const [couponOpen, setCouponOpen] = useState(false);
    const onClickCouponOpen = () => setCouponOpen(true);
    const onClickCouponClose = () => setCouponOpen(false);
    const [paymentOpen, setPaymentOpen] = useState(false);
    const onClickPaymentOpen = () => setPaymentOpen(true);
    const onClcikPaymentClose = () => setPaymentOpen(false);

    const [couponList, setCouponList] = useState(cp_init);
    const [payment, setPayment] = useState('만나서 직접 결제');

    const [totalPrice,setTotalPrice]  = useState(0);
    const [toggle , setToggle ] = useState(false);
    const [delivery_cost, setCost] = useState(0); // 배달비

    const onClickToggle =()=>setToggle(!toggle);

    const onClickPayment = (payment) => {
        setPayment(payment);
        setPaymentOpen(false);
        sessionStorage.setItem('payment',payment);
    };

    const onClickSelectCoupon = (data) => {
        const index = couponList.findIndex((c) => c.cp_id === data);
        console.log(index);
        setCouponList(
            produce(couponList, (draft) => {
                draft[index].select = !draft[index].select;
            }),
        );
    };

    const onClickOrder = () => {
        history.push(`${Paths.ajoonamu.order_complete}?order_number=${1234567890}`);
    }

    const getUserCoupons =async()=>{

        if(user_token){
            const res = await getOrderCoupons(user_token);
            console.log(res);
            setCouponList(res);
        }
    }

    const getTotalPrice = async ()=>{
      
        if (user_token) {
            const res = await getCartList(user_token);
            console.log(res);
            let price = 0;
            let len = Object.keys(res).length;
       
            for (let i = 0; i < len - 1; i++) {
                const {item_price,item_quanity} = res[i].item;
                console.log(res[i]);
                price+=item_price * item_quanity;
            }
            setTotalPrice(price);
            setCost(res.delivery_cost);

        }
    }

    const getPayment = ()=>{
        const payment_item = sessionStorage.getItem('payment');
        if(payment_item){
            setPayment(payment_item);
        }
        
    }
    useEffect(()=>{
        window.scrollTo(0,0);
        getUserCoupons();
        getTotalPrice();
        getPayment();

    },[])

    return (
        <>
            <TitleBar title={'주문하기'} />
            <div className={styles['order']}>
                <div className={cx('title', 'pd-box')}>배달정보</div>
                <div className={styles['table']}>
                    <div className={cx('text-info')}>
                        <div className={styles['info']}>
                            서울특별시 구로구 구로동 557
                        </div>
                    </div>
                    <div className={cx('text-info')}>
                    <div className={cx('info', 'row')}>
                            <input
                                type="text"
                                className={cx('input', 'normal')}
                                placeholder="상세주소를 입력하세요."
                            />
                        </div>
                    </div>
                    <div className={cx('text-info')}>
                        <div className={cx('info', 'row')}>
                            <input
                                type="text"
                                placeholder="핸드폰번호"
                                className={cx('input', 'auth')}
                            />
                            <ButtonBase className={styles['auth-btn']}>인증번호 발송</ButtonBase>
                        </div>
                    </div>
                    <div className={cx('text-info')}>
                        <div className={cx('info', 'row')}>
                            <input
                                type="text"
                                placeholder="인증번호"
                                className={cx('input', 'auth')}
                            />
                            <ButtonBase className={styles['auth-btn']}>인증하기</ButtonBase>
                        </div>
                    </div>
                </div>

                <div className={cx('title', 'pd-box')}>요청사항</div>
                <div className={cx('table', 'pd-box')}>
                    <div className={styles['input-save']}>
                        <div className={styles['input-title']}>
                            주문 요청사항
                        </div>
                        <div className={styles['save']}>
                            <input className={styles['check']} type="checkbox" id="check1"></input>
                            <label className={styles['label']} htmlFor="check1">
                            자동저장
                            </label>
                        </div>
                    </div>
                    <div className={cx('value', 'mg-bot')}>
                        <input type="text" className={styles['input']}></input>
                    </div>
                    <div className={styles['input-save']}>
                        <div className={styles['input-title']}>
                            배달 요청사항
                        </div>
                        <div className={styles['save']}>
                        <input className={styles['check']} type="checkbox" id="check2"></input>
                            <label className={styles['label']} htmlFor="check2">
                            자동저장
                            </label>
                        </div>
                    </div>
                    <div className={styles['value']}>
                        <input type="text" className={styles['input']}></input>
                    </div>
                </div>
                <div className={cx('title', 'pd-box')}>결제방법</div>
                <div className={cx('table' ,'mg-none')}>
                    <div className={cx('value','pd-none')}>
                        <ButtonBase className={styles['payment']} onClick={onClickPaymentOpen}>{payment}</ButtonBase>
                        <div className={styles['label']}>
                            다른결제를 원하시면 눌러서 변경해주세요.
                        </div>
                    </div>
 
                </div>
                <div className={styles['order-info']}>
                        <ButtonBase className={cx('box', 'pd-box')}>
                            <div className={cx('box', 'pd-box')} onClick={onClickCouponOpen}>
                                <div className={styles['label']}>할인 쿠폰</div>
                                <div className={styles['info']}>1개 보유
                                <Back rotate="180deg" strokeWidth={1.5} stroke={"#707070"} width={18} height={18}/>
                                </div>
                             
                            </div>
                        </ButtonBase>
                        <ButtonBase className={cx('box', 'pd-box')}>
                            <div className={cx('box', 'pd-box')} onClick={onClickPointOpen}>
                                <div className={styles['label']}>포인트 사용</div>
                                <div className={styles['info']}>1,000원
                                <Back rotate="180deg" strokeWidth={1.5} stroke={"#707070"} width={18} height={18}/>
                                </div>
                            </div>
                        </ButtonBase>
                    </div>
                <div className={cx('table', 'pd-box', 'bg-color', 'pd-top')}>
                    <div className={cx('total-order')}>
                        <div className={cx('item')}>
                            <div className={cx('text-cost', 'title')}>
                                <div className={cx('pd-box', 'text-cost')}>
                                    <div className={cx('text')}>
                                        총 결제금액
                                    </div>
                                    <div className={cx('cost')}>{numberFormat(parseInt(totalPrice)+ parseInt(delivery_cost))}원</div>
                                </div>
                            </div>
                            <div className={styles['total-table']}>
                                <div className={cx('text-cost', 'info')}>
                                    <div className={cx('pd-in', 'text-cost')}>
                                        <div className={cx('text')}>
                                            주문 금액
                                        </div>
                                        <div className={cx('cost')}>
                                        {numberFormat(totalPrice)}원
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('text-cost', 'info')}>
                                    <div className={cx('pd-in', 'text-cost')}>
                                        <div className={cx('text')}>
                                            배달비용
                                        </div>
                                        <div className={cx('cost')}>
                                        {numberFormat(delivery_cost)}원
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('text-cost', 'info')}>
                                    <div className={cx('pd-in', 'text-cost')}>
                                        <div className={cx('text')}>
                                            쿠폰 할인
                                        </div>
                                        <div className={cx('cost')}>
                                        -3,000원
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('text-cost', 'info')}>
                                    <div className={cx('pd-in', 'text-cost')}>
                                        <div className={cx('text')}>
                                            포인트 할인
                                        </div>
                                        <div className={cx('cost')}>
                                        -1,000원
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('agree-order')} onClick={onClickToggle}>
                        <OrderCheck check={toggle}/>
                        <div className={styles['text']}>
                            구매에 동의하시겠습니까?
                        </div>
                    </div>
                </div>
            </div>
            <Button title={`${numberFormat(totalPrice +delivery_cost)}원 결제`} toggle={toggle} onClick={onClickOrder}/>
            <PointModal open={pointOpen} handleClose={onClickPointClose} />
            <CouponModal
                open={couponOpen}
                handleClose={onClickCouponClose}
                onClick={onClickSelectCoupon}
                list={couponList}
            />
            <PaymentModal
                open={paymentOpen}
                handleClose={onClcikPaymentClose}
                payments={initPayment}
                payment={payment}
                onClick={onClickPayment}
            />
        </>
    );
};

export default OrderContainer;
