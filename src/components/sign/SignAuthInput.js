import React from 'react';
import styles from './SignInput.module.scss';
import classNames from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
const cx = classNames.bind(styles);

//인증 버튼을 포함한 input box

const SignAuthInput = ({
    inputType,
    onChange,
    onClick,
    initValue,
    buttonTitle,
    placeholder,
    toggle,
    success,
}) => {
    return (
        <div className={styles['sign-input']}>
            <form>
                <input
                    className={styles['auth']}
                    type={inputType}
                    value={initValue}
                    placeholder={placeholder}
                    onChange={onChange}
                    autoComplete="on"
                ></input>
            </form>
            <ButtonBase
                className={cx('auth-btn',
                    { toggle: toggle },
                    { success: success },
                )}
                onClick={onClick}
            >
                {buttonTitle}
            </ButtonBase>
        </div>
    );
};


export default SignAuthInput;
