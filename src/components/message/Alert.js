import React from 'react';
import styles from './Alert.module.scss';
export default function Alert({ open, handleClose, title, text, href }) {
    return (
        <>
            <div className={styles['alert-box']}>
                <div className={styles['alert-msg']}>
                    <div className={styles['title']}>타이틀</div>
                    <div className={styles['text']}>메세지</div>
                </div>
                <div className={styles['btn-box']}>
                    <div className={styles['no']}>아니오</div>
                    <div className={styles['yes']}>예</div>
                </div>
            </div>
            <div className={styles['dim']} />
        </>
    );
}
