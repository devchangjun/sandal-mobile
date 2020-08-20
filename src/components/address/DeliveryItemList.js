import React  from 'react';
import styles from './Addr.module.scss';
import DeliveryrItem from './DeliveryrItem';

const DeliveryItemList =(props)=>{

    /*
        최근주소 컴포넌트를 렌더할 리스트
    */ 
   const list = props.addrs.map((addr) =>(
       <DeliveryrItem {...addr} key={addr.delivery_id}/>
   ))
    
    // const list = addrs.map((addr,index) =>(
    //     <DeliveryrItem key={index} jibunAddr ={addr.jibunAddr} roadAddr={addr.roadAddr} onClick={onClick}/>
    // ))
    return(
        <div className={styles['addr-list']}>
            {list}
        </div>
    )
}


export default DeliveryItemList;