import React from 'react';
import TitleBar from 'components/titlebar/TitleBar';
import styles from './UpdateInfo.module.scss';
import SignAuthInput from 'components/sign/SignAuthInput';
import Button from 'components/button/Button';
import CloseButton from 'components/svg/account/Close';

const UpdatePhoneContainer=()=>{
    return(
            <>
        <TitleBar title={"연락처 수정"}/>
        <div className={styles['container']}>
              <div className={styles['context']}>
                  <div className={styles['input']}>
                  <SignAuthInput buttonTitle={"인증번호 발송"} placeholder={"핸드폰 번호"}/>
                  </div>
              </div>
        </div>

      <Button title={"확인"}/>
      </>
    )
}

export default UpdatePhoneContainer;