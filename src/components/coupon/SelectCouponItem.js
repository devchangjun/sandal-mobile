import React, { useCallback } from 'react';
import classNames from 'classnames/bind';

import { ButtonBase } from '@material-ui/core';

import styles from './SelectCoupon.module.scss';
import Check from '../svg/coupon/Check';

const cx = classNames.bind(styles);

const SelectCouponItem = (props) => {
    const onClickSelectCoupon = useCallback(() => {
        props.onClick(props.id);
    }, [props]);
    return (
        <ButtonBase className={cx('coupon-item', { select: props.item.select })} onClick={onClickSelectCoupon}>
            <div className={styles['check']}>
                <SelectCouponCheck select={props.item.select} />
            </div>
            <div className={styles['info']}>
                <div className={styles['pd-box']}>
                    <SelectCouponEventName event_name={props.item.event_name} />
                    <SelectCouponSale sale={props.item.sale} />
                    <SelectCouponEventSub sub_name={props.item.sub_name} />
                    <SelectCouponDate date={props.item.date} />
                </div>
            </div>
        </ButtonBase>
    );
};
const SelectCouponEventName = ({ event_name }) => <div className={styles['event-name']}>{event_name}</div>;
const SelectCouponSale = ({ sale }) => <div className={cx('text', 'sale')}>{sale}</div>;
const SelectCouponEventSub = ({ sub_name }) => <div className={cx('text', 'sub-name')}>{sub_name}</div>;
const SelectCouponDate = ({ date }) => <div className={cx('text', 'date')}>{date}</div>;
const SelectCouponCheck = ({ select }) => <Check select={select} />

export default SelectCouponItem;
