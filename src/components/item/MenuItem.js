import React from 'react';
import styles from './MenuItem.module.scss';
import IMG from '../svg/menu/menuitem.png';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MenuItem = (props) => {
    const {menu_name,menu_price} = props;
    return (
        <div className={styles['menu-item']}>
            <div className={styles['menu-img']}>
                <img src={IMG} className={styles['img']} alt="메뉴" />
            </div>
            <div className={cx('menu-info','pd-box')}>
                <div className={styles['menu-name']}>
                   {menu_name}
                    </div>
                <div className={styles['menu-price']}>
                {menu_price}
                    </div>
            </div>
        </div>
    )
}

export default MenuItem;