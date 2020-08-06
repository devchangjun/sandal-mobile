import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {Paths} from 'paths';
import {useHistory} from 'react-router-dom';
import styles from './Header.module.scss';
import logo from 'logo.svg';
import styled from 'styled-components';

const TabLink = styled(NavLink)`
    text-decoration:none;
    color:black;
`;

const Header =()=>{
    const {user} = useSelector(state=>state.auth);
    const history = useHistory();
    useEffect(()=>{
        console.log(user);
    },[user])

    const goToHome =()=> history.push(Paths.index);

    return(
        <div className={styles['header']}>
                <div className={styles['header-logo']} onClick={goToHome}>
                    <img className ={styles['header-logoimg']} src={logo}></img>
                </div>
        </div>
    )
}

export default Header;