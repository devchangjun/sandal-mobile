import React, { useState,useEffect, useRef, useCallback } from 'react';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import styles from './Recovery.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import TitleBar from 'components/titlebar/TitleBar';
import Button from 'components/button/Button';
import classNames from 'classnames/bind';
import { findId } from '../../api/auth/auth';
import AuthTimer from 'components/sign/AuthTimer';
import Check from 'components/svg/sign/Check';
import {useModal} from '../../hooks/useModal';
const cx = classNames.bind(styles);

const logo =
    'http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png';

const RecoveryIdContainer = () => {
    const history = useHistory();
    const openModal = useModal();
    const random = useRef(496696);
    const [userName, setUserName] = useState('김보건');
    const [userPhone, setUserPhone] = useState('01072128994');
    const [userAuth, setUserAuth] = useState('49669');
    const [toggle, setToggle] = useState(false);
    const [success, setSuccess] = useState(false);
    const [start_timer ,setStartTimer] = useState(false);

    const onChangeName = (e) => setUserName(e.target.value);
    const onChangePhone = (e) => setUserPhone(e.target.value);
    const onChangeAuth = (e) => {
        setUserAuth(e.target.value)
    };

    const onClickCompareAuth = useCallback(() => {
        const auth_num = parseInt(userAuth);
        setSuccess(auth_num === random.current);
    },[userAuth]);

    useEffect(()=>{
        onClickCompareAuth();
    },[onClickCompareAuth])


    //인증번호 발송 버튼
    const onClickSendAuth = () => {
        console.log(random.current);
        setToggle(true);
        setStartTimer(true);
    };
    const onClickReSendAuth =()=>{
        setStartTimer(false);
        setTimeout(()=>setStartTimer(true),0);
    }
 
    const onClickFindEmail = async () => {
        const res = await findId(userName, userPhone);
        console.log(res);
        if (res.data.msg === '성공') {
            let mail = res.data.query.user.email;
            console.log(mail);
            history.push(`${Paths.ajoonamu.find_email}?email=${mail}`);
        } else if (
            res.data.msg === '해당 이름과 전화번호에 일치하는 계정이 없습니다.'
        ) {
            openModal('해당 이름과 전화번호에 일치하는 계정이 없습니다.');
        }
    };

    return (
        <>
        
            <div className={styles['container']}>
                <div className={cx('content', 'pd-box')}>
                    <SignNormalInput
                        inputType={'text'}
                        initValue={userName}
                        onChange={onChangeName}
                        placeholder={'이름'}
                    />
                    <SignAuthInput
                        inputType={'text'}
                        onClick={toggle ? onClickReSendAuth : onClickSendAuth}
                        toggle={toggle}
                        initValue={userPhone}
                        buttonTitle={
                            toggle ? '인증번호 재발송' : '인증번호 발송'
                        }
                        onChange={onChangePhone}
                        placeholder={'핸드폰 번호'}
                    />
                    <div className={cx('auth-btn', { not_view: !toggle })}>
                        <SignNormalInput
                            inputType={'text'}
                            initValue={userAuth}
                            onChange={onChangeAuth}
                        />
                        <div className={styles['timer']}>
                            {success ?
                        <Check on={true}/> : 
                        <AuthTimer start={start_timer}></AuthTimer>
                            }
                        </div>
                    </div>
                    <Button
                        title={'확인'}
                        toggle={success}
                        onClick={onClickFindEmail}
                    ></Button>
                </div>
            </div>
        </>
    );
};

export default RecoveryIdContainer;
