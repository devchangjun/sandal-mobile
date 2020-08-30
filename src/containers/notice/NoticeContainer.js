import React, { useEffect, useState, useCallback } from 'react';
import TitleBar from '../../components/titlebar/TitleBar';
import NoticeList from '../../components/notice/NoticeList';
import BottomNav from '../../components/nav/BottomNav';

import styles from './NoticeContainer.module.scss';
import { Button } from '@material-ui/core';
import { requestNoticeList } from '../../api/notice';

const MyPageContainer = () => {
    const [list, setList] = useState([]);

    const getNoticeList = useCallback(async () => {
        const res = await requestNoticeList();
        setList(res);
    }, []);

    useEffect(() => {
        getNoticeList();
    }, [getNoticeList]);
    
    return (
        <>
            <TitleBar title={'알림'}>
                <Button className={styles['read-btn']}>
                    전체읽기
                </Button>
            </TitleBar>
            <div className={styles['container']}>
                <NoticeList listData={list} />
            </div>
            <BottomNav />
        </>
    );
};

export default MyPageContainer;
