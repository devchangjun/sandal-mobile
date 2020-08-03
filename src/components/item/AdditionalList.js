import React from 'react';
import styles from './Additional.module.scss';
import Additional from './Additional';

const init=[
    {   
    menu_name:"딸기",
    menu_price:"1000",
    },
    {   
        menu_name:"떡볶이",
        menu_price:"1000",
        },

]
//추가선택 아이템 리스트
const AdditionalList =()=>{

    const list = init.map(item => (
        <Additional key={item.menu_name} menuName={item.menu_name} menuPrice={item.menu_price}/>
    )
    )

    return(
        <div >
            {list}
        </div>
    )
}

export default AdditionalList