import React from 'react';
import TitleBar from 'components/titlebar/TitleBar';
import styles from './NoticeContainer.module.scss';
import BottomNav from 'components/nav/BottomNav';

const MyPageContainer = () => {

    return (
        <>
            <TitleBar title={'알림'} />
            <div className={styles['container']}>
            </div>
            <BottomNav />
        </>
    );
};

export default MyPageContainer;
