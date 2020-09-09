import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styles from './OrderComplete.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import DetailOrderItemList from 'components/order/DetailOrderItemList';
import { stringToTel } from '../../lib/formatter';
import cn from 'classnames/bind';
import {getDetailOrderView} from '../../api/order/orderItem';
import Loading from '../../components/asset/Loading';

const cx = cn.bind(styles);

const OrderDetailContainer = ({order_id}) => {

    const {user} = useSelector((state)=>state.auth);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [order_info ,setOrderInfo] = useState(null);

    const getOrderItemInfo = async()=>{
        setLoading(true);
        const token = sessionStorage.getItem("access_token");
        if(token){
            const res = await getDetailOrderView(token,order_id);
            setOrderInfo(res);
        }
        setLoading(false);
    }


    useEffect(()=>{
        if(!order_id){
            history.replace('/');
        }
        else{
            getOrderItemInfo();
        }
    },[order_id,history])

   return (
       <>
           <TitleBar title={'주문완료'} />
           {loading ? (
               <Loading open={loading} />
           ) : (
               <div className={styles['container']}>
                   <div className={styles['order-list']}>
                       <div className={styles['title']}>주문상품</div>
                       <div className={styles['list']}>
                            {order_info && <DetailOrderItemList items={order_info.orders.items}/>}
                       </div>
                       <div className={cx('title', 'between')}>
                           <div>배달 정보</div>
                           <div className={styles['order-type']}>예약주문</div>
                       </div>
                       <div className={styles['list']}>
                           <UserInfo
                               value1={user && user.name}
                               value2={order_info && order_info.orders.s_addr1}
                               value3={user && stringToTel(user.hp)}
                           />
                       </div>
                       <div className={styles['title']}>주문정보</div>
                       <div className={styles['list']}>
                           <UserInfo
                               value1={user && user.name}
                               value2={user &&  stringToTel(user.hp)}
                               value3={user && user.email}
                           />
                       </div>
                       <div className={styles['title']}>매장정보</div>
                       <div className={styles['list']}>
                           <UserInfo
                               value1={order_info && order_info.orders.shop_name}
                               value2={order_info && order_info.orders.shop_addr1}
                               value3={order_info && stringToTel(order_info.orders.shop_hp)}
                           />
                       </div>
                       <div className={styles['title']}>결제정보</div>
                       <div className={styles['list']}>
                           <PaymentInfo
                               text={'주문번호'}
                               value={order_info && order_info.orders.order_id}
                           />
                           <PaymentInfo
                               text={'주문일시'}
                               value={'2020-00-00 12:59:59'}
                           />
                           <PaymentInfo
                               text={'결제방식'}
                               value={'가상계좌 입금'}
                           />
                           <PaymentInfo text={'결제금액'} value={order_info && order_info.orders.total_price} />
                           <PaymentInfo text={'입금자명'} value={'김종완'} />
                           <PaymentInfo
                               text={'입금계좌'}
                               value={'국민은행 12345-67-89000 아주나무'}
                           />
                           <PaymentInfo
                               text={'가상계좌 유효기간'}
                               value={'2020년 06월 09일 00:00:00'}
                           />
                       </div>
                       <div className={styles['button-box']}>
                           <div className={styles['cancle-btn']}>
                               주문 취소하기
                           </div>
                       </div>
                   </div>
               </div>
           )}
       </>
   );
};

const UserInfo = ({ value1, value2, value3 }) => (
    <>
        <div className={styles['name']}>{value1}</div>
        <div className={styles['user-info']}>{value2}</div>
        <div className={styles['user-info']}>{value3}</div>
    </>
);

const  PaymentInfo = ({ text, value }) => (
    <div className={styles['payment-info']}>
        <div className={styles['info']}>{text}</div>
        <div className={styles['value']}>{value}</div>
    </div>
);
export default OrderDetailContainer;
