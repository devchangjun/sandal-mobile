import React from 'react';
import styles from './Recovery.module.scss';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import TitleBar from 'components/titlebar/TitleBar';
import classNames from 'classnames/bind';
import SignComplete from 'components/sign/SignComplete';

const cx= classNames.bind(styles);

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
            <div className={cx('container')}>
                <div className={cx('content','pd-box')}>
                    <div className={styles['box']}>
                            <SignComplete  mainTitle={"아이디찾기"} text={"휴대폰 인증을 통해 아이디를 찾습니다."} onBorder={true} onClick={onClickIdLink}/>
                            <SignComplete mainTitle={"비밀번호 찾기"} text={"자신의 아이디와 휴대폰 인증을 통해 비밀번호를 찾습니다."} onBorder={true} onClick={onClickPwLink}/>
                    </div>
                </div>

            </div>
        </>
    )
}


export default RecoveryContainer;