import React from 'react';
import OrderCompleteContainer from 'containers/order/OrderCompleteContainer';
import qs from 'qs';
import { Paths } from '../../paths';

export default function OrderComplete({ location }) {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { order_number, message } = query;
    if (message.indexOf('종료') !== -1) {
        window.location = Paths.ajoonamu.order;
    }
    return <OrderCompleteContainer order_number={order_number} />;
}
