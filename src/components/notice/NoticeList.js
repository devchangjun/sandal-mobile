import React from 'react';
import classnames from "classnames/bind";
import { Button } from '@material-ui/core';

import Message from '../message/Message';

import styles from './NoticeList.module.scss';
import { dateToRelative } from '../../lib/formatter';

const cn = classnames.bind(styles);

const NoticeItem = ({ notice, onChecked }) => {
    const { message, send_at, checked } = notice;
    return (
        <li className={cn('list-element', { checked })} onClick={onChecked}>
            <Button className={styles['preview']}>
                <div className={styles['text']}>
                    <p className={styles['message']}>{message}</p>
                    <p className={styles['at']}>{dateToRelative(send_at)}</p>
                </div>
            </Button>
        </li>
    );
};

export default ({ listData, onChecked }) =>
Array.isArray(listData) && listData.length ? (
    <ul className={styles['notice-list']}>
        {listData.map(notice =>
            <NoticeItem key={notice.id} notice={notice} onChecked={() => onChecked(notice.id)} />
        )}
    </ul>
) : <Message msg="알림이 존재하지 않습니다." />;