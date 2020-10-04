import React,{useRef,useEffect,useState,useCallback} from 'react';
import {Paths} from 'paths';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import TitleBar from 'components/titlebar/TitleBar';
import styles from './UpdateInfo.module.scss';
import SignAuthInput from 'components/sign/SignAuthInput';
import SignNormalInput from 'components/sign/SignNormalInput';
import Button from 'components/button/Button';
import AuthTimer from 'components/sign/AuthTimer';
import Check from 'components/svg/sign/Check';
import classNames from 'classnames/bind';
import Toast from 'components/message/Toast';
import {updatePhone} from '../../api/auth/auth';
import {update_user_info} from '../../store/auth/auth';
import {useStore} from '../../hooks/useStore';

const cx = classNames.bind(styles);

const UpdatePhoneContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const random = useRef(496696);
    const [toast , setToast] = useState(false);
    const [phone, setPhone] = useState('');
    const [auth, setAuth] = useState('49669');
    const onChangePhone = (e) => setPhone(e.target.value);
    const onChangeAuth = (e) => setAuth(e.target.value);
    const user_token = useStore();
    const [toggle, setToggle] = useState(false);
    const [start_timer ,setStartTimer] = useState(false);
    const [success , setSuccess] = useState(false);
    //인증번호 발송
    const onClickSendAuth = () => {
        if(phone.length===0){
            setToast(true);
            setTimeout(()=>{
                setToast(false);
            },3000)
        }
        else{
        setToggle(true);
        setStartTimer(true);
        }
    };
    const onClickReSendAuth =()=>{
        setStartTimer(false);
        setTimeout(()=>setStartTimer(true),0);
    }
    const onClickCompareAuth = useCallback(() => {
        const auth_num = parseInt(auth);
        setSuccess(auth_num === random.current);

    },[auth]);

    
    const onClickUpdatePhone = async()=>{

        const res = await updatePhone(user_token,phone);
        console.log(res);
        dispatch(update_user_info({name :'hp' ,value: phone}));
        if(res.data.msg==="성공"){
                history.replace(Paths.ajoonamu.account);
        }
    }
    
    useEffect(()=>{
        onClickCompareAuth();
    },[onClickCompareAuth])

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['context']}>
                    <div className={styles['input']}>
                    <SignAuthInput
                        placeholder={'휴대폰번호'}
                        inputType={''}
                        initValue={phone}
                        buttonTitle={
                            toggle ? '인증번호 재발송' : '인증번호 발송'
                        }
                        onChange={onChangePhone}
                        onClick={toggle? onClickReSendAuth : onClickSendAuth}
                        toggle={toggle}
                    />
                    </div>
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
                </div>
            </div>
            <Toast on={toast} msg={"핸드폰 번호를 정확하게 기입해주세요."}/>
            <Button title={'확인'} toggle={success} onClick={onClickUpdatePhone}/>
        </>
    );
};

export default UpdatePhoneContainer;