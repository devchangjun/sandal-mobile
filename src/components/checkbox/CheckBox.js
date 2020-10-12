import React from 'react';
import styles from './CheckBox.module.scss';
import classNames from 'classnames/bind';
import Check from 'components/svg/sign/Check';

const cx = classNames.bind(styles);


export default function CheckBox({ id, text, check, onChange, onClick }) {
    return (
        <div className={cx('check', 'item')}>
            <div className={cx('sub-text')}>
                <input type="checkbox" id={id} checked={check} onChange ={onChange} />
                <label className={styles['label']} htmlFor={id}>
                    <Check on={check} />{text}
                </label>
            </div>
            {onClick &&
                <div className={styles['sub-text']} onClick={onClick}>
                    <label className={styles['more']}>보기 </label>
                </div>}
        </div>
    )
}


CheckBox.defaultProps ={
    id:'check',
    text:'text',
    check:false,
    onChange :()=>console.warn("onChange"),
    url:null,
}