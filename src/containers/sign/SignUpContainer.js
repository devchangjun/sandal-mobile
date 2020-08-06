import React, { useState, useEffect, useCallback, useReducer } from 'react';

import { useHistory } from 'react-router-dom';
import { Paths } from 'paths'
import styles from './Sign.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import TitleBar from 'components/titlebar/TitleBar';
import Button from 'components/button/Button';
// import {userSignup} from '../../api/sign';

const logo = "http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png";

const initialUserState = {
    name: '',
    email: '',
    password: '',
    password_confirm: '',
    phoneNumber: '',
    authNumber: '',
    agree_marketing: 0

}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER_NAME':
            return {
                ...state,
                name: action.name
            }
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
        case 'UPDATE_USER_COMPARE':
            return {
                ...state,
                password_confirm: action.password_confirm
            }
        case 'UPDATE_USER_PHONENUMBER':
            return {
                ...state,
                phoneNumber: action.phoneNumber
            }
        case 'UPDATE_USER_AUTHNUMBER':
            return {
                ...state,
                authNumber: action.authNumber
            }
        default:
            return state;

    }
}

const SignUpContainer = () => {

    const history = useHistory();

    const [user, dispatchUser] = useReducer(userReducer, initialUserState);
    const [check, setCheck] = useState(false);

    const updateName = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_NAME', name: e.target.value });
    })

    const updateEmail = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_EMAIL', email: e.target.value });
    })
    const updatePassword = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_PASSWORD', password: e.target.value });

    })
    const updateCompare = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_COMPARE', password_confirm: e.target.value });
        setCheck(user.password === e.target.value);
    })
    const updatePhoneNumber = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_PHONENUMBER', phoneNumber: e.target.value });

    })
    const updateAuthNumber = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_AUTHNUMBER', authNumber: e.target.value });

    })

    const matchPassword = () => {
        if (check) return user.password === user.password_confirm;
        else return false;
    }

    const renderCompaere = () => {
        if (matchPassword()) {
            return (
                <label>비밀번호가 일치합니다.</label>
            )
        }
        else {
            return (
                <label>비밀번호가 일치하지 않습니다.</label>
            )
        }
    }
    const onSignup = () => {
        history.push(`${Paths.ajoonamu.complete}/${user.name}` );
        // const { name, email, password, password_confirm } = user;
        // const result = userSignup(email,password,password_confirm);
    }

    useEffect(() => {

    }, [user.password, user.password_confirm])

    return (
        <>
            <TitleBar title="회원가입" src={logo} alt="회원가입"></TitleBar>
            <div className={styles['sign-main']}>
                   <div className={styles['sign-content']}>
                    <label>이름</label>
                    <SignNormalInput inputType={"text"} initValue={user.name} onChange={updateName} />
                    <label>이메일</label>
                    <SignAuthInput inputType={"text"} initValue={user.email} onChange={updateEmail} buttonTitle={"중복검사"} />
                    <label>비밀번호</label>
                    <SignNormalInput inputType={"password"} initValue={user.password} onChange={updatePassword} />
                    <SignNormalInput inputType={"password"} initValue={user.password_confirm} onChange={updateCompare} />
                    <div className={(check) ? styles.compare : styles.compare_fail}>
                        {renderCompaere()}
                    </div>
                    <label>휴대폰 인증</label>
                    <SignAuthInput inputType={"text"} initValue={user.phoneNumber} onChange={updatePhoneNumber} buttonTitle={"인증번호 발송"} />
                    <SignAuthInput inputType={"text"} initValue={user.authNumber} onChange={updateAuthNumber} buttonTitle={"인증하기"} />
                    <AcceptContainer></AcceptContainer>
                </div>
            </div>
            <Button title={"회원가입"} onClick={onSignup} ></Button>
        </>
    )
}

function AcceptContainer() {
    const [allCheck, setAllCheck] = useState(false);
    const onChangeCheck = (e) => {
        setAllCheck(!allCheck);
        console.log(allCheck);
    }
    return (
        <div className={styles['agree']}>
            <div className={styles['item']}>
                <div className={styles['sub']}>
                    <input type="checkbox" checked={allCheck} onClick={onChangeCheck} />
                    <label>모두 동의합니다</label>
                </div>
            </div>
            <div className={styles['item']}>
                <div className={styles['sub-text']}>
                    <input type="checkbox" />
                    <label>개인정보처리방침 필수 동의</label>
                </div>
                <div className={styles['sub-text']}>

                    <label>보기 </label>
                </div>
            </div>
            <div className={styles['item']}>
                <div className={styles['sub-text']}>
                    <input type="checkbox" />
                    <label>이용약관 필수 동의</label>
                </div>
                <div className={styles['sub-text']}>

                    <label>보기 </label>
                </div>
            </div>
            <div className={styles['item']}>
                <div className={styles['sub-text']}>
                    <input type="checkbox" />
                    <label>이벤트알림 선택 동의</label>
                </div>
                <div className={styles['sub-text']}>
                    <label>보기 </label>
                </div>
            </div>
            <div className={styles['box']}>
                <div className={styles['sub-text']}>
                    <label>SMS, 이메일을 통해 할인/이벤트/쿠폰 정보를 </label><br></br>
                    <label>받아보실 수 있습니다. </label>
                </div>
            </div>
        </div>
    )
}

export default SignUpContainer;