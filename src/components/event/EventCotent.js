import React from 'react';
import styles from './EventContent.module.scss';

export default ({ created_at, ended_at, content, precautions }) => {

    return (
        <div className={styles['content']}>
            <div className={styles['info']}>
                <p className={styles['term']}>이벤트 기간: {created_at && created_at.toDateString()} ~ {ended_at && ended_at.toDateString()}</p>
                <div className={styles['explain']}>{content}</div>
            </div>
            <div className={styles['label']}>꼭 확인해주세요!</div>
            <div className={styles['precautions']}>{precautions}</div>
        </div>
    );
};