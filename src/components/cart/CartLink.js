import React from 'react';
import { Paths } from 'paths';
import styles from './Cart.module.scss';
import logo from '../svg/cart/cartlink.png';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
export default function CartLink() {
    return (
        <Link to={Paths.ajoonamu.cart}>
            <IconButton className={styles['cart_link']}>
                <img src={logo} alt="logo"></img>
            </IconButton>
        </Link>
    );
}
