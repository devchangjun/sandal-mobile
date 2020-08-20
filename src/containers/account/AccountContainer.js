import React,{useEffect} from 'react';
import {Paths} from 'paths';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import TitleBar from 'components/titlebar/TitleBar';
import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import Profile from 'components/svg/sign/profile.png';
import BottomNav from 'components/nav/BottomNav';
const cx = classNames.bind(styles);



const AccountContainer = () => {
    const { user } = useSelector(state => state.auth);
    const history= useHistory();

    useEffect(()=>{
        if(user===null){
            history.push(Paths.index);
        }
    },[user,history])

    const render =()=>{
        return(
            <>
            <TitleBar title={"내정보"} />
            <div className={styles['container']}>
                <div className={styles['user-info']}>
                    <div className={cx('profile')}>
                        <img className={styles['profile-img']}src={Profile} alt={"프로필 이미지"}></img>
                        <div className={styles['change']}>변경</div>
                    </div>
                </div>
                <div className={styles['tab']}>
                    <Item text={"이름"}  value = {user && user.name}/>
                    <Item text={"핸드폰번호"} value={user && user.hp}/>
                    <Item text={"이메일"}  value={user && user.email}/>
                    <Item text={"비밀번호 변경"} />
                </div>


                <div className={styles['logout']}>
                    <div className={styles['logout-btn']}>
                        <div className={styles['pd-btn']}>
                            로그아웃
                                </div>
                    </div>
                </div>
            </div>

            <BottomNav />
        </>
        )
    }
    return (
        <>
        {user===null ?  history.push(Paths.index) : render()}
        </>
    )
}

function Item({ text,value }) {
    return (
        <div className={styles['pd-box']}>
            <div className={styles['item']}>
                <div className={styles['text']}>
                {text}
                </div>
                <div className={styles['value']}>
                {value}
                </div>
            </div>
        </div>
    )
}

export default AccountContainer;