import React, { useState, useCallback, useEffect } from 'react';
import styles from './Find.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import classNames from 'classnames/bind';
import SignNormalInput from 'components/sign/SignNormalInput';
import Button from 'components/button/Button';

const cx = classNames.bind(styles);

const FindPasswordContainer = () => {
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [compare, setCompare] = useState(false);

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    };

    //패스워드 매칭 체크
    const matchPassword = useCallback(() => {
        if (password.length !== 0 && password_confirm.length !== 0) {
            setCompare(password === password_confirm);
        } else {
            setCompare(false);
        }
    }, [password, password_confirm]);

    const confirm = () => {
        if (password.length !== 0 || password_confirm.length !== 0) {
            if (compare) {
                return '비밀번호가 일치합니다.';
            } else {
                return '비밀번호가 불일치합니다.';
            }
        }
    };
    const onClickChangePassword =()=>{
        console.log("비번 변경");
    }

    useEffect(() => {
        matchPassword();
    }, [matchPassword]);

    return (
        <>
            <TitleBar title={'비밀번호 찾기'} />
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <div className={styles['text']}>
                        <p>
                            인증이 완료되어 비밀번호를 새로 설정합니다.
                            비밀번호를 잊어버리지 않게 주의하세요!
                        </p>
                    </div>
                    <div className={styles['input']}>
                        <SignNormalInput
                            inputType={'password'}
                            initValue={password}
                            onChange={onChangePassword}
                            placeholder={'비밀번호'}
                        />
                        <SignNormalInput
                            inputType={'password'}
                            initValue={password_confirm}
                            onChange={onChangePasswordConfirm}
                            placeholder={'비밀번호 확인'}
                        />
                        <div
                            className={cx('compare', {
                                on: compare,
                                not_view:
                                    password.length === 0 &&
                                    password_confirm.length === 0,
                            })}
                        >
                            <label>{confirm()}</label>
                        </div>
                    </div>
                </div>
               <Button title={"비밀번호 변경"} onClick={onClickChangePassword} toggle={compare} ></Button>
            </div>

        </>
    );
};
export default FindPasswordContainer;
