import React, { useState,useEffect, useCallback } from 'react';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import styles from './Recovery.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import Button from 'components/button/Button';
import classNames from 'classnames/bind';
import { findId, requestPostMobileAuth, requestPostMobileAuthCheck } from '../../api/auth/auth';
import AuthTimer from 'components/sign/AuthTimer';
import Check from 'components/svg/sign/Check';
import { useModal } from '../../hooks/useModal';
import { isCellPhoneForm } from '../../lib/formatChecker';
const cx = classNames.bind(styles);

const AUTH_NUMBER_LENGTH = 6;

const RecoveryIdContainer = () => {
    const history = useHistory();
    const openModal = useModal();
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAuth, setUserAuth] = useState('');
    const [toggle, setToggle] = useState(false);
    const [success, setSuccess] = useState(false);
    const [start_timer ,setStartTimer] = useState(false);

    const onChangeName = (e) => setUserName(e.target.value);
    const onChangePhone = (e) => setUserPhone(e.target.value);
    const onChangeAuth = (e) => {
        setUserAuth(e.target.value)
    };

    const onClickCompareAuth = useCallback(async () => {
        if (userAuth.length === AUTH_NUMBER_LENGTH) {
            try {
                const res = await requestPostMobileAuthCheck(userPhone, userAuth);
                if (res.data.msg === '성공!') {
                    openModal('성공적으로 인증되었습니다!', '회원가입 버튼을 누르세요!');
                    setSuccess(true);
                    setStartTimer(false);
                } else {
                    openModal('인증번호가 틀렸습니다!', '인증번호를 다시 한 번 확인해 주세요!');
                }
            } catch (e) {
                openModal('잘못된 접근입니다.', '잠시 후 재시도 해주세요.');
            }
            setUserAuth('');
        }
    }, [userAuth, userPhone, openModal]);

    useEffect(()=>{
        onClickCompareAuth();
    },[onClickCompareAuth])


    //인증번호 발송 버튼
    const onClickSendAuth = async () => {
        if (isCellPhoneForm(userPhone)) {
            try {
                const res = await requestPostMobileAuth(userPhone);
                if (res.data.msg === '실패!') {
                    // openModal('인증번호 발송에 실패했습니다.', '잠시 후 다시 시도해 주세요!');
                    alert('SMS not enough point. please charge.');
                } else {
                    setToggle(true);
                    setStartTimer(true);
                    openModal('인증번호가 성공적으로 발송되었습니다!', '인증번호를 확인 후 입력해 주세요!');
                }
            } catch (e) {
                openModal('잘못된 접근입니다.', '잠시 후 재시도 해주세요.');
            }
        } else {
            openModal('휴대폰 형식에 맞지 않습니다!', '휴대폰 번호를 확인해 주세요.');
        }
    };
    const onClickReSendAuth = () => {
        openModal('인증번호를 재전송 하시겠습니까?', '인증번호는 6자리입니다.', () => {
            setStartTimer(false);
            onClickSendAuth();
        }, true);
    };
 
    const onClickFindEmail = async () => {
        const res = await findId(userName, userPhone);
        if (res.data.msg === '성공') {
            const mail = res.data.query.user.email;
            history.push(`${Paths.ajoonamu.find_email}?email=${mail}`);
        } else if (res.data.msg === '해당 이름과 전화번호에 일치하는 계정이 없습니다.') {
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
                        onClick={success ? () => {} : toggle ? onClickReSendAuth : onClickSendAuth}
                        toggle={toggle}
                        initValue={userPhone}
                        buttonTitle={
                            success ? '인증 완료' : toggle ? '인증번호 재발송' : '인증번호 발송'
                        }
                        onChange={onChangePhone}
                        placeholder={'핸드폰 번호'}
                        button_disabled={success}
                        input_disabled={success}
                    />
                    <div className={cx('auth-btn', { not_view: !toggle })}>
                        <SignNormalInput
                            inputType={'text'}
                            initValue={userAuth}
                            onChange={onChangeAuth}
                        />
                        <div className={styles['timer']}>
                            {success ? <Check on={true}/>
                            : <AuthTimer start={start_timer} />}
                        </div>
                    </div>
                    <Button
                        title={'확인'}
                        toggle={success}
                        onClick={onClickFindEmail}
                    />
                </div>
            </div>
        </>
    );
};

export default RecoveryIdContainer;
