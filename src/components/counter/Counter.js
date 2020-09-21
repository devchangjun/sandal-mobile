import React from 'react';
import { ButtonBase } from '@material-ui/core';
import styles from './Counter.module.scss';

import Plus from '../svg/counter/cross.svg';
import Minus from '../svg/counter/line.svg';

export default function Counter({ value, onIncrement, onDecrement }) {
    return (
        <div className={styles['counter']}>
            <ButtonBase
                style={{ left: 0 }}
                className={styles['box']}
                onClick={onDecrement}
            >
                <img src={Minus} alt="minus" />
            </ButtonBase>
            <div className={styles['value']}>{value}</div>
            <ButtonBase
                style={{ right: 0 }}
                className={styles['box']}
                onClick={onIncrement}
            >
                <img src={Plus} alt="plus" />
            </ButtonBase>
        </div>
    );
}
