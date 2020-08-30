import React, { useEffect, useState, useCallback } from 'react';
import classnames from 'classnames/bind';
import { Button } from '@material-ui/core';
import TitleBar from '../../components/titlebar/TitleBar';
import NoticeList from '../../components/notice/NoticeList';
import BottomNav from '../../components/nav/BottomNav';

import { requestNoticeList, requestNoticeChecked } from '../../api/notice';

import styles from './NoticeContainer.module.scss';

const cn = classnames.bind(styles);

const MyPageContainer = () => {
    const [list, setList] = useState([]);
    const [availableTotal, setAvailableTotal] = useState(false);

    const onChecked = useCallback(async (id) => {
        setList(list => list.map(item => {
            return id === item.id ? { ...item, checked: true } : item;
        }));
        await requestNoticeChecked(id);
    }, []);
    const onAllChecked = useCallback(async () => {
        setList(list => list.map(item => {
            return { ...item, checked: true };
        }));
    }, []);
    const confirmChecked = useCallback(() => {
        const result = list.findIndex(item => !item.checked);
        setAvailableTotal(result !== -1);
    }, [list]);

    const getNoticeList = useCallback(async () => {
        const res = await requestNoticeList();
        setList(res);
    }, []);

    useEffect(() => {
        getNoticeList();
    }, [getNoticeList]);
    useEffect(() => {
        confirmChecked();
    }, [confirmChecked])
    
    return (
        <>
            <TitleBar title={'알림'}>
                <div className={styles['total']}>
                    <Button className={cn('read-btn', { available: availableTotal })} onClick={onAllChecked}>전체읽기</Button>
                </div>
            </TitleBar>
            <div className={styles['container']}>
                <NoticeList onChecked={onChecked} listData={list} />
            </div>
            <BottomNav />
        </>
    );
};

export default MyPageContainer;
