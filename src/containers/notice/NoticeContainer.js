import React, { useEffect, useState, useCallback } from 'react';
import classnames from 'classnames/bind';
import { Button } from '@material-ui/core';
import TitleBar from '../../components/titlebar/TitleBar';
import NoticeList from '../../components/notice/NoticeList';
import BottomNav from '../../components/nav/BottomNav';

import { reqNoticeReadAll,reqNoticeList,reqNoticeRead,reqNoticeDelete } from '../../api/notice';
import Loading from '../../components/asset/Loading';
import styles from './NoticeContainer.module.scss';
import {useStore} from '../../hooks/useStore';
const cn = classnames.bind(styles);

const MyPageContainer = () => {

    const user_token = useStore();
    const [list, setList] = useState([]);
    const [availableTotal, setAvailableTotal] = useState(false);
    const [loading, setLoading] = useState(false);

    const onChecked = useCallback(async (not_id) => {
        let today = new Date();

        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1; // 월
        let date = today.getDate(); // 날짜
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();
        const not_read_datetime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

        setList((list) =>
            list.map((item) => {
                return not_id === item.not_id ? { ...item, not_read_datetime: not_read_datetime } : item;
            }),
        );
       await reqNoticeRead(user_token,not_id);
    }, [user_token]);

    const onAllChecked = useCallback(async () => {
        let today = new Date();

        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1; // 월
        let date = today.getDate(); // 날짜
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();

        const not_read_datetime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
        console.log(not_read_datetime);
        setList((list) =>
            list.map((item) => {
                return { ...item, not_read_datetime: not_read_datetime };
            }),
        ); 
         await reqNoticeReadAll(user_token);
    }, []);
    const confirmChecked = useCallback(() => {
        const result = list.findIndex((item) => !item.not_read_datetime);
        setAvailableTotal(result !== -1);
    }, [list]);


    const onRemove = useCallback(async (not_id) =>{
        setLoading(true);
        const res = await reqNoticeDelete(user_token,not_id);
        console.log(res);
        setList((list) => list.filter(item => item.not_id !==not_id));
        setLoading(false);
    },[user_token]);
    const getNoticeList = useCallback(async () => {
        setLoading(true);
        const res = await reqNoticeList(user_token);
        console.log(res.notification);
        setList(res.notification);
        setLoading(false);
    }, []);

    useEffect(() => {
        getNoticeList();
    }, [getNoticeList]);
    useEffect(() => {
        confirmChecked();
    }, [confirmChecked]);


    return (
        <>
            <Loading open={loading} />
            <TitleBar title={'알림'}>
                <div className={styles['total']}>
                    <Button
                        className={cn('read-btn', {
                            available: availableTotal,
                        })}
                        onClick={onAllChecked}
                    >
                        전체읽기
                    </Button>
                </div>
            </TitleBar>
            <div className={styles['container']}>
                <NoticeList onChecked={onChecked} listData={list} onRemove={onRemove}/>
            </div>
            <BottomNav />
        </>
    );
};

export default MyPageContainer;
