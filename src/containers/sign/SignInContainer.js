import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { Paths } from 'paths';
// styles
import styles from './Sign.module.scss';
import classNames from 'classnames/bind';
import styled from 'styled-components';

//components
import SignNormalInput from 'components/sign/SignNormalInput';
import LinkButton from 'components/button/LinkButton';
import {  KakaoLogo, NaverLogo, FacebookLogo} from '../../components/svg/sign/social';
import KakaoLogin from 'react-kakao-login';
import DatePicker from '../../components/asset/DatePicker';

//lib
import { isEmailForm } from '../../lib/formatChecker';

//hooks
import { useModal } from '../../hooks/useModal';
import {useInit} from '../../hooks/useStore';
import { useHistory } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

///api
import { getActiveAddr } from '../../api/address/address';
import { getNearStore } from '../../api/store/store';
import { localLogin } from '../../api/auth/auth';

//store
import { get_user_info } from '../../store/auth/auth';

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
    
    const initStore = useInit();
    const openModal = useModal();
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, dispatchUser] = useReducer(userReducer, initialUserState);
    const { email, password } = user;
    const [toggle, setToggle] = useState(false);
    const {succeed} = useSelector((state)=>state.auth);

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
        if (!isEmailForm(email)) {
            openModal('이메일이 형식에 맞지 않습니다!', '확인 후 다시 작성해 주세요.');
        } else {
            try {
                const res = await localLogin(email, password);
                if (res.status === 200) {
                    // 회원가입 안되있는 이메일
                    if (res.data.msg === '회원가입 되어있지 않은 이메일입니다.') {
                        openModal(res.data.msg, '아이디를 다시 한 번 확인해 주세요.');
                    }
                    // 비밀번호가 틀렸을 때
                    else if (res.data.msg === '비밀번호가 틀렸습니다.') {
                        openModal(res.data.msg, '비밀번호를 다시 한 번 확인해 주세요.');
                    }
                    // 탈퇴한 이메일일 때.
                    else if (res.data.msg === '탈퇴한 이메일입니다.') {
                        openModal(res.data.msg, '아이디를 다시 한 번 확인해 주세요.');
                    }
                    // 로그인 성공 했을 때.
                    else if (res.data.access_token) {
                        //토큰 넘겨 유저정보 디스패치
                        dispatch(get_user_info(res.data.access_token));
                        const active_addr = await getActiveAddr(res.data.access_token);
                        sessionStorage.setItem('access_token', res.data.access_token);
                        if(active_addr){
                           const {lat,lng,addr1,addr2,post_num} = active_addr;
                            const near_store = await getNearStore(lat,lng,addr1);
                            initStore(addr1,addr2,lat,lng,post_num,near_store.data.query );
                        }
                        else{
                            initStore();
                        }
                        history.replace('/');
                    }
                } else {
                    openModal('로그인에 실패하였습니다.', '이메일 혹은 패스워드를 확인해주세요.');
                }
            } catch (e) {
                openModal('잘못된 접근입니다.', '잠시 후 재시도 해주세요.');
                history.replace('/');
            }
        }
    }, [history, dispatch, email, password, openModal]);
    const onClickKakaoLogin = async (res) => {
        console.log(res);
        const token = res.response.access_token;
        localStorage.setItem('social', 'kakao');
        localStorage.setItem('access_token', token);
    };


    useEffect(() => {
        const btnToggle = email.length !== 0 && password.length !== 0 ? true : false;
        setToggle(btnToggle);
    }, [email, password]);

    // useEffect(()=>{
    //     if(succeed){
    //         history.replace('/');
    //     }
    // },[succeed])
    return (
        <>
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
                    {/* <div className={styles['sns-box']}>
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
                    </div> */}
                </div>
                <DatePicker/>
            </div>
        </>
    );
};

export default SignInContainer;
