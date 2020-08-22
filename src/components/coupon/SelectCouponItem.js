import React from 'react';
import styles from './SelectCoupon.module.scss';
import Check from '../svg/coupon/Check';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const SelectCouponItem = (props) => {

    const onClickSelectCoupon =()=>{
         props.onClick(props.id);
    }

    return (
        <div className={cx('coupon-item',{select:props.item.select})} onClick={onClickSelectCoupon}>
            <div className={styles['check']}>
                <SelectCouponCheck select ={props.item.select}/>
            </div>
            <div className={styles['info']}>
                <div className={styles['pd-box']}>
                <SelectCouponEventName event_name={props.item.event_name} />
                <SelectCouponSale sale={props.item.sale} />
                <SelectCouponEventSub sub_name={props.item.sub_name} />
                <SelectCouponDate date={props.item.date} />
                </div>
            </div>
        </div>
    )

}
function SelectCouponEventName({ event_name }) {
    return (
        <div className={styles['event-name']}>
            {event_name}
        </div>
    )
}
function SelectCouponSale({ sale }) {
    return (
        <div className={styles['sale']}>
            {sale}
        </div>
    )
}
function SelectCouponEventSub({ sub_name }) {
    return (
        <div className={styles['sub-name']}>
            {sub_name}
        </div>
    )
}
function SelectCouponDate({ date }) {
    return (
        <div className={styles['date']}>
            {date}
        </div>
    )
}
function SelectCouponCheck({ select }) {
    return (
        <>
        <Check select={select}/>
        </>
    )
}



export default SelectCouponItem;