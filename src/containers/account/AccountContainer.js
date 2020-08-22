import React,{useEffect} from 'react';
import {Paths} from 'paths';
import {useHistory} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import TitleBar from 'components/titlebar/TitleBar';
import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import Profile from 'components/svg/sign/profile.png';
import BottomNav from 'components/nav/BottomNav';
import { localLogout } from '../../api/auth/auth';
import { logout } from '../../store/auth/auth';
const cx = classNames.bind(styles);



const AccountContainer = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const history= useHistory();

    useEffect(()=>{
        if(user===null){
            history.push(Paths.index);
        }
    },[user,history])

    const onClickLogout = async () => {
        const token = sessionStorage.getItem("access_token");
        const res = await localLogout(token);
        sessionStorage.removeItem("access_token");
        console.log(res);
        if (res.message === "로그아웃에 성공하셨습니다.") {
            dispatch(logout());
            history.push(Paths.index);
        }
    }


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


                <div className={styles['logout']} onClick={onClickLogout}>
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