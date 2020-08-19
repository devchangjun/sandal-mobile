import React, { useState } from 'react';
import styles from './Sign.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import TitleBar from 'components/titlebar/TitleBar';
import Button from 'components/button/Button';
import classNames from 'classnames/bind';

const cx= classNames.bind(styles);

const logo = "http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png";

const RecoveryPwContainer = () => {


    const [name, setName] = useState('');
    const [email ,setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [auth, setAuth] = useState('');
    const [toggle , setToggle] = useState(false);
    // const [success , setSuccess] = useState(false); 

    const onChangeName=e=>setName(e.target.value);
    const onChangeEmail = e => setEmail(e.target.value);
    const onChangePhone = e => setPhone(e.target.value);
    const onChangeAuth = e => setAuth(e.target.value);
    const postAuthNumber =e=>setToggle(true);
    


    return (
        <>
            <TitleBar title="비밀번호 찾기" src={logo} alt="비밀번호 찾기"></TitleBar>
            <div className={styles['sign-main']}>
                <div className={styles['sign-content']}>
                    <SignNormalInput placeholder={"이름"} initValue={name} onChange={onChangeName}/>
                    <SignNormalInput placeholder={"이메일"} initValue={email} onChange={onChangeEmail}/>
                    <SignAuthInput placeholder={"휴대폰번호"}inputType={""} initValue={phone} buttonTitle={toggle ? "인증번호 재발송" : "인증번호 발송"} onChange={onChangePhone} onClick={postAuthNumber}  toggle={toggle}/>
                    <div className={cx('auth-btn',{not_view: !toggle})}>
                    <SignAuthInput inputType={"text"} initValue={auth} buttonTitle={"인증하기"} onChange={onChangeAuth} />
                    </div>
                    <Button title={"확인"}></Button>

                </div>
            </div>
        </>
    )
}


export default RecoveryPwContainer;