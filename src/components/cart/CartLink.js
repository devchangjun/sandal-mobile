import React from 'react';
import {Paths} from 'paths';
import styles from './Cart.module.scss';
import logo from  '../svg/cart/cartlink.png';
import {Link} from 'react-router-dom';
export default function CartLink (){

    return(
        <Link to ={Paths.ajoonamu.cart} >
        <div className={styles['cart_link']}>
            <img src={logo} alt="logo"></img>
        </div>
        </Link>
    
    )
}