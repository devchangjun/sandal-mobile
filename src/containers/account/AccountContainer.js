import React, { useEffect, useState, useCallback } from 'react';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TitleBar from 'components/titlebar/TitleBar';
import classNames from 'classnames/bind';
import BottomNav from 'components/nav/BottomNav';
import { localLogout, requestAgreeChange } from '../../api/auth/auth';
import { logout } from '../../store/auth/auth';
import {update_user_info} from '../../store/auth/auth';
import styles from './Account.module.scss';
import Profile from 'components/svg/sign/profile.png';
import { stringToTel } from '../../lib/formatter';
import {useStore} from '../../hooks/useStore';
import Back from '../../components/svg/header/Back';
import {useInit} from '../../hooks/useStore';
import {noAuthGetNearStore} from '../../api/noAuth/store';

const cn = classNames.bind(styles);

const AccountContainer = () => {    
    const initStore = useInit();
    const { user } = useSelector((state) => state.auth);
    const user_token = sessionStorage.getItem("access_token");
    const dispatch = useDispatch();
    const history = useHistory();
    const onClickUpdateName =()=> history.push(Paths.ajoonamu.update_name);
    const onClickUpdatePhone =()=>history.push(Paths.ajoonamu.update_phone);
    const onClickUpdatePassword =()=> history.push(Paths.ajoonamu.update_password);
    
    const onClickLogout = useCallback(async () => {
        try{
            const res = await localLogout(user_token);
            sessionStorage.removeItem('access_token');
            if (res.message === '로그아웃에 성공하셨습니다.') {
                dispatch(logout());
                initStore();

                const noAuthAddrs = JSON.parse(localStorage.getItem('noAuthAddrs'));
                if(noAuthAddrs){
                    const index = noAuthAddrs.findIndex((item) =>item.active===1);
                    if(index!==-1){
                        const {addr1, addr2,lat,lng,post_num} = noAuthAddrs[index];
                        const near_store = await noAuthGetNearStore(lat,lng,addr1);
                        initStore(addr1,addr2,lat,lng,post_num,near_store.data.query );
                    }
                }
                history.replace(Paths.index);


            }
        }
        catch(e){
            console.error(e);
        }
    },[dispatch,history,user_token]);

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

    const render = () => (
        <>
            <div className={styles['container']}>
                <div className={styles['user-info']}>
                    <div className={cn('profile')}>
                        <img
                            className={styles['profile-img']}
                            src={Profile}
                            alt={'프로필 이미지'}
                        />
                        <div className={styles['change']}>변경</div>
                    </div>
                </div>
                <div className={styles['tab']}>
                    <Item text={'이름'} value={user && user.name} onClick={onClickUpdateName}/>
                    <Item text={'핸드폰번호'} value={user && user.hp && stringToTel(user.hp)}  onClick={onClickUpdatePhone}/>
                    <Item text={'이메일'} value={user && user.email} />
                    <Item text={'비밀번호 변경'}  onClick={onClickUpdatePassword}/>
                </div>

                <MarketingAgree
                    agreeMail={user.agree_mail}
                    agreeSMS={user.agree_sms}
                />

                <div className={styles['logout']} onClick={onClickLogout}>
                    <Button className={styles['logout-btn']}>
                        <div className={styles['pd-btn']}>로그아웃</div>
                    </Button>
                </div>
            </div>
        </>
    );
    return <>{user === null ? history.replace(Paths.index) : render()}</>;
};

const MarketingAgree = ({ agreeMail, agreeSMS }) => {
    const [mail, setMail] = useState(agreeMail);
    const [sms, setSMS] = useState(agreeSMS);
    const dispatch = useDispatch();
    const user_token = useStore();

    const sendPostAgreeChange = useCallback(async (type, value) => {
        /*
            수신 동의 변경하기.
            type과 value로 값 설정.
        */
        const res = await requestAgreeChange(user_token, type, value);
        console.log(res);
    }, [user_token]);

    const changeMail = useCallback(() => {
        sendPostAgreeChange('mail', !mail);
        setMail(!mail);
        dispatch(update_user_info({name :'agree_mail' ,value: !mail}));
    }, [mail, sendPostAgreeChange,dispatch]);
    const changeSMS = useCallback(() => {
        sendPostAgreeChange('sms', !sms);
        setSMS(!sms);
        dispatch(update_user_info({name :'agree_sms' ,value: !sms}));
    }, [sms, sendPostAgreeChange,dispatch]);

    return (
        <div className={styles['marketing']}>
            <div className={styles['head']}>
                <h3 className={styles['title']}>마케팅 정보 수신 동의</h3>
                <p className={styles['sub-title']}>
                    이벤트 및 할인 혜택에 대한 정보를 받으실 수 있습니다.
                </p>
            </div>
            <div className={styles['selector-box']}>
                <AgreeToggle
                    name="메일 수신 동의"
                    checked={mail}
                    onToggle={changeMail}
                />
                <AgreeToggle
                    name="SMS 수신 동의"
                    checked={sms}
                    onToggle={changeSMS}
                />
            </div>
        </div>
    );
};

const AgreeToggle = ({ name, checked, onToggle }) => {
    return (
        <div className={styles['selector']}>
            <div className={styles['name']}>{name}</div>
            <div className={cn('toggle', { checked })} onClick={onToggle}>
                <div className={styles['box']}>
                    <div className={styles['switch']}></div>
                </div>
            </div>
        </div>
    );
};

function Item({ text, value,onClick }) {
    return (
        <Button className={styles['pd-box']} onClick={onClick}>
            <div className={styles['item']}>
                <div className={styles['text']}>{text}</div>
                {value &&
                <div className={styles['value']}>
                    {value}<Back rotate="180deg" width={18} height={18} />
                </div>}
            </div>
        </Button>
    );
}

export default AccountContainer;
