import React, { useState, useEffect, useCallback, useReducer } from 'react';
import classNames from 'classnames/bind';

import { useHistory } from 'react-router-dom';
import { Paths } from 'paths'
import {localRegister} from '../../api/auth/auth';
import styles from './Sign.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import TitleBar from 'components/titlebar/TitleBar';
import Button from 'components/button/Button';
import produce from 'immer';
import Check from 'components/svg/sign/Check';
import CheckBox from 'components/checkbox/CheckBox';

const cx = classNames.bind(styles);

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

const initCheck = {
    allCheck: false,
    check1: false,
    check2: false,
    check3: false,
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

const checkReducer = (state, action) => {

    switch (action.type) {
        case 'ALL_CHECK':
            return {
                ...state,
                allCheck: action.check,
            }
        case 'CHECK1':
            return {
                ...state,
                check1: action.check
            }
        case 'CHECK2':
            return {
                ...state,
                check2: action.check
            }
        case 'CHECK3':
            return {
                ...state,
                check3: action.check
            }
        default:
            return state;
    }
}

const SignUpContainer = () => {

    const history = useHistory();

    const [user, dispatchUser] = useReducer(userReducer, initialUserState);
    const [compare, setCompare] = useState(false);
    const [toggle, setToggle] = useState(false);


    const [check, dispatchCheck] = useReducer(checkReducer, initCheck);
    const { allCheck, check1, check2, check3 } = check;

    useEffect(() => {
        updateToggle();
    }, [user.email])

    useEffect(() => {
        matchPassword();
    }, [user.password, user.password_confirm])
    useEffect(() => {
        updateToggle();
    }, [compare]);

    useEffect(() => {
        onToggleAllCheck();
        updateToggle();
    }, [check1, check2, check3]);

    useEffect(() => {
        onToggleCheck();
        updateToggle();
    }, [allCheck])

    const updateToggle = () => {
        const { email, password, password_confirm } = user;
        let checkbox = (check1 && check2) ? true : false;
        let userinfo = (email.length != 0 && compare) ? true : false;
        let result = (checkbox && userinfo) ? true : false;
        setToggle(result);
    };


    const updateAllCheck = useCallback((e) => {
        dispatchCheck({ type: 'ALL_CHECK', check: e.target.checked });
    })
    const onChangeCheck1 = useCallback((e) => {
        dispatchCheck({ type: 'CHECK1', check: e.target.checked });
    })
    const onChangeCheck2 = useCallback((e) => {
        dispatchCheck({ type: 'CHECK2', check: e.target.checked });
    })
    const onChangeCheck3 = useCallback((e) => {
        dispatchCheck({ type: 'CHECK3', check: e.target.checked });
    })

    const onToggleAllCheck = () => {
        if (check1 && check2 && check3) {
            dispatchCheck({ type: 'ALL_CHECK', check: true });
            dispatchCheck({ type: 'CHECK1', check: true });
            dispatchCheck({ type: 'CHECK2', check: true });
            dispatchCheck({ type: 'CHECK3', check: true });
        }
        else if (!check1 || !check2 || !check3) {
            dispatchCheck({ type: 'ALL_CHECK', check: false });
        }
    }
    const onToggleCheck = () => {
        if (allCheck) {
            dispatchCheck({ type: 'CHECK1', check: true });
            dispatchCheck({ type: 'CHECK2', check: true });
            dispatchCheck({ type: 'CHECK3', check: true });
        }
        else if (!check1 || !check2 || !check3) {
            dispatchCheck({ type: 'ALL_CHECK', check: false });
        }
    }
    const updateName = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_NAME', name: e.target.value });
    })

    const updateEmail = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_EMAIL', email: e.target.value });
    })
    const updatePassword = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_PASSWORD', password: e.target.value });

    })
    const updateConfirm = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_COMPARE', password_confirm: e.target.value });
    })
    const updatePhoneNumber = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_PHONENUMBER', phoneNumber: e.target.value });

    })
    const updateAuthNumber = useCallback((e) => {
        dispatchUser({ type: 'UPDATE_USER_AUTHNUMBER', authNumber: e.target.value });

    })

    const matchPassword = () => {
        if (user.password.length != 0 && user.password_confirm.length != 0) {
            console.log("0이 아님");
            setCompare(user.password === user.password_confirm);
        }
        else {
            console.log("0임");
            setCompare(false);
        }
    }

    const confirm = () => {
        const { password, password_confirm } = user;
        if (password.length != 0 || password_confirm.length != 0) {
            if (compare) {
                return (
                    "비밀번호가 일치합니다."
                )
            }
            else {
                return (
                    "비밀번호가 일치하지 않습니다."
                )
            }
        }
    }
    const onSignup = async () => {
        const { name, email, password, password_confirm } = user;
        const res = await localRegister(email,password,password_confirm);
        console.log(res);
        if(res.data.msg ==="존재하는 이메일 주소로 가입을 시도하셔서 가입에 실패하셨습니다.") {
            alert("이미 존재하는 이메일 입니다.");
        }
        else if(res.data.status ==="success"){
            console.log("회원가입 완료");
            history.push(`${Paths.ajoonamu.complete}?name=${email}`);
        }
  
    }

    return (
        <>
            <TitleBar title="회원가입" src={logo} alt="회원가입"></TitleBar>
            <div className={cx('sign-main', 'pd-none')}>
                <div className={cx('sign-content', 'pd-box','pd-top')}>
                    <SignAuthInput inputType={"text"} initValue={user.email} onChange={updateEmail} placeholder={"이메일"} buttonTitle={"중복검사"} />
                    <SignNormalInput inputType={"password"} initValue={user.password} onChange={updatePassword} placeholder={"비밀번호"} />
                    <SignNormalInput inputType={"password"} initValue={user.password_confirm} onChange={updateConfirm} placeholder={"비밀번호 확인"} />
                    <div className={cx('compare', { on: compare, not_view: user.password.length == 0 && user.password_confirm.length == 0 })}>
                        <label>{confirm()}</label>
                    </div>
                    {/* <label>휴대폰 인증</label>
                    <SignAuthInput inputType={"text"} initValue={user.phoneNumber} onChange={updatePhoneNumber} buttonTitle={"인증번호 발송"} />
                    <SignAuthInput inputType={"text"} initValue={user.authNumber} onChange={updateAuthNumber} buttonTitle={"인증하기"} /> */}
                </div>
                <AcceptContainer
                    {...check}
                    updateAllCheck={updateAllCheck}
                    onChangeCheck1={onChangeCheck1}
                    onChangeCheck2={onChangeCheck2}
                    onChangeCheck3={onChangeCheck3}
                />

            </div>
            <Button title={"가입완료"} onClick={onSignup} toggle={toggle} ></Button>
        </>
    )
}

const AcceptContainer = (props) => {
    return (
        <div className={cx('agree')}>
            <div className={cx('pd-box','line','pd-sub-top')}>
                <CheckBox id={"all"} text={"모두 동의합니다."} check={props.allCheck} onChange={props.updateAllCheck} />
            </div>
            <div className={styles['background']}>
                <div className={cx('pd-sub-top')}>
                    <CheckBox id={"check1"} text={"개인정보처리방침 필수동의"} check={props.check1} onChange={props.onChangeCheck1} />
                    <CheckBox id={"check2"} text={"이용약관 필수"} check={props.check2} onChange={props.onChangeCheck2} />
                    <CheckBox id={"check3"} text={"이벤트알림 선택동의"} check={props.check3} onChange={props.onChangeCheck3} />
                    <div className={styles['sms']}>
                        <div className={styles['sub-text']}>
                            <label>SMS, 이메일을 통해 할인/이벤트/쿠폰 정보를 </label><br></br>
                            <label>받아보실 수 있습니다. </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default SignUpContainer;