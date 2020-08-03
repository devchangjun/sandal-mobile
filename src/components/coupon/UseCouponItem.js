import React from 'react';
import styles from './Coupon.module.scss';

const UseCouponItem =()=>{
    return (
        <div className={styles['use-coupon-item']}>
                <div className={styles['td']}>
                     첫 주문 할인
                </div>
                <div className={styles['td']}>
                    1254562
                </div>  
                <div className={styles['td']}>
                    3000원  
                </div>
                <div className={styles['td']}>
                  2020-05-21 16:22:11
                </div>
        </div>
    )
}
export default UseCouponItem;