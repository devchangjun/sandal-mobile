import React from 'react';
import styles from './OrderList.module.scss';
import { Paths } from 'paths';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import TabMenu from 'components/tab/TabMenu';
import OrderItem from 'components/order/OrderItem';

const tabInit = [
    {
        url: `${Paths.ajoonamu.order_list}/order?`,
        name: '예약주문'
    },
    {
        url: `${Paths.ajoonamu.order_list}/delivery`,
        name: '배달주문'
    },

]


const OrderListContainer = ({ tab = 'order' }) => {
    return (
        <>
            <Header />
            <div className={styles['order-list-tab']}>
                <TabMenu tabs={tabInit} />
                <div className={styles['container']}>
                    {tab === 'order' && <OrderItem />}
                </div>
            </div>

        </>
    )
}
export default OrderListContainer;