import React from 'react';
import styles from './SelectCoupon.module.scss';
import SelectCouponItem from './SelectCouponItem';

const SelectCouponItemList = (props) => {
    const list = props.cp_list.map((cp) => (
        <SelectCouponItem key={cp.cp_id} item={cp} onClick={props.onClick} id={cp.cp_id} />
    ));

    return <div className={styles['coupon-list']}>{list}</div>;
};

export default SelectCouponItemList;
