import React from 'react';
import {Paths} from 'paths';
import {useHistory} from 'react-router-dom';
import TitleBar from 'components/titlebar/TitleBar';
import SignComplete from 'components/sign/SignComplete';
import Button from 'components/button/Button';

const logo = "http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png";

const SignCompleteContainer = ({name}) => {
    //qurey로 이름 값 받아서 출력하기
    const history =useHistory();

    const goToLogin =()=>{
        history.push(Paths.ajoonamu.signin);
    }
    return (    
        <div className="sign-main">
            <div className="sign-content">
                <TitleBar title={"회원가입 완료"} src ={logo} alt={"회원가입 완료"}/>
                <SignComplete mainTitle={`축하합니다 ${name}님`} subTitle={"회원가입 완료"} text={"지금 로그인 가능"}/>
                <Button title={"로그인"} onClick={goToLogin}></Button>
            </div>
        </div>
    )
}

export default SignCompleteContainer;