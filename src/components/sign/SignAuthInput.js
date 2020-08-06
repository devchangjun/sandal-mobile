import React from 'react';
import styles from './SignModule.module.scss';


//인증 버튼을 포함한 input box

const SignAuthInput = ({ inputType, onChange, initValue ,buttonTitle ,placeholder}) => {
    return (
        <div className={styles['sign-input']}>
            <input className={styles['auth']} type={inputType} value={initValue}  placeholder={placeholder} onChange={onChange} ></input>
            <div className={styles['auth-btn']}>{buttonTitle}</div>
        </div>
    )
}
export default SignAuthInput;