import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import styles from './Sign.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import TitleBar from 'components/titlebar/TitleBar';
import LinkButton from 'components/button/LinkButton';
import { localLogin } from '../../api/auth/auth';

const logo = "http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png";

const kakao = "https://i0.wp.com/forhappywomen.com/wp-content/uploads/2018/11/%EC%82%B0%EB%B6%80%EC%9D%B8%EA%B3%BC-%ED%8F%AC%ED%95%B4%ED%94%BC%EC%9A%B0%EB%A8%BC-%EB%AC%B8%EC%9D%98-%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%8C%EB%9F%AC%EC%8A%A4%EC%B9%9C%EA%B5%AC-%EB%B2%84%ED%8A%BC.png?w=586&ssl=1";
const naver = "https://www.inavi.com/Content2/Images/mobileLogin/social-login-naver-icon.svg";
const facebook = "https://w7.pngwing.com/pngs/670/159/png-transparent-facebook-logo-social-media-facebook-computer-icons-linkedin-logo-facebook-icon-media-internet-facebook-icon.png";
const initialUserState = {
    email: '',
    password: '',
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER_EMAIL':
            return {
                ...state,
                email: action.email
            }
        case 'UPDATE_USER_PASSWORD':
            return {
                ...state,
                password: action.password
            }
        default:
            return state;

    }
}

const SignInContainer = () => {
    const history = useHistory();
    const [user, dispatchUser] = useReducer(userReducer, initialUserState);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        console.log("로그인 렌더");
    }, [])

    const updateEmail = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_EMAIL', email: e.target.value });
    })
    const updatePassword = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_PASSWORD', password: e.target.value });
    })
    const updateChecked = useCallback(() => {
        setChecked(!checked);
        console.log(checked);
    })
    const goToSignup = useCallback(() => {
        history.push(Paths.ajoonamu.signup);
    })
    const onLogin = useCallback(async () => {

        const { email, password } = user;
        const res = await localLogin(email, password);
        if (res.status == 200) {
            sessionStorage.setItem("access_token", res.data.access_token);
            // history.push(Paths.index);
        }
        else {
            alert("이메일 혹은 패스워드를 확인해주세요");
        }

    })
    const goToRecovery = useCallback(() => {
        history.push(Paths.ajoonamu.recovery);
    })

    return (
        <>
            <TitleBar title="로그인" src={logo} alt="로그인"></TitleBar>
            <div className={styles['sign-main']}>
                   <div className={styles['sign-content']}>

                    <label>이메일</label>
                    <SignNormalInput inputType={"text"} initValue={user.email} onChange={updateEmail} />
                    <label>비밀번호</label>
                    <SignNormalInput inputType={"password"} initValue={user.password} onChange={updatePassword} />

                    <div className={styles['sub']}>
                        <div onClick={goToRecovery}>
                            <label className={styles['sub-text']}>아이디/비밀번호 찾기</label>
                        </div>
                    </div>
                    <div className={styles['btn-box']}>
                    <LinkButton title={"로그인"} onClick={onLogin}></LinkButton>
                    <LinkButton title={"회원가입"} onClick={goToSignup}></LinkButton>
                    </div>
                    {/* 이부분 컴포넌트 만들어야함 */}
                    <div className={styles.social}>
                        <div className={styles.sns}>
                            <img src={naver}></img>
                        </div>
                        <div className={styles.sns}>

                            <img src={kakao}></img>

                        </div>
                        <div className={styles.sns}>
                            <img src={facebook}></img>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default SignInContainer;