import React from 'react';
import styles from './Counter.module.scss';

export default function Counter ({value,onIncrement,onDecrement}){
    return(
        <div className={styles['counter']}>
             <div className ={styles['box']} onClick={onDecrement}>-</div>
                <div className={styles['value']}>{value}</div>
             <div  className={styles['box']} onClick={onIncrement}>+</div>
        </div>
    )
}