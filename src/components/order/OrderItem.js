import React from 'react';
import styles from './Order.module.scss';
import { numberFormat } from "../../lib/formatter";


// 전제척인 주문 메뉴 아이템
const OrderItem = (props) => {
    const {
        id,
        items,
        order_id,
        total_price, 
        send_cost,
        cp_price,
        point_price,
        receipt_price
    } = props;
    return (
        <div className={styles['order-item']} onClick={props.onClick}>
            <div className={styles['item']}>
                <div className={styles['menu']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['date']}>
                            {order_id}
                        </div>
                        <div className={styles['list']}>
                            <OrderMenuItemList />
                        </div>

                    </div>
                </div>
                <div className={styles['cost']}>
                    <div className={styles['pd-box']}>

                        <div className={styles['total']}>
                            <span>결제금액</span>{numberFormat(receipt_price)}원
                          </div>
                        <div className={styles['sub']}>
                            주문금액 {numberFormat(total_price)}원 + 배송비 {numberFormat(send_cost)}원 - <br/>
                            포인트 할인 {numberFormat(point_price)}원 + 쿠폰 할인 {numberFormat(cp_price)}원<br/>
                          </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

//주문 메뉴 리스트
const OrderMenuItemList = () => {
    return (
        <div className={styles['menu-item-list']}>
            <OrderMenuItem />
            <OrderMenuItem />
        </div>
    )
}

//주문 메뉴 아이템 (개별)
const OrderMenuItem = () => {
    return (
        <div className={styles['menu-name']}>
            <div className={styles['name']}>
                과일도시락 10개
            </div>
            <div className={styles['options']}>
                (추가선택 : 없음 / 비용 : 30,000원)
            </div>
        </div>
    )
}

export default OrderItem;