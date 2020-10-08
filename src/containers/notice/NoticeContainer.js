import React, { useEffect, useState, useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classnames from 'classnames/bind';
import { Button } from '@material-ui/core';
import TitleBar from '../../components/titlebar/TitleBar';
import NoticeList from '../../components/notice/NoticeList';
import BottomNav from '../../components/nav/BottomNav';

import { reqNoticeReadAll, reqNoticeList, reqNoticeRead, reqNoticeDelete } from '../../api/notice';
import Loading from '../../components/asset/Loading';
import styles from './NoticeContainer.module.scss';
import { useStore } from '../../hooks/useStore';

/*  store   */
import {get_notice, remove_notice , read_notice, read_all_notice} from '../../store/notice/notice';

const cn = classnames.bind(styles);

const NoticeContainer = () => {

    const user_token = useStore();

    const dispatch = useDispatch();
    const {notice} = useSelector((state)=>state.notice);
    const [list, setList] = useState([]);
    const [availableTotal, setAvailableTotal] = useState(false);
    const [loading, setLoading] = useState(false);


    //하나 체크
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
        if (user_token) {
            try {
                await reqNoticeRead(user_token, not_id);

            }
            catch (e) {
                console.error(e);
            }
        }
    }, [user_token]);

    //전체읽기    
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
            list.map((item) => {return { ...item, not_read_datetime: not_read_datetime };}),
        );
        if (user_token) {
            try {
                await reqNoticeReadAll(user_token);

            }
            catch (e) {
                console.error(e);
            }
        }
    }, []);

    //전체 체크됐는지.
    const confirmChecked = useCallback(() => {
        const result = list.findIndex((item) => !item.not_read_datetime);
        setAvailableTotal(result !== -1);
    }, [list]);



    //삭제
    const onRemove = useCallback(async (not_id) => {
        setLoading(true);
        if (user_token) {
            try {
                const res = await reqNoticeDelete(user_token, not_id);
                console.log(res);
                setList((list) => list.filter(item => item.not_id !== not_id));
                dispatch(remove_notice(not_id));

            }
            catch (e) {
                console.error(e);
            }
        }
        setLoading(false);
    }, [user_token]);

    //들고오기
    const getNoticeList = useCallback(async () => {
        setLoading(true);
        if (user_token) {
            try {
                const res = await reqNoticeList(user_token);
                console.log(res.notification);
                setList(res.notification);
                dispatch(get_notice(res.notification));
            }
            catch (e) {
                console.error(e);

            }
        }
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
                <NoticeList onChecked={onChecked} listData={list} onRemove={onRemove} />
            </div>
        </>
    );
};

export default NoticeContainer;
