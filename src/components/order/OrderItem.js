import React from 'react';
import styles from './Order.module.scss';



const OrderItem = () => {
    return (
        <div className={styles['order-item']}>
            <div className={styles['item']}>
                <div className={styles['menu']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['date']}>
                            2020-05-01(목) 24:59:59
                        </div>
                        <div className={styles['list']}>
                            <MenuItemList />
                        </div>

                    </div>
                </div>
                <div className={styles['cost']}>
                    <div className={styles['pd-box']}>

                        <div className={styles['total']}>
                            <span>결제금액</span>66,000원
                          </div>
                        <div className={styles['sub']}>
                            주문금액 60,000원 + 배송비 6,000원
                          </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

const MenuItemList = () => {
    return (
        <div className={styles['menu-item-list']}>
            <MenuItem />
            <MenuItem />
        </div>
    )
}
const MenuItem = () => {
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