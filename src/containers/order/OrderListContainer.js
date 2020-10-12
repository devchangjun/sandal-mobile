import React, { useEffect, useState, useCallback } from 'react';
import styles from './OrderList.module.scss';
import { useHistory } from 'react-router-dom';
import { Paths } from 'paths';
import TitleBar from 'components/titlebar/TitleBar';
import TabMenu from 'components/tab/TabMenu';
import OrderItemList from '../../components/order/OrderItemList';
import BottomModal from 'components/nav/BottomModal';
import SwipeableViews from 'react-swipeable-views';
import date from 'components/svg/title-bar/date.svg';
import Message from 'components/message/Message';
import Loading from '../../components/asset/Loading';
import { IconButton } from '@material-ui/core';
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
    const [error, setError] = useState(false);
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
    const user_token = useStore();
    const history = useHistory();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onChangeTabIndex = (e, value) => {
        setIndex(value);
    };
    const onChangeSwiperIndex = (index) => {
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
                setReserveList(reserve);
                setSuccess(true);
                setError(false);
            } catch (e) {
                setError(true);
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
    }, []);

    return (
        <>
            {success && (
                <>
                    <TitleBar title={'주문내역'}>
                        <IconButton
                            style={{ width: '40px', height: '40px' }}
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
                            <SwipeableViews
                                enableMouseEvents
                                index={index}
                                onChangeIndex={onChangeSwiperIndex}
                                animateHeight={true}
                            >
                                <div className={styles['pd-box']}>
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
                                </div>
                                <div className={styles['pd-box']}>
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
                                </div>
                            </SwipeableViews>
                        </div>
                    )}
                    <BottomModal
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
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
