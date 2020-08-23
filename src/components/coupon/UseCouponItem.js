import React from 'react';
import styles from './Coupon.module.scss';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

const UseCouponItem = () => {
    return (
        <div className={styles['coupon-item']}>
            <div className={styles['info']}>
                <div className={styles['pd-box']}>
                <CouponDate date={"2020-05-01 (목)"} />
                <CouponEventName event_name={"첫 주문 3,000원 할인"} />
                <CouponEventNumber sub_name={"503050"} />
                <CouponSale sale={"3,000"} />
                </div>
            </div>
        </div>
    )
}

function CouponDate({ date }) {
    return (
        <div className={styles['date']}>
            {date}
        </div>
    )
}


function CouponEventName({ event_name }) {
    return (
        <div className={styles['event-name']}>
            {event_name}
        </div>
    )
}

function CouponEventNumber({ number }) {
    return (
        <div className={styles['number']}>
             주문번호 {number}
        </div>
    )
}

function CouponSale({ sale }) {
    return (
        <div className={styles['sale']}>
            할인 금액 {sale}
        </div>
    )
}



export default UseCouponItem;