import React from 'react';
import DetailOrderItem from './DetailOrderItem';
const DetailOrderItemList = ({ items }) => {
    const list = items.map((item, index) => (
        <DetailOrderItem {...item} key={index} />
    ));
    return <> {list}</>;
};

export default DetailOrderItemList;
