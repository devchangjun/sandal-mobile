import React from 'react';
import Additional from './Additional';


//추가선택 아이템 리스트
const AdditionalList = ({ itemList, onClickAddItem }) => {
    const list = itemList.map((item) => (
        <Additional
            key={item.id}
            menuName={item.menu_name}
            menuPrice={item.menu_price}
            check={item.check}
            onClickAddItem={(e) => onClickAddItem(item.id)}
        />
    ));
    return <div>{list}</div>;
};

export default AdditionalList;
