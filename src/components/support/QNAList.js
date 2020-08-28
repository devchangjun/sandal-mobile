import React from 'react';
import classNames from 'classnames/bind';
import { Button } from '@material-ui/core';
import styles from './QNAList.module.scss';
import Message from '../message/Message';

import PropsTypes from 'prop-types';

const cn = classNames.bind(styles);

const QNAList = ({ listData, emptyMessage }) => {
    return Array.isArray(listData) && listData.length ? (
        <ul className={styles['qna-list']}>
            {listData.map((qnaData) => 
                <QNAItem qnaData={qnaData} key={qnaData.id}/>
            )}
        </ul>
    ) : <Message msg={emptyMessage} />;
};

QNAList.defalutProps = {
    listData: [],
    emptyMessage: ""
};

QNAList.propTypes = {
    listData: PropsTypes.array.isRequired,
    emptyMessage: PropsTypes.string
};

const QNAItem = ({ qnaData }) => {
    const {
        status, subject, name,
        q_datetime, // q_files, question,
        // a_datetime, answer
    } = qnaData;

    // const real = profile_img.slice(2, profile_img.length - 2);
    return (
        <li className={styles['list-element']}>
            {/* <img src={DB_IMAGE_URL + real} alt="profile_image"/> */}
            <Button className={styles['preview']}>
                <div className={styles['content']}>
                    <h2 className={styles['subject']}>{subject}</h2>
                    <p className={styles['text']}>
                        <span className={styles['name']}>{name}</span>
                        <span className={styles['date-time']}>{q_datetime}</span>
                    </p>
                </div>
                <div>
                    <div className={cn('tag', { complete: status !== 0 } )}>
                        {status === 0 ? '답변대기' : '답변완료'}                        
                    </div>
                </div>
            </Button>
        </li>
    )
}

export default QNAList;
