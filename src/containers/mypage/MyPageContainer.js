import React, { useEffect } from 'react';
import { Paths } from 'paths';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TitleBar from 'components/titlebar/TitleBar';
import styles from './MyPage.module.scss';
import Profile from 'components/svg/sign/profile.png';
import BottomNav from 'components/tab/BottomNav';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);



const MyPageContainer = () => {


    const { user } = useSelector(state => state.auth);
    const history = useHistory();
    const goToLogin = () => {
        history.push(Paths.ajoonamu.signin);
    }
    const goToAccount = () => {
        history.push(Paths.ajoonamu.account);
    }
    useEffect(() => {
        console.log("재렌더");
        console.log(user);
    }, [user]);
    return (
        <>
            <TitleBar title={"마이페이지"} />
            <div className={styles['user-info']}>
                <div className={cx('profile','pd-left')}>
                    <img src={Profile}></img>
                </div>
                <div className={cx('info','pd-box')}>
                    <div className={styles['auth']} onClick={user ? goToAccount : goToLogin}>
                        <div className>

                        </div>
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
                <div className={cx('link','pd-right')}>
                    {">"}
                </div>
                </div>
            <div className={styles['tab']}>
                <div className={styles['pd-box']}>
                    <div className={styles['item']}>
                        공지사항
                   </div>
                </div>
                <div className={styles['pd-box']}>
                    <div className={styles['item']}>
                        이벤트
                     </div>
                </div>
                <div className={styles['pd-box']}>
                    <div className={styles['item']}>
                        자주 묻는 질문
                     </div>
                </div>
                <div className={styles['pd-box']}>
                    <div className={styles['item']}>
                        1:1 문의
                     </div>
                </div>
                <div className={styles['pd-box']}>
                    <div className={styles['item']}>
                        알림설정
                   </div>
                </div>
                <div className={styles['pd-box']}>
                    <div className={styles['item']}>
                        버전정보
                    </div>
                </div>
            </div>
            <BottomNav />
        </>
    )
}

export default MyPageContainer;