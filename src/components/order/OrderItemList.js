import React from 'react';
import styles from './Order.module.scss';
import OrderItem  from './OrderItem';
const OrderItemList=({order_list,onClick})=>{
    const list =order_list.map(order => (
        <OrderItem {...order} key={order.order_id} onClick={()=>{onClick(order.order_id)}}/>
    ))
    return(
        <div className={styles['order-list']}>
            {list}
        </div>
    )
}
export default OrderItemList;