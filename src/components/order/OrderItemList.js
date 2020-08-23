import React from 'react';
import styles from './Order.module.scss';
import OrderItem  from './OrderItem';

const init =[
    
        {
            id:1,
            "items": [
                {
                    "item_name": "Mrs.",
                    "item_option": "Prof.,Dr.,Prof.",
                    "item_price": 118878
                },
                {
                    "item_name": "Mrs.",
                    "item_option": "Prof.,Dr.,Prof.",
                    "item_price": 118878
                }
            ],
            "order_id": "1595939719-9969746",
            "total_price": 237756,
            "send_cost": 9000,
            "cp_price": 1000,
            "point_price": 2000,
            "receipt_price": 243756
        },
        {
            id:2,
            "items": [
                {
                    "item_name": "Mrs.",
                    "item_option": "Prof.,Dr.,Prof.",
                    "item_price": 118878
                },
                {
                    "item_name": "Mrs.",
                    "item_option": "Prof.,Dr.,Prof.",
                    "item_price": 118878
                }
            ],
            "order_id": "1595939697-8596106",
            "total_price": 237756,
            "send_cost": 9000,
            "cp_price": 1000,
            "point_price": 2000,
            "receipt_price": 243756
        },
        {
            id:3,
            "items": [
                {
                    "item_name": "Mrs.",
                    "item_option": "Prof.,Dr.,Prof.",
                    "item_price": 118878
                }
            ],
            "order_id": "1595939665-7489671",
            "total_price": 118878,
            "send_cost": 9000,
            "cp_price": 1000,
            "point_price": 2000,
            "receipt_price": 124878
        },
        {
            id:4,
            "items": [
                {
                    "item_name": "Mrs.",
                    "item_option": "Prof.,Dr.,Prof.",
                    "item_price": 118878
                }
            ],
            "order_id": "1595939664-3236305",
            "total_price": 118878,
            "send_cost": 9000,
            "cp_price": 1000,
            "point_price": 2000,
            "receipt_price": 124878
        },
        {
            id:5,
            "items": [
                {
                    "item_name": "Mrs.",
                    "item_option": "Prof.,Dr.,Prof.",
                    "item_price": 118878
                }
            ],
            "order_id": "1595939663-1918504",
            "total_price": 118878,
            "send_cost": 9000,
            "cp_price": 1000,
            "point_price": 2000,
            "receipt_price": 124878
        },
        {
            id:6,
            "items": [
                {
                    "item_name": "Mrs.",
                    "item_option": "Prof.,Dr.,Prof.",
                    "item_price": 118878
                }
            ],
            "order_id": "1595939662-7548125",
            "total_price": 118878,
            "send_cost": 9000,
            "cp_price": 1000,
            "point_price": 2000,
            "receipt_price": 124878
        },

        {
            id:7,
            "items": [
                {
                    "item_name": "Mrs.",
                    "item_option": "Prof.,Dr.,Prof.",
                    "item_price": 118878
                }
            ],
            "order_id": "1595924261-3598512",
            "total_price": 118878,
            "send_cost": 0,
            "cp_price": 1000,
            "point_price": 0,
            "receipt_price": 115878
        }

]


const OrderItemList=()=>{
    const list =init.map(order => (
        <OrderItem {...order} key={order.id}/>
    ))
    return(
        <div className={styles['order-list']}>
            {list}
        </div>
    )
}
export default OrderItemList;