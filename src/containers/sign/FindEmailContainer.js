import React from 'react';
import {Paths} from 'paths';
import {useHistory} from 'react-router-dom';
import styles from './Find.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import { ButtonBase } from '@material-ui/core';

const FindEmailContainer =({email})=>{
    const history = useHistory();

    const onClickLogin =()=>{
        history.push(Paths.ajoonamu.signin);
    }
    const onClickFindPw= ()=>{
        history.push(Paths.ajoonamu.recovery_pw);
    }
    return(
        <>
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['text']}>
                고객님의 정보와 일치하는 아이디 입니다.
                </div>
                <div className={styles['user']}>
                     {email}
                </div>
            </div>
            <div className={styles['btn-box']}>
                <ButtonBase className={styles['btn']} onClick={onClickLogin}>
                        로그인
                </ButtonBase>
                <ButtonBase className={styles['btn']} onClick={onClickFindPw}>
                        비밀번호찾기
                </ButtonBase>
            </div>
        </div>
        </>
    )
}
export default FindEmailContainer;