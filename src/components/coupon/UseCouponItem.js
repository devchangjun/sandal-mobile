import React from 'react';
import styles from './Coupon.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const UseCouponItem = () => {
    return (
        <div className={styles['use-coupon-item']}>
            <div className={styles['pd-box']}>
            <div className={styles['coupon-item']}>
                <div className={styles['pd-side']}>

                <div className={cx('td', 'date')}>
                    2020-05-21 16:22:11
             </div>
                <div className={cx('td', 'title')}>
                    첫 주문 3000원 할인쿠폰
                </div>
                <div className={styles['td']}>
                    주문번호:  1254562
                </div>
                <div className={styles['td']}>
                    할인금액: 3000원
                </div>
            </div>
            </div>

        </div>
        </div>
    )
}
export default UseCouponItem;