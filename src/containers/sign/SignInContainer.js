import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import styles from './Sign.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import TitleBar from 'components/titlebar/TitleBar';
import LinkButton from 'components/button/LinkButton';
import { localLogin } from '../../api/auth/auth';
import { get_user_info } from '../../store/auth/auth';
import classNames from 'classnames/bind';
const cx= classNames.bind(styles);


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
    const dispatch = useDispatch();
    const [user, dispatchUser] = useReducer(userReducer, initialUserState);
    const {email,password} = user;
    const [toggle, setToggle] = useState(false);

    useEffect(() => {

        const btnToggle = (email.length !== 0 && password.length !== 0) ? true : false;
        setToggle(btnToggle);

    }, [email,password])

    const updateEmail = (e) => {
        dispatchUser({ type: 'UPDATE_USER_EMAIL', email: e.target.value });
    }

    const updatePassword =(e) => {
        dispatchUser({ type: 'UPDATE_USER_PASSWORD', password: e.target.value });
    }

    const onClickSignup = useCallback(() => {
        history.push(Paths.ajoonamu.signup);
    },[history]);
    
    const onClickRecovery = useCallback(() => {
        history.push(Paths.ajoonamu.recovery);
    },[history])
    const onClickLogin = useCallback(async () => {

        const { email, password } = user;
        const res = await localLogin(email, password);
        console.log(res);
        if (res.status === 200) {
    
            //회원가입 안되있는 이메일
            if (res.data.msg === "회원가입 되어있지 않은 이메일입니다.") {
                alert("회원가입 되어있지 않은 이메일입니다.");
            }
            //비밀번호가 틀렸을 때
            else if(res.data.msg ==="비밀번호가 틀렸습니다."){
                alert("비밀번호가 틀렸습니다.");
            }
            //로그인 성공 했을 때.
            else if (res.data.access_token) {
                sessionStorage.setItem("access_token", res.data.access_token);
                dispatch(get_user_info(res.data.access_token));
                history.push(Paths.index);
            }
        }
        else {
            alert("이메일 혹은 패스워드를 확인해주세요");
        }

    },[user,history,dispatch])


    return (
        <>
            <TitleBar title="로그인" src={logo} alt="로그인"></TitleBar>
                <div className={cx('container','min-height')}>
                    <div className={cx('content','pd-box')}>
                        <SignNormalInput inputType={"text"} initValue={user.email} onChange={updateEmail} placeholder={"이메일"} focus={true} />
                        <SignNormalInput inputType={"password"} initValue={user.password} onChange={updatePassword} placeholder={"비밀번호"} />
                        <div className={styles['login-btn']}>
                            <LinkButton title={"로그인"} onClick={onClickLogin} toggle={toggle}></LinkButton>
                        </div>
                        <div className={styles['link-table']}>
                            <div className={styles['table-cell']} onClick={onClickSignup} >
                                <div className={styles['sub-text']}>회원가입</div>
                            </div>
                            {/* <div className={cx('table-cell','line')}>
                            <div className={styles['vertical-line']}/>
                        </div> */}
                            <div className={styles['table-cell']} onClick={onClickRecovery}>
                                <div className={styles['sub-text']}>아이디찾기</div>
                            </div>
                            {/* <div className={cx('table-cell','line')}>
                            <div className={styles['vertical-line']}/>
                        </div> */}
                            <div className={styles['table-cell']} onClick={onClickRecovery}>
                                <div className={styles['sub-text']}>비밀번호찾기</div>
                            </div>
                        </div>
                        {/* 이부분 컴포넌트 만들어야함 */}
                        <div className={styles.social}>
                            <div className={styles.sns}>
                                <img src={naver} alt="naver"></img>
                            </div>
                            <div className={styles.sns}>

                                <img src={kakao} alt="kakao"></img>

                            </div>
                            <div className={styles.sns}>
                                <img src={facebook} alt="facebook"></img>
                            </div>
                        </div>
                    </div>
                </div>
        </>

    )
}

export default SignInContainer;