import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

const cx = classNames.bind(styles);

// fixed button
const Button = ({ title, onClick, toggle }) => {
    const onClickDefault = () => {
        console.warn('not data');
    };
    return (
        <ButtonBase className={cx('btn', { on: toggle })} onClick={toggle ? onClick : onClickDefault}>
            {title}
        </ButtonBase>
    );
};

export default Button;
