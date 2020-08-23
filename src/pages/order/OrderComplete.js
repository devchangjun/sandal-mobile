import React from 'react';
import OrderCompleteContainer from 'containers/order/OrderCompleteContainer';
import qs from 'qs';


export default function OrderComplete({location}){
    console.log(location);
    const query = qs.parse(location.search,{
        ignoreQueryPrefix: true
    });
    console.log(query);

    return(
        <OrderCompleteContainer/>
    )
}