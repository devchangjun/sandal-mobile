import React from 'react';
import styles from './BottomNav.module.scss';
import classNames  from 'classnames/bind';
import logo from 'logo.svg';

import { AiOutlineHome } from 'react-icons/ai';
import { RiCouponLine } from 'react-icons/ri';
import { RiFileList2Line } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';

const cx = classNames.bind(styles);

const BottomNav = () => {
    return (
        <div className={styles['bottom-nav']}>
            <div className={styles['pd-box']}>
                <NavList />
            </div>
        </div>
    )
}
const NavList = () => {
    return (
        <div className={styles['nav-list']}>
            <div className={styles['nav-item']}>
                <div className={styles['icon']}><AiOutlineHome /></div>
                <div className={styles['menu']}>홈</div>
            </div>
            <div className={styles['nav-item']}>
                <div className={styles['icon']}><RiCouponLine /></div>
                <div className={styles['menu']}>쿠폰</div>
            </div>
            <div className={cx('nav-item','order')}>
                <div className={styles['menu']}>주문</div>
            </div>
            <div className={styles['nav-item']}>
                <div className={styles['icon']}><RiFileList2Line /></div>
                <div className={styles['menu']}>주문내역</div>
            </div>
            <div className={styles['nav-item']}>
                <div className={styles['icon']}><AiOutlineUser /></div>
                <div className={styles['menu']}>마이페이지</div>
            </div>
        </div>
    )
}
const NavItem = ({ src, title }) => {
    return (
        <div className={styles['nav-item']}>
            <div className={styles['icon']}><AiOutlineHome /></div>
            <div className={styles['menu']}>{title}</div>
        </div>
    )
}

export default BottomNav;
