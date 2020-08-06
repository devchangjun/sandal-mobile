import React from 'react';
import styles from './Sign.module.scss';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import TitleBar from 'components/titlebar/TitleBar';
import SignComplete from 'components/sign/SignComplete';
import LinkButton from 'components/button/LinkButton';

const logo = "http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png";

const SignCompleteContainer = ({ name }) => {
    //qurey로 이름 값 받아서 출력하기
    const history = useHistory();

    const goToLogin = () => {
        history.push(Paths.ajoonamu.signin);
    }
    return (
        <>
            <TitleBar title={"회원가입 완료"} src={logo} alt={"회원가입 완료"} />
            <div className={styles['sign-main']}>
                   <div className={styles['sign-content']}>
                    <SignComplete mainTitle={`축하합니다 ${name}님`} subTitle={"아주나무 딜리버리 회원가입이 완료 되었습니다. "} text={"이메일 회원가입을 하신 회원님께서는 가입하신 이메일 주소로 지금 즉시 로그인이 가능합니다."} />
                        <LinkButton title={"로그인"} onClick={goToLogin}></LinkButton>
                </div>
            </div>
        </>
    )
}

export default SignCompleteContainer;