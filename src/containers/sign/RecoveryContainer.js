import React, { useState } from 'react';
import styles from './Sign.module.scss';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import TitleBar from 'components/titlebar/TitleBar';
import SignComplete from 'components/sign/SignComplete';

const logo = "http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png";

const RecoveryContainer = () => {

    const history = useHistory();

    const onClickIdLink = () => {
        history.push(Paths.ajoonamu.recovery_id);
    }
    const onClickPwLink = () => {
        history.push(Paths.ajoonamu.recovery_pw);
    }

    return (
        <>
            <TitleBar title="아이디/비밀번호 찾기" src={logo} alt="아이디/비밀번호 찾기"></TitleBar>
            <div className="sign-main">
                <div className="sign-content">
                    <div className={styles['recovery-box']}>
                        <div className={styles.linkitem} onClick={onClickIdLink}>
                            <SignComplete className={styles.linkitem} mainTitle={"아이디찾기"} text={"인증을 통해 아이디 찾기"} />
                        </div>
                        <div className={styles.linkitem} onClick={onClickPwLink}>
                            <SignComplete className={styles.linkitem} mainTitle={"비밀번호 찾기"} text={"인증을 통해 아이디 찾기"} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}


export default RecoveryContainer;