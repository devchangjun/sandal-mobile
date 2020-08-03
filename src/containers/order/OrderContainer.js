import React from 'react';
import styles from './Order.module.scss';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import SignAuthInput from 'components/sign/SignAuthInput';
import SignNormalInput from 'components/sign/SignNormalInput';
import DatePicker from 'components/asset/DatePicker';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const OrderContainer = () => {
    //모달창 상태
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [open, setOpen] = React.useState(false);


    //맞춤 주문 설정하기 버튼 클릭
    const onClickCustomOrder = () => {
        setOpen(true);
    }

    // 모달창 닫기
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Header />
            <Title mainTitle={"장바구니>주문하기"} subTitle={"주문하기"} />
            <div className={styles['order']}>
                <div className={styles['pd-box']}>

                    <div className={styles['title']}>
                        배달정보
                </div>
                    <div className={styles['table']}>
                        <div className={styles['text-info']}>
                            <div className={styles['text']}>
                                기본주소
                        </div>
                            <div className={styles['info']}>
                                서울시 구로구
                       </div>
                        </div>
                        <div className={styles['text-info']}>
                            <div className={styles['text']}>
                                상세주소
                        </div>
                            <div className={styles['info']}>
                                <SignNormalInput />
                            </div>
                        </div>
                        <div className={styles['text-info']}>
                            <div className={styles['text']}>
                                휴대폰 번호
                        </div>
                            <div className={styles['info']}>
                                <SignAuthInput buttonTitle={"인증번호 발송"} />
                            </div>
                        </div>
                        <div className={styles['text-info']}>
                            <div className={styles['text']}>

                            </div>
                            <div className={styles['info']}>
                                <SignAuthInput buttonTitle={"인증번호 하기"} />

                            </div>
                        </div>
                    </div>
                    <div className={styles['title']}>
                        배달요청 시간
                    <div className={styles['table']}>
                            <div className={styles['date-picker']}>
                                <DatePicker />
                            </div>
                        </div>
                    </div>
                    <div className={styles['title']}>
                        요청사항
                    <div className={styles['table']}>
                            <div className={styles['memo-save']}>
                                <div className={styles['memo-title']}>
                                    주문 요청사항
                            </div>
                                <div className={styles['save']}>
                                    <label><input type="checkbox"></input> 자동저장</label>
                                </div>
                            </div>
                            <div className={styles['memo']}>
                                <input></input>
                            </div>
                            <div className={styles['memo-save']}>
                                <div className={styles['memo-title']}>
                                    배달 요청사항
                            </div>
                                <div className={styles['save']}>
                                    <label><input type="checkbox"></input> 자동저장</label>
                                </div>
                            </div>
                            <div className={styles['memo']}>
                                <input></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderContainer;