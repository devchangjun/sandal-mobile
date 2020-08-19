import React from 'react';
import styles from './SignComplete.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);



const SignComplete =({mainTitle,subTitle,text , onBorder})=>{
    
    /*
        아이디 찾기, 비밀번호 찾기, 등 로그인에 쓰여질 박스 컴포넌트
    */
    return(
            <CompleteBox mainTitle={mainTitle} subTitle={subTitle} text={text} onBorder={onBorder}/>
    )
}

function CompleteBox({mainTitle,subTitle,text,onBorder}) {
    return (
        <div className={cx('item-box',{line : onBorder})} >
            <MainTitle mainTitle={mainTitle}></MainTitle>
            <SubTitle subTitle={subTitle}></SubTitle>
            <Text text={text}></Text>
        </div>
    )
}

function MainTitle({mainTitle}) {
    return (
        <div className={styles['main-title']}>
            {mainTitle}
        </div>
    )
}
function SubTitle({subTitle}) {
    return (
        <div className={styles['sub-title']}>
            {subTitle}
        </div>
    )
}
function Text ({text}){
    return(
        <div className={styles['text']}>
            {text}
        </div>
    )
}

export default SignComplete;
