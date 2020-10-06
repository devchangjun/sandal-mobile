import React, { useState, useCallback, useEffect } from 'react';
import {Paths} from 'paths';
import {useHistory} from 'react-router-dom';
import styles from './Find.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import classNames from 'classnames/bind';
import SignNormalInput from 'components/sign/SignNormalInput';
import Button from '../../components/button/Button';
import {useModal} from '../../hooks/useModal';
import {changePw} from '../../api/auth/auth';
const cx = classNames.bind(styles);

const FindPasswordContainer = () => {
    const openModal = useModal();
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [hp ,setHp] = useState('');
    const [name ,setName] = useState('');
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
    const onClickChangePassword =async()=>{
        try{   
            const res = await changePw(email,name,hp,password,password_confirm);
            console.log(res);
            if(res.data.msg==='성공'){
                openModal('비밀번호가 성공적으로 변경되었습니다.','새로운 비밀번호로 로그인해주세요.',
                ()=> {
                    history.replace(Paths.ajoonamu.signin);
                    sessionStorage.removeItem('find_user');
                    }   
                );
                
            }

        }
        catch(e){
            openModal('잘못된 접근입니다.','');
        }
    }

    useEffect(()=>{
        const find_user = JSON.parse(sessionStorage.getItem('find_user'));
        console.log(find_user);
        if(find_user){
            const {email,name,hp} = find_user;
            setEmail(email);
            setName(name);
            setHp(hp);
        }
        else{
            openModal('잘못된 접근입니다.','',()=>history.replace('/'))
        }
    },[])

    useEffect(() => {
        matchPassword();
    }, [matchPassword]);

    useEffect(()=>{
        return()=>{
            console.log('언마운트');
        }
    },[])

    return (
        <>
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
