import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {Paths} from 'paths';
import {useHistory} from 'react-router-dom';
import styles from './Header.module.scss';
import logo from 'logo.svg';


const Header =()=>{
    const {user} = useSelector(state=>state.auth);
    const history = useHistory();
    
    useEffect(()=>{

    },[user])

    const goToHome =()=> history.push(Paths.index);

    return(
        <div className={styles['header']}>
                <div className={styles['header-logo']} onClick={goToHome}>
                    <img className ={styles['header-logoimg']} src={logo} alt={"로고"}></img>
                </div>
        </div>
    )
}

export default Header;