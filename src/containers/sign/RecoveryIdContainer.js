import React, { useState } from 'react';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import TitleBar from 'components/titlebar/TitleBar';
import Button from 'components/button/Button';

const logo = "http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png";

const RecoveryIdContainer = () => {
    
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAuth, setUserAuth] = useState('');
    
    const onChangeId =(e)=>{
        setUserName(e.target.value);
    }
    const onChangePhone =(e)=>{
        setUserPhone(e.target.value);
    }
    const onChangeAuth =(e)=>{
        setUserAuth(e.target.value);
    }


    return (
        <div className="sign-main">
            <div className="sign-content">
                <TitleBar title="아이디 찾기" src={logo} alt="아이디 찾기"></TitleBar>
                <label>이름</label>
                <SignNormalInput inputType={"text"} initValue={userName} onChange={onChangeId}/>
                <label>휴대폰 인증</label>
                <SignAuthInput inputType={"text"} initValue={userPhone} buttonTitle={"인증번호 발송"} onChange={onChangePhone}/>
                <SignAuthInput inputType={"text"} initValue={userAuth} buttonTitle={"인증하기"}  onChange={onChangeAuth}/>
                <Button title={"확인"}></Button>

            </div>

        </div>
    )
}


export default RecoveryIdContainer;