import React from 'react';
import TitleBar from 'components/titlebar/TitleBar';
import styles from './MyPage.module.scss';
import Profile from 'components/svg/sign/profile.png';

const MyPageContainer = () => {
    return (
        <>
            <TitleBar title={"마이페이지"} />
            <div className={styles['user-info']}>
                <div className={styles['profile']}>
                    <img src={Profile}></img>
                </div>
                <div className={styles['info']}>
                    <div className={styles['name']}>
                        로그인을 해주세요
                    </div>
                    <div className={styles['point']}>

                    </div>
                </div>
                <div className={styles['link']}>
                    {">"}
                </div>

            </div>
            <div className={styles['tab']}>
                <div className={styles['item']}>
                    공지사항
                </div>
                <div className={styles['item']}>
                    이벤트
                </div>
                <div className={styles['item']}>
                    자주 묻는 질문
                </div>
                <div className={styles['item']}>
                    1:1 문의
                </div>
                <div className={styles['item']}>
                    알림설정
                </div>
                <div className={styles['item']}>
                    버전정보
                </div>
            </div>
        </>
    )
}

export default MyPageContainer;