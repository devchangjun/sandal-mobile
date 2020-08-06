import React from 'react';
import styles from './Button.module.scss';

//fixed button

const Button =({title, onClick})=>{
    return(
        <div className={styles['btn']} onClick ={onClick}>{title}</div>
    )
}

export default Button; 