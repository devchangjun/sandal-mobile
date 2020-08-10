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
            <div className={styles['container']}>

            </div>
        </>
    )
}

export default MyPageContainer;