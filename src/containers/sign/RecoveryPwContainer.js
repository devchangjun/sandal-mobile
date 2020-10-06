import React, { useState,useEffect,useRef, useCallback } from 'react';
import {Paths} from 'paths';
import styles from './Recovery.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import TitleBar from 'components/titlebar/TitleBar';
import Button from 'components/button/Button';
import classNames from 'classnames/bind';
// import { sendSMS } from "../../api/sms/sms";
import { useHistory } from 'react-router';
import AuthTimer from 'components/sign/AuthTimer';
import Check from 'components/svg/sign/Check';
import {findPw} from '../../api/auth/auth';
import {useModal} from '../../hooks/useModal';
const cx = classNames.bind(styles);

const logo =
    'http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png';

const RecoveryPwContainer = () => {

    const openModal = useModal();
    const history = useHistory();
    const random = useRef(496696);
    const [name, setName] = useState('김보건');
    const [email, setEmail] = useState('cuzi.kbg@gmail.com');
    const [hp, setHp] = useState('01072128994');
    const [auth, setAuth] = useState('49669');
    const [toggle, setToggle] = useState(false);
    const [success , setSuccess] = useState(false);
    const [start_timer ,setStartTimer] = useState(false);

    const onChangeName = (e) => setName(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePhone = (e) => setHp(e.target.value);
    const onChangeAuth = (e) => setAuth(e.target.value);


    const onClickCompareAuth = useCallback(() => {

        const auth_num = parseInt(auth);
        setSuccess(auth_num === random.current);

    },[auth]);
    

    useEffect(()=>{
        onClickCompareAuth();
    },[onClickCompareAuth])

    //인증번호 발송
    const onClickSendAuth = () => {
        console.log(random.current);
        setToggle(true);
        setStartTimer(true);
    };
    const onClickReSendAuth =()=>{
        setStartTimer(false);
        setTimeout(()=>setStartTimer(true),0);
    }

    const onClickComplete= async()=>{

        try{
            const res = await findPw(email,name,hp);
            console.log(res);
            if(res.data.msg==='성공'){
                const find_user = {
                    email, name, hp
                }
                sessionStorage.setItem('find_user' , JSON.stringify(find_user));
                history.push(Paths.ajoonamu.find_password);
            }
        }
        catch(e){
            console.error(e);
        }
    }

    return (
        <>
      
            <div className={styles['container']}>
                <div className={cx('content', 'pd-box')}>
                    <SignNormalInput
                        placeholder={'이름'}
                        initValue={name}
                        onChange={onChangeName}
                    />
                    <SignNormalInput
                        placeholder={'이메일'}
                        initValue={email}
                        onChange={onChangeEmail}
                    />
                    <SignAuthInput
                        placeholder={'휴대폰번호'}
                        inputType={''}
                        initValue={hp}
                        buttonTitle={
                            toggle ? '인증번호 재발송' : '인증번호 발송'
                        }
                        onChange={onChangePhone}
                        onClick={toggle? onClickReSendAuth : onClickSendAuth}
                        toggle={toggle}
                    />
                    <div className={cx('auth-btn', { not_view: !toggle })}>
                        <SignNormalInput
                            inputType={'text'}
                            initValue={auth}
                            onChange={onChangeAuth}
                        />
                        <div className={styles['timer']}>
                            {success ? (
                                <Check on={true} />
                            ) : (
                                <AuthTimer start={start_timer}></AuthTimer>
                            )}
                        </div>
                    </div>
                    <Button
                        title={'확인'}
                        toggle={success}
                        onClick={onClickComplete}
                    ></Button>
                </div>
            </div>
        </>
    );
};

export default RecoveryPwContainer;
