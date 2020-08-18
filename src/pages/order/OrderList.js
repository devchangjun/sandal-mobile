import React from 'react';
import OrderListContainer from 'containers/order/OrderListContainer';

export default function OrderList({match}){
    console.log(match);
    const tab = match.params.tab;
    console.log(tab);
    return(
        <OrderListContainer tab={match.params.tab ? match.params.tab : "delivery"}/>
    )
}