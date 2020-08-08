import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

//fixed button

const Button =({title, onClick,toggle})=>{
    return(
        <div className={cx('btn',{on:toggle})} onClick ={onClick }>{title}</div>
    )
}

export default Button; 