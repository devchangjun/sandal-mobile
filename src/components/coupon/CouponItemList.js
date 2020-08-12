import React from 'react';
import styles from './Coupon.module.scss';
import CouponItem from './CouponItem';

const cp_init=[
    {
        cp_id :1,
        event_name:"첫주문 3,000원 할인 쿠폰",
        sale :"3000원",
        sub_name:"첫주문시 사용",
        date:"2020-05-10 ~ 2020-06-10 까지"
    },

    {
        cp_id :2,
        event_name:"첫주문 3,000원 할인 쿠폰",
        sale :"4000원",
        sub_name:"첫주문시 사용",
        date:"2020-05-10 ~ 2020-06-10 까지"
    },
    
    {
        cp_id :3,
        event_name:"첫주문 3,000원 할인 쿠폰",
        sale :"4000원",
        sub_name:"첫주문시 사용",
        date:"2020-05-10 ~ 2020-06-10 까지"
    },
    {
        cp_id :4,
        event_name:"첫주문 3,000원 할인 쿠폰",
        sale :"4000원",
        sub_name:"첫주문시 사용",
        date:"2020-05-10 ~ 2020-06-10 까지"
    },
    {
        cp_id :5,
        event_name:"첫주문 3,000원 할인 쿠폰",
        sale :"4000원",
        sub_name:"첫주문시 사용",
        date:"2020-05-10 ~ 2020-06-10 까지"
    }
]

const CouponItemList =({check})=>{
    const list = cp_init.map(cp=>(
        <CouponItem key ={cp.cp_id} item={cp} check={check}/>
    ))
    
    return(
        <div className={styles['coupon-list']}>
            {list}
        </div>
    )
    
}

export default CouponItemList;