import React, { useState,useRef } from 'react';
import {Paths} from 'paths';
import styles from './Recovery.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import TitleBar from 'components/titlebar/TitleBar';
import Button from 'components/button/Button';
import classNames from 'classnames/bind';
// import { sendSMS } from "../../api/sms/sms";
import { useHistory } from 'react-router';

const cx = classNames.bind(styles);

const logo =
    'http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png';

const RecoveryPwContainer = () => {
    const history = useHistory();
    const random = useRef(496696);
    const [name, setName] = useState('김보건');
    const [email, setEmail] = useState('cuzi.kbg@gmail.com');
    const [phone, setPhone] = useState('01072128994');
    const [auth, setAuth] = useState('496696');
    const [toggle, setToggle] = useState(false);
    const [success , setSuccess] = useState(false);

    const onChangeName = (e) => setName(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePhone = (e) => setPhone(e.target.value);
    const onChangeAuth = (e) => setAuth(e.target.value);
    
    const onClickSendAuth = (e) => {
        // sendSMS('01094873263', 'TEST');
        console.log('GOGO');
        setToggle(true);
    }

    const onClickCompareAuth = () => {

        const auth_num = parseInt(auth);
        console.log(typeof random.current);
        if (auth_num === random.current) {
            setSuccess(true);
            console.log(success);
        } else {
            alert('인증번호가 일치하지 않습니다.');
            setSuccess(false);
        }
    };

    const onClickComplete=()=>{
        history.push(Paths.ajoonamu.find_password);
    }

    return (
        <>
            <TitleBar title="비밀번호 찾기" src={logo} alt="비밀번호 찾기"></TitleBar>
            <div className={styles['container']}>
                <div className={cx('content','pd-box')}>
                    <SignNormalInput placeholder={"이름"} initValue={name} onChange={onChangeName}/>
                    <SignNormalInput placeholder={"이메일"} initValue={email} onChange={onChangeEmail}/>
                    <SignAuthInput placeholder={"휴대폰번호"}inputType={""} initValue={phone} buttonTitle={toggle ? "인증번호 재발송" : "인증번호 발송"} onChange={onChangePhone} onClick={onClickSendAuth}  toggle={toggle}/>
                    <div className={cx('auth-btn',{not_view: !toggle})}>
                    <SignAuthInput inputType={"text"} initValue={auth} buttonTitle={"인증하기"} onClick={onClickCompareAuth}onChange={onChangeAuth} />
                    </div>
                    <Button title={'확인'} toggle={success} onClick={onClickComplete}></Button>
                </div>
            </div>
        </>
    );
};

export default RecoveryPwContainer;
