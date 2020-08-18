import React, { useState } from 'react';
import styles from './Sign.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import TitleBar from 'components/titlebar/TitleBar';
import Button from 'components/button/Button';
import classNames from 'classnames/bind';

const cx= classNames.bind(styles);

const logo = "http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png";

const RecoveryIdContainer = () => {

    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAuth, setUserAuth] = useState('');
    const [toggle , setToggle] = useState(false);
    const [success , setSuccess] = useState(false); 

    const onChangeName = e => setUserName(e.target.value);
    const onChangePhone = e =>setUserPhone(e.target.value);
    const onChangeAuth = e=> setUserAuth(e.target.value);
    const postAuthNumber =()=>setToggle(true);


    return (
        <>
            <TitleBar title="아이디 찾기" src={logo} alt="아이디 찾기"></TitleBar>

            <div className={styles['sign-main']}>
                <div className={styles['sign-content']}>
                    <SignNormalInput inputType={"text"} initValue={userName} onChange={onChangeName} placeholder={"이름"}/>
                    <SignAuthInput inputType={"text"} onClick={postAuthNumber} toggle={toggle}initValue={userPhone} buttonTitle={toggle ? "인증번호 재발송" : "인증번호 발송"} onChange={onChangePhone} placeholder={"핸드폰 번호"}/>
                    <div className={cx('auth-btn',{not_view: !toggle})}>
                    <SignAuthInput inputType={"text"} initValue={userAuth} buttonTitle={"인증하기"} onChange={onChangeAuth} />
                    </div>
                    <Button title={"확인"}></Button>
                </div>

            </div>
        </>
    )
}


export default RecoveryIdContainer;