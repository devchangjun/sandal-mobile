import React from 'react';
import {Paths} from 'paths';
import styles from './Cart.module.scss';
import logo from  '../svg/cart/cartlink.png';
import {Link} from 'react-router-dom';
import { IconButton } from '@material-ui/core';
export default function CartLink (){

    const test =()=>{
        window.scrollTo(0,979);
    }
    return(
        <Link to ={Paths.ajoonamu.cart} >
        <div className={styles['cart_link']}>
            <img src={logo} alt="logo"></img>
        </div>
        </Link>
        // <div onClick={test} >
        // <div className={styles['cart_link']}>
        //     <img src={logo} alt="logo"></img>
        // </div>
        // </div>
    )
}