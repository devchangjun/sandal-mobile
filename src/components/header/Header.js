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
    const goToReserve =() =>history.push(`${Paths.ajoonamu.reserve}/custom`);

    return(
        <div className={styles['header']}>
            <div className ={styles['header-nav']}>
                <div className={styles['header-logo']} onClick={goToHome}>
                    <img className ={styles['header-logoimg']} src={logo}></img>
                </div>
                <div className={styles['header-menu']}>
                    <ui>
                        <li onClick={goToHome}>브랜드홈</li>
                        <li onClick={goToReserve}>예약주문</li>
                        <li>택배배송</li>
                        <li>이벤트</li>
                        <li>고객센터</li>
                    </ui>
                </div>
                <div className={styles['header-user']}>
                        {user ? 
                        <TabLink  exact to={Paths.ajoonamu.account}>
                        <>{user.name}님 반갑습니다</> 
                        </TabLink>
                        : 
                        <TabLink  exact to={Paths.ajoonamu.signin}>
                        <>로그인</> 
                        </TabLink>
                        }
                        
                </div>
            </div>
        </div>
    )
}

export default Header;