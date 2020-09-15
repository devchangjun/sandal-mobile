import React from 'react';
import styles from './MenuItem.module.scss';
import IMG from '../svg/menu/menuitem.png';
import classNames from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
import { numberFormat } from "../../lib/formatter";

const cx = classNames.bind(styles);

const MenuItem = (props) => {

    return (

        <div className={styles['menu-item']} onClick={props.onClick}>
            <ButtonBase className={styles['menu-img']}>
                <img src={IMG} className={styles['img']} alt="메뉴" />
            </ButtonBase>
            <div className={cx('menu-info','pd-box')}>
                <div className={styles['menu-name']}>
                   {props.item_name}
                    </div>
                <div className={styles['menu-price']}>
               {numberFormat(props.item_price)}원~
                </div>
            </div>
        </div>
    )
}

export default MenuItem;