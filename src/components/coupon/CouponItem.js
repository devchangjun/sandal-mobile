import React from 'react';
import styles from './Coupon.module.scss';
import DownCoupon from 'components/svg/coupon/down.svg';
const CouponItem = (props) => {
    // console.log(props);
    return (
        <div className={styles['coupon-item']}>
            <div className={styles['down']}>
                <CouponDown check ={props.check}/>
            </div>
            <div className={styles['info']}>
                <div className={styles['pd-box']}>
                <CouponEventName event_name={props.item.event_name} />
                <CouponSale sale={props.item.sale} />
                <CouponEventSub sub_name={props.item.sub_name} />
                <CouponDate date={props.item.date} />
                </div>
            </div>
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
function CouponSale({ sale }) {
    return (
        <div className={styles['sale']}>
            {sale}
        </div>
    )
}
function CouponEventSub({ sub_name }) {
    return (
        <div className={styles['sub-name']}>
            {sub_name}
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
function CouponDown({ check }) {
    return (
        <>
        {check &&<img src ={DownCoupon} alt="다운"/>}
        </>
    )
}



export default CouponItem;