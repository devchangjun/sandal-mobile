import React, { useState, useCallback, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import TitleBar from 'components/titlebar/TitleBar';
import styles from './UpdateInfo.module.scss';
import Button from 'components/button/Button';
import SignNormalInput from 'components/sign/SignNormalInput';
import classNames from 'classnames/bind';
import {updatePassword} from '../../api/auth/auth';
import {useStore} from '../../hooks/useStore';
import { Paths } from '../../paths';
//test commit
const cx = classNames.bind(styles);

const UpdatePasswordContainer = () => {
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [new_password_confirm, setNewPasswordConfirm] = useState('');
    const [compare, setCompare] = useState(false);
    const onChangePassword = e=> setPassword(e.target.value);
    const onChangeNewPassword =e => setNewPassword(e.target.value);
    const onChangeNewPasswordConfirm = e => setNewPasswordConfirm(e.target.value);
    const user_token = useStore();

    //패스워드 매칭 체크
    const matchPassword = useCallback(() => {
          if (new_password.length !== 0 && new_password_confirm.length !== 0) {
            setCompare(new_password === new_password_confirm);
          } else {
            setCompare(false);
         }
    }, [new_password, new_password_confirm]);

    const confirm = () => {
        if (new_password.length !== 0 || new_password_confirm.length !== 0) {
            if (compare) {
                return '비밀번호가 일치합니다.';
            } else {
                return '비밀번호가 일치하지 않습니다.';
            }
        }
    };

    const onClickUpdatePassword = async ()=>{
       const res = await updatePassword(user_token,password,new_password, new_password_confirm);
       console.log(res);
       if(res.data.msg==='성공'){
           history.replace(Paths.ajoonamu.account);
       }
    }
 

    useEffect(() => {
        matchPassword();
    }, [matchPassword]);

    return (
        <>
            <TitleBar title={'비밀번호 변경'} />
            <div className={styles['container']}>
                <div className={styles['context']}>
                    <div className={styles['input']}>
                        <div className={styles['box']}>
                            <SignNormalInput
                                inputType={'password'}
                                initValue={password}
                                onChange={onChangePassword}
                                placeholder={'현재 비밀번호'}
                            />
                        </div>
                        <div>
                            <SignNormalInput
                                inputType={'password'}
                                initValue={new_password}
                                onChange={onChangeNewPassword}
                                placeholder={'변경할 비밀번호'}
                            />
                            <SignNormalInput
                                inputType={'password'}
                                initValue={new_password_confirm}
                                onChange={onChangeNewPasswordConfirm}
                                placeholder={'변경할 비밀번호 확인'}
                            />
                            <div
                                className={cx('compare', {
                                    on: compare,
                                    not_view:
                                        new_password.length === 0 &&
                                        new_password_confirm.length === 0,
                                })}
                            >
                                <label>{confirm()}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Button title={'확인'} toggle ={compare} onClick={onClickUpdatePassword}/>
        </>
    );
};

export default UpdatePasswordContainer;
