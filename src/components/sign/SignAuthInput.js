import React from 'react';
import styles from './SignInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


//인증 버튼을 포함한 input box

const SignAuthInput = ({ inputType, onChange, onClick, initValue ,buttonTitle ,placeholder,toggle, success}) => {
    return (
        <div className={styles['sign-input']}>
            <input className={styles['auth']} type={inputType} value={initValue}  placeholder={placeholder} onChange={onChange} ></input>
            <div className={cx('auth-btn',{toggle:toggle},{success:success})} onClick={onClick}>{buttonTitle}</div>
        </div>
    )
}
export default SignAuthInput;