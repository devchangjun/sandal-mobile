import React from 'react';
import classnames from "classnames/bind";
import { Button } from '@material-ui/core';

import Message from '../message/Message';

import styles from './NoticeList.module.scss';

const cn = classnames.bind(styles);

const NoticeItem = ({ notice }) => {
    const { message, send_at, checked } = notice;
    return (
        <li className={cn('list-element', { checked })}>
            <Button className={styles['preview']}>
                <div className={styles['text']}>
                    <p className={styles['message']}>{message}</p>
                    <p className={styles['at']}>{send_at.toString()}</p>
                </div>
            </Button>
        </li>
    );
};

export default ({ listData }) =>
Array.isArray(listData) && listData.length ? (
    <ul className={styles['notice-list']}>
        {listData.map(notice =>
            <NoticeItem key={notice.id} notice={notice} />
        )}
    </ul>
) : <Message msg="알림이 존재하지 않습니다." />;