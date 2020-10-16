import React,{useState, useEffect,useRef,useCallback} from 'react';
import styles from './OrderList.module.scss';
import { useHistory } from 'react-router-dom';
import { Paths } from 'paths';
import TitleBar from 'components/titlebar/TitleBar';
import TabMenu from 'components/tab/TabMenu';
import OrderItemList from '../../components/order/OrderItemList';
import BottomModal from '../../components/nav/BottomModal';
import date from 'components/svg/title-bar/date.svg';
import Message from 'components/message/Message';
import Loading from '../../components/asset/Loading';
import { IconButton } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getOrderList } from '../../api/order/orderItem';
import { useStore } from '../../hooks/useStore';
import { calculateDate } from '../../lib/calculateDate';

const tabInit = [
    {
        url: `${Paths.ajoonamu.order_list}?tab=0`,
        name: '예약주문',
    },
    {
        url: `${Paths.ajoonamu.order_list}?tab=1`,
        name: '택배주문',
    },
];

const OrderListContainer = ({ tab = '0' }) => {
    const [success, setSuccess] = useState(false);
    // const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(parseInt(tab));
    // const [order_list, setOrderList] = useState([]);
    // const [dlvList, setDlvList] = useState([]);
    const [reserveList, setReserveList] = useState([]);
    const [startDate, setStartDate] = useState(
        calculateDate(new Date(), 7, 'DATE'),
    );
    const [endDate, setEndDate] = useState(new Date());
    const [select, setSelect] = useState(0);
    const user_token = useStore();
    const history = useHistory();
    const SWIPER = useRef(null);
    
    const handleOpen =()=>setOpen(true);
    const handleClose =()=>setOpen(false);

    const onChangeTabIndex = (e, value) => {
        setIndex(value);
        SWIPER.current.slideTo(value,300);
    }
    const onChangeSwiperIndex =(index)=>{
        setIndex(index);
        history.replace(`${Paths.ajoonamu.order_list}?tab=${index}`);
    };
    const getOrderItems = async () => {
        setLoading(true);
        if (user_token) {
            try {
                const res = await getOrderList(
                    user_token,
                    0,
                    100,
                    // (page - 1) * PAGE_PER_VIEW,
                    // PAGE_PER_VIEW,
                    startDate,
                    endDate,
                );
                const orders = res.orders ? res.orders : [];
                const reserve = orders.filter(
                    (item) => item.info.order_type === 'reserve',
                );
                setReserveList(orders);
                setSuccess(true);
            } catch (e) {
                setSuccess(false);
            }
        }
        setLoading(false);
    };

    const onClickOrderItem = useCallback(
        (order_id) => {
            history.push(`${Paths.ajoonamu.order_detail}?order_id=${order_id}`);
        },
        [history],
    );

    useEffect(() => {
        // window.scrollTo(0,0);
        getOrderItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        switch (select) {
            case 0:
                setStartDate(calculateDate(endDate, 7, 'DATE'));
                break;
            case 1:
                setStartDate(calculateDate(endDate, 1, 'MONTH'));
                break;
            case 2:
                setStartDate(calculateDate(endDate, 3, 'MONTH'));
                break;
            case 3:
                setStartDate(calculateDate(endDate, 6, 'MONTH'));
                break;
            default:
                break;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [select]);

    return (
        <>
            {success && (
                <>
                    <TitleBar title={'주문내역'}>
                        <IconButton
                            style={{ width: '40px', height: '40px', right: '-10px' }}
                            onClick={handleOpen}
                        >
                            <img src={date} alt="date" />
                        </IconButton>
                    </TitleBar>
                    <TabMenu
                        tabs={tabInit}
                        index={index}
                        onChange={onChangeTabIndex}
                    />
                    {loading ? (
                        <Loading open={true} />
                    ) : (
                        <div className={styles['container']}>
                            <Swiper
                                className={styles['swiper']}
                                initialSlide={index}
                                slidesPerView={1}
                                onSlideChange={(swiper) => {
                                    onChangeSwiperIndex(swiper.activeIndex)
                                }}
                                autoHeight={true}
                                onSwiper={(swiper) => SWIPER.current=swiper}
                            >
                       
                                <SwiperSlide className={styles['swiper-slide']}>
                                    {reserveList.length !== 0 ? (
                                        <OrderItemList
                                            order_list={reserveList}
                                            onClick={onClickOrderItem}
                                        />
                                    ) : (
                                        <Message
                                            src={true}
                                            msg={
                                                '주문 내역이 존재하지 않습니다.'
                                            }
                                            isButton={true}
                                            buttonName={'주문하러 가기'}
                                            onClick={() => {
                                                history.replace(
                                                    Paths.ajoonamu.shop,
                                                );
                                            }}
                                        />
                                    )}
                                </SwiperSlide>
                                <SwiperSlide className={styles['pd-box']}>
                                    <Message
                                        src={true}
                                        msg={'주문 내역이 존재하지 않습니다.'}
                                        isButton={true}
                                        buttonName={'주문하러 가기'}
                                        onClick={() => {
                                            history.replace(
                                                Paths.ajoonamu.shop,
                                            );
                                        }}
                                    />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    )}
                    <BottomModal
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        select={select}
                        setSelect={setSelect}
                        open={open}
                        handleClose={handleClose}
                        onClick={getOrderItems}
                    />
                </>
            )}
        </>
    );
};

export default OrderListContainer;
