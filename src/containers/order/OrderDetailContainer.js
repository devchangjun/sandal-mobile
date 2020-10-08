import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './OrderComplete.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import DetailOrderItemList from 'components/order/DetailOrderItemList';
import cn from 'classnames/bind';
import { getDetailOrderView } from '../../api/order/orderItem';
import Loading from '../../components/asset/Loading';
import { numberFormat, stringToTel } from '../../lib/formatter';
import {useStore} from '../../hooks/useStore';
import { ButtonBase } from '@material-ui/core';

const cx = cn.bind(styles);

const OrderDetailContainer = ({ order_id }) => {
    const { user } = useSelector((state) => state.auth);
    const user_token = useStore();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const [payinfo ,setPayinfo] = useState([]);

    const getOrderItemInfo = useCallback(async () => {
        setLoading(true);
        if (user_token) {
            try{
                const res = await getDetailOrderView(user_token, order_id);
                console.log(res);
                setOrder(res.orders);
                setPayinfo(res.payinfo);
            }
            catch(e){

            }
        } 
        setLoading(false);

    }, [order_id, history,user_token]);

    useEffect(() => {
        if (!order_id) {
            history.replace('/');
        } else {
            getOrderItemInfo();
        }
    }, [order_id, getOrderItemInfo, history]);

    return (
        <>
            {loading ? (
                <Loading open={loading} />
            ) : (
                <div className={styles['container']}>
                    <div className={styles['order-list']}>
                        <div className={styles['title']}>주문상품</div>
                        <div className={styles['list']}>
                            {order && (
                                <DetailOrderItemList
                                    items={order.items}
                                />
                            )}
                        </div>
                        <div className={cx('title', 'between')}>
                            <div>배달 정보</div>
                            <div className={styles['order-type']}>
                                {order && order.info.order_type ==='reserve' ? '예약주문' : '배달주문'}                                
                            </div>
                        </div>
                        <div className={styles['list']}>
                            <UserInfo
                                value1={order && order.info.s_name}
                                value2={order && `${order.s_addr1} ${order.s_addr2}` }
                                value3={order && stringToTel(order.info.s_hp)}
                            />
                        </div>
                        <div className={styles['title']}>주문정보</div>
                        <div className={styles['list']}>
                            <UserInfo
                                value1={order && order.info.s_name}
                                value2={order && stringToTel(order.info.s_hp)}
                                value3={user && user.email}
                            />
                        </div>
                        <div className={styles['title']}>매장정보</div>
                        <div className={styles['list']}>
                            <UserInfo
                                value1={
                                    order && order.shop_name
                                }
                                value2={
                                    order && `${order.shop_addr1} ${order.shop_addr2}`
                                }
                                value3={
                                    order &&
                                    stringToTel(order.shop_hp)
                                }
                            />
                        </div>
                        <div className={styles['title']}>결제정보</div>
                        <div className={styles['list']}>
                            <PaymentInfo
                                text={'주문번호'}
                                value={order && order.order_id}
                            />
                            <PaymentInfo
                                text={'주문일시'}
                                value={order && order.receipt_time}
                            />
                            <PaymentInfo
                                text={'결제방식'}
                                value={payinfo && payinfo.pp_pg}
                            />
                            <PaymentInfo
                                text={'결제금액'}
                                value={
                                    order &&`${(numberFormat(order.receipt_price))}원`
                                }
                            />
                            <PaymentInfo text={'입금자명'} value={order && order.info.s_name} />
                   
                        </div>
                        <div className={styles['button-box']}>
                            <ButtonBase className={cx(
                                'cancle-btn'
                                ,{status : order && order.info.od_status ==="order_cancel"}
                                )
                            }
                                disabled={order && order.info.od_status ==="order_cancel"}
                            >
                                {order && order.info.od_status ==="order_cancel"? '주문취소완료' : '주문취소'} 
                            </ButtonBase>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const UserInfo = ({ value1, value2, value3 }) => (
    <>
        <div className={styles['name']}>{value1}</div>
        <div className={styles['user-info']}>{value2}</div>
        <div className={styles['user-info']}>{value3}</div>
    </>
);

const PaymentInfo = ({ text, value }) => (
    <div className={styles['payment-info']}>
        <div className={styles['info']}>{text}</div>
        <div className={styles['value']}>{value}</div>
    </div>
);
export default OrderDetailContainer;
