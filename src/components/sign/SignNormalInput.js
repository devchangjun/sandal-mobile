import React,{useRef, useEffect} from 'react';
import styles from './SignInput.module.scss';
import AuthTimer from './AuthTimer';

//인증 버튼을 포함하지 않을 input

const SignNormalInput = ({ inputType, onChange, initValue, placeholder,focus}) => {
   
    const dom = useRef(null);

    useEffect(()=>{
        if(focus){
            dom.current.focus();
        }
    },[focus])
    return (
        <div className={styles['sign-input']}>
            <form>
            <input className={styles['normal']} placeholder={placeholder} type={inputType} value={initValue} onChange={onChange} ref={dom} autoComplete="on"></input>
            </form>
        </div>
    )
}

export default SignNormalInput;