import React, { useEffect } from 'react';
import { Paths } from 'paths';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TitleBar from 'components/titlebar/TitleBar';
import styles from './MyPage.module.scss';
import Profile from 'components/svg/sign/profile.png';
import BottomNav from 'components/nav/BottomNav';
import classNames from 'classnames/bind';
import { localLogout } from '../../api/auth/auth';
import { logout } from '../../store/auth/auth';


const cx = classNames.bind(styles);



const MyPageContainer = () => {

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const onClickLogin = () => {
        history.push(Paths.ajoonamu.signin);
    }
    const onClickAccount = () => {
        history.push(Paths.ajoonamu.account);
    }
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
    useEffect(() => {
        console.log("리렌더");
        console.log(user);
    }, [user]);
    return (
        <>
            <TitleBar title={"마이페이지"} />
            <div className={styles['container']}>
                <div className={styles['user-info']}>
                    <div className={cx('profile', 'pd-left')}>
                        <img src={Profile} alt={"이미지"}></img>
                    </div>
                    <div className={cx('info', 'pd-box')}>
                        <div className={styles['auth']} onClick={user ? onClickAccount : onClickLogin}>
                            {user ?
                                <div className={styles['name']}>
                                    <span> {user.name}</span>님 반갑습니다.
                            </div>
                                : "로그인을 해주세요"}

                        </div>
                        {user &&
                            <div className={styles['point']}>
                                보유 포인트 {user.point}
                            </div>
                        }

                    </div>
                    <div className={cx('link', 'pd-right')}>
                        {">"}
                    </div>
                </div>
                <div className={styles['tab']}>
                    <Item text={"공지사항"} />
                    <Item text={"이벤트"} />
                    <Item text={"자주 묻는 질문"} />
                    <Item text={"1:1 문의"} />
                    <Item text={"알림설정"} />
                    <Item text={"버전정보"} />
                    {user && <Item text={"이용약관"} />}
                </div>
                {user &&
                    <div className={styles['logout']} onClick={onClickLogout}>
                        <div className={styles['logout-btn']}>
                            <div className={styles['pd-btn']}>
                                로그아웃
                                </div>
                        </div>
                    </div>
                }


            </div>

            <BottomNav />
        </>
    )
}

function Item({ text }) {
    return (
        <div className={styles['pd-box']}>
            <div className={styles['item']}>
                {text}
            </div>
        </div>
    )
}

export default MyPageContainer;