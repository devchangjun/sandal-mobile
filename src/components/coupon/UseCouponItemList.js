import React from 'react';
import styles from './Coupon.module.scss';
import UseCouponItem from './UseCouponItem';


const UseCouponItemList=()=>{
    return(


        <div className={styles['use-coupon-table']}>
            <div className={styles['tr']}>
                <div className={styles['event-name']}>
                     쿠폰이름
                </div>
                <div className={styles['order-number']}>
                        주문번호
                </div>  
                <div className={styles['sale']}>
                    할인가격
                </div>
                <div className={styles['use-date']}>
                사용날짜
                </div>
            </div>
            <UseCouponItem/>
            <UseCouponItem/>
            <UseCouponItem/>
            <UseCouponItem/>
    
        </div>
    )
}
export default UseCouponItemList;