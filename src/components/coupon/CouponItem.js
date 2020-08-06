import React from 'react';
import styles from './Coupon.module.scss';
import { FaArrowDown } from 'react-icons/fa';

const CouponItem = (props) => {
    console.log(props);
    return (
        <div className={styles['coupon-item']}>
            <div className={styles['pd-box']}>
                <div className={styles['coupon']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['item']}>
                            <div className={styles['info']}>
                                <CouponEventName event_name={props.item.event_name} />
                                <CouponSale sale={props.item.sale} />
                                <CouponEventSub sub_name={props.item.sub_name} />
                                <CouponDate date={props.item.date} />
                            </div>
                            <div className={styles['down']}>
                                {props.check ? <CouponDown /> : ""}

                            </div>
                        </div>

                    </div>
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
        <div className={styles['down']}>
            <FaArrowDown />
        </div>
    )
}



export default CouponItem;