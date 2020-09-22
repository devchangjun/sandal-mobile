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
// import {KakaoLogo,NaverLogo,FacebookLogo} from '../../components/svg/sign/social';
import {
    KakaoLogo,
    NaverLogo,
    FacebookLogo,
} from '../../components/svg/sign/social';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';

const cx = classNames.bind(styles);


const KakaoButton = styled(KakaoLogin)`
    /* display: inline-block;
  padding: 0;
  width: auto;
  height: 49px;
  line-height: 49px;
  color: #3C1E1E;
  background-color: #FFEB00;
  border: 1px solid red;
  border-radius: 3px;
  font-size: 16px;
  text-align: center;
 background-image : url('../../components/svg/sign/social/kakao.png') no-repeat;; */
 border:none;
 background-color:transparent;
`;


const logo = 'http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png';

const initialUserState = {
    email: '',
    password: '',
};

const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER_EMAIL':
            return {
                ...state,
                email: action.email,
            };
        case 'UPDATE_USER_PASSWORD':
            return {
                ...state,
                password: action.password,
            };
        default:
            return state;
    }
};

const SignInContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, dispatchUser] = useReducer(userReducer, initialUserState);
    const { email, password } = user;
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const btnToggle = email.length !== 0 && password.length !== 0 ? true : false;
        setToggle(btnToggle);
    }, [email, password]);

    const updateEmail = (e) => {
        dispatchUser({ type: 'UPDATE_USER_EMAIL', email: e.target.value });
    };

    const updatePassword = (e) => {
        dispatchUser({
            type: 'UPDATE_USER_PASSWORD',
            password: e.target.value,
        });
    };

    const onClickSignup = useCallback(() => {
        history.push(Paths.ajoonamu.signup);
    }, [history]);

    const onClickRecovery = useCallback(() => {
        history.push(Paths.ajoonamu.recovery);
    }, [history]);
    const onClickLogin = useCallback(async () => {
        const { email, password } = user;
        const res = await localLogin(email, password);
        if (res.status === 200) {
            //회원가입 안되있는 이메일
            if (res.data.msg === '회원가입 되어있지 않은 이메일입니다.') {
                alert('회원가입 되어있지 않은 이메일입니다.');
            }
            //비밀번호가 틀렸을 때
            else if (res.data.msg === '비밀번호가 틀렸습니다.') {
                alert('비밀번호가 틀렸습니다.');
            }
            //로그인 성공 했을 때.
            else if (res.data.access_token) {
                sessionStorage.setItem('access_token', res.data.access_token);
                dispatch(get_user_info(res.data.access_token));
                history.push(Paths.index);
            }
        } else {
            alert('이메일 혹은 패스워드를 확인해주세요');
        }
    }, [user, history, dispatch]);

    const onClickKakaoLogin = async (res) => {
        console.log(res);
        const token = res.response.access_token;
        localStorage.setItem('social', 'kakao');
        localStorage.setItem('access_token', token);
    };

    return (
        <>
            <TitleBar title="로그인" src={logo} alt="로그인"></TitleBar>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <SignNormalInput
                        inputType={'text'}
                        initValue={user.email}
                        onChange={updateEmail}
                        placeholder={'이메일'}
                        focus={true}
                    />
                    <SignNormalInput
                        inputType={'password'}
                        initValue={user.password}
                        onChange={updatePassword}
                        placeholder={'비밀번호'}
                    />
                    <div className={styles['login-btn']}>
                        <LinkButton
                            title={'로그인'}
                            onClick={onClickLogin}
                            toggle={toggle}
                        />
                    </div>
                    <div className={styles['link-table']}>
                        <div className={styles['table-cell']} onClick={onClickSignup}>
                            <div className={styles['sub-text']}>회원가입</div>
                        </div>
                        <div className={styles['table-cell']} onClick={onClickRecovery}>
                            <div className={styles['sub-text']}>아이디찾기</div>
                        </div>
                        <div className={styles['table-cell']} onClick={onClickRecovery}>
                            <div className={styles['sub-text']}>
                                비밀번호찾기
                            </div>
                        </div>
                    </div>
                    <div className={styles['sns-box']}>
                        <div className={styles['social-login']}>
                            <div className={styles['text']}>간편 로그인</div>
                            <div className={styles['line']}></div>
                        </div>
                        <div className={styles['social']}>
                            <div className={styles['sns']}>
                                <img src={NaverLogo} alt="naver"></img>
                            </div>
                            <div className={styles['sns']}>
                                <KakaoButton
                                    jsKey={'9f4d0e5bb1c19aed9322372dd32fbd51'}
                                    buttonText="kakao"
                                    getProfile={true}
                                    onSuccess={onClickKakaoLogin}
                                >
                                <img src={KakaoLogo} alt="kakao"></img>
                                </KakaoButton>
                            </div>
                            <div className={styles['sns']}>
                                <img src={FacebookLogo} alt="facebook"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignInContainer;
