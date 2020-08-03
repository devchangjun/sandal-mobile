import React from 'react';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import styles from './Account.module.scss';

const AccountContainer = () => {
    return (
        <>
            <Header/>
            <Title mainTitle={"내 정보 관리"} subTitle={"내 정보 관리"} location={"동아대"} />
            <div className={styles['main']}>

                <table border="1">
                    <tr>
                        <td>이름</td>
                        <td className={styles['item']}><SignNormalInput /></td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>test@email</td>
                    </tr>
                    <tr>
                        <td rowSpan="6">비밀번호</td>
                        <td><button>변경하기</button></td>
                    </tr>
                    <tr>
                        <td>변경할 비밀번호</td>
                    </tr>
                    <tr>
                        <td className={styles['item']}><SignNormalInput /></td>
                    </tr>
                    <tr>
                        <td className={styles['item']}><SignNormalInput /></td>
                    </tr>
                    <tr>
                        <td>비밀번호 일치</td>
                    </tr>
                    <tr>
                        <td><button>취소</button> <button>확인</button></td>
                    </tr>

                    <tr>
                        <td rowSpan="5">휴대폰 번호</td>
                        <td>010-1234-1234<button>변경하기</button></td>
                    </tr>
                    <tr>
                        <td>휴대폰 번호</td>
                    </tr>
                    <tr>
                        <td className={styles['item']}><SignAuthInput buttonTitle={"인증번호전송"} /></td>
                    </tr>
                    <tr>
                        <td className={styles['item']}><SignAuthInput buttonTitle={"인증하기"} /></td>
                    </tr>
                    <tr>
                        <td><button>취소</button> <button>확인</button></td>
                    </tr>
                    <tr>
                        <td rowSpan="2">알림 설정</td>
                        <td>SMS, 이메일을 통해 할인/이벤트/쿠폰 정보를 받아보실 수 있습니다.</td>
                    </tr>
                    <tr>
                        <td><input type="radio"></input>SMS</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default AccountContainer;