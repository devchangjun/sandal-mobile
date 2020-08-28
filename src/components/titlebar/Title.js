import React from 'react';
import { Paths } from 'paths';
import './Title.scss';
import { useHistory } from 'react-router';


import locationImage from '../svg/title-bar/location.svg';
import notificationBellImage from '../svg/title-bar/notification-bell.svg';


// 헤더 밑 서브 헤더 컴포넌트
// 헤더 폴더로 이동시켜야할지 말지 고민중

const Title = ({ addr }) => {
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
    }

    return (
        <div className="app-title">
            <div className="app-title-main">
                <div className="app-title-content">
                    <div className="app-title-notification unread" onClick={onClickNotice}>
                        <img src={notificationBellImage} alt="notification-bell" />
                    </div>
                    <div className="app-title-location" onClick={onClickAddr}>
                        {addr ? addr : '배달지를 설정해주세요'}
                    </div>
                    <div className="app-title-location-button">
                        <img src={locationImage} alt="location" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Title;
