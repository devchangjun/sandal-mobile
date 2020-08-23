import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

//fixed button

const Button =({title, onClick,toggle})=>{

    const onClickDefault =()=>{
        console.warn("not data");
    }
    return (
        <div className={cx('btn',{on:toggle})} onClick ={toggle ? onClick : onClickDefault }>{title}</div>
    )
}

export default Button; 