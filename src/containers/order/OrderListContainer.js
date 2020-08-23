import React,{useState, useEffect} from 'react';
import styles from './OrderList.module.scss';
import { Paths } from 'paths';
import TitleBar from 'components/titlebar/TitleBar';
import TabMenu from 'components/tab/TabMenu';
import OrderItemList from 'components/order/OrderItemList';
import BottomNav from 'components/nav/BottomNav';
import BottomModal from 'components/nav/BottomModal';

import Message from 'components/message/Message';
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
    const [open,setOpen] = useState(false);
    
    const handleOpen =()=>setOpen(true);
    const handleClose =()=>setOpen(false);
    
    useEffect(()=>{
        // console.log("탭 바뀜");
        // console.log(tab);
    },[tab])
    

    return (
        <>
        <TitleBar title={"주문내역"} sub={true} onClick={handleOpen}/>
        <TabMenu tabs={tabInit} />
            <div className={styles['container']}>
                <div className={styles['pd-box']}>
                    {tab === 'order' && <><OrderItemList /></>}
                    {tab ==='delivery' && 
                    <Message
                        src={true}
                        msg={"주문 내역이 존재하지 않습니다."}
                        isButton={true}
                        buttonName={"주문하러 가기"}
                    />  
                    }
                </div>


            </div>
            <BottomNav/>
            <BottomModal
                open ={open}
                handleClose={handleClose}
            />

        </>
    )
}
export default OrderListContainer;