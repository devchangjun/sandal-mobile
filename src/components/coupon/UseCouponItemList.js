import React from 'react';
import styles from './Coupon.module.scss';
import UseCouponItem from './UseCouponItem';

const UseCouponItemList = () => {
    return (
        <div className={styles['coupon-list']}>
            <UseCouponItem />
            <UseCouponItem />
            <UseCouponItem />
            <UseCouponItem />
            <UseCouponItem />
        </div>
    );
};
export default UseCouponItemList;
