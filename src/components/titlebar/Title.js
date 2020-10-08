import React from 'react';
import { useSelector } from 'react-redux';
import { Paths } from 'paths';
import styles from './Title.module.scss';
import { useHistory } from 'react-router';
import cn from 'classnames/bind';
import locationImage from '../svg/title-bar/location.svg';
import notificationBellImage from '../svg/title-bar/notification-bell.svg';

const cx = cn.bind(styles);

// 헤더 밑 서브 헤더 컴포넌트
// 헤더 폴더로 이동시켜야할지 말지 고민중

const Title = () => {
    const { user } = useSelector((state) => state.auth);
    const { addr1 } = useSelector((state) => state.address);
    const history = useHistory();
    /* 
        사용자가 마지막으로 선택한 배달지를 
        addr로 받아와 렌더.
        useSelect로 전역 state로 받아와도 됨
    */
    const onClickAddr = () => {
        history.push(Paths.ajoonamu.address);
    };
    const onClickNotice = () => {
        history.push(Paths.ajoonamu.notice);
    };

    return (
        <div className={styles['app-title']}>
            <div className={styles['app-title-main']}>
                <div className={styles['app-title-content']}>
                    <div className={cx('notice')}>
                        {user &&
                               <div className={cx('app-title-notification', 'unread')} onClick={onClickNotice} >
                               <img src={notificationBellImage} alt="notification-bell"/>
                           </div>
                        }
             
                    </div>
                    <div
                        className={styles['app-title-location']}
                        onClick={onClickAddr}
                    >
                        {addr1 ? addr1 : '배달지를 설정해주세요'}
                    </div>
                    <div className={styles['app-title-location-button']}>
                        <img src={locationImage} alt="location" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Title;
