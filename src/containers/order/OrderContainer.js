import React from 'react';
import styles from './Order.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import Button from 'components/button/Button';
import SignAuthInput from 'components/sign/SignAuthInput';
import SignNormalInput from 'components/sign/SignNormalInput';
import DatePicker from 'components/asset/DatePicker';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


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
            <TitleBar title={"주문하기"} />
            <div className={styles['order']}>
                <div className={styles['pd-box']}>
                    <div className={styles['title']}>
                        배달정보
                     </div>
                    <div className={styles['table']}>
                        <div className={styles['text-info']}>
                            <div className={styles['info']}>
                                서울특별시 구로구 구로동 557
                       </div>
                        </div>
                        <div className={styles['text-info']}>
                            <div className={styles['info']}>
                                <input type="text" className={cx('input', 'normal')} />
                            </div>
                        </div>
                        <div className={cx('text-info', 'mg-top')}>
                            <div className={cx('info', 'row')}>
                                <input type="text" placeholder="핸드폰번호" className={cx('input', 'auth')} />
                                <div className={styles['auth-btn']}>인증번호 발송</div>
                            </div>
                        </div>
                        <div className={cx('text-info', 'mg-top')}>
                            <div className={cx('info', 'row')}>
                                <input type="text" placeholder="인증번호" className={cx('input', 'auth')} />
                                <div className={styles['auth-btn']}>인증하기</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['title']}>
                        요청사항
                        </div>
                    <div className={styles['table']}>
                        <div className={styles['input-save']}>
                            <div className={styles['input-title']}>
                                주문 요청사항
                            </div>
                            <div className={styles['save']}>
                                <input type="checkbox"></input> 자동저장
                            </div>
                        </div>
                        <div className={styles['value']}>
                            <input className={styles['input']}></input>
                        </div>
                        <div className={styles['input-save']}>
                            <div className={styles['input-title']}>
                                배달 요청사항
                            </div>
                            <div className={styles['save']}>
                                <input type="checkbox"></input> 자동저장
                            </div>
                        </div>
                        <div className={styles['value']}>
                            <input className={styles['input']}></input>
                        </div>
                        <div className={styles['input-save']}>
                            <div className={styles['input-title']}>
                                결제 방법
                            </div>
                            <div className={styles['save']}>
                            </div>
                        </div>
                        <div className={styles['value']}>
                            <input className={styles['input']}></input>
                        </div>
                        <div className={styles['order-info']}>
                            <div className={styles['box']}>
                                <div className={styles['label']}>
                                    할인 쿠폰
                                </div>
                                <div className={styles['info']}>
                                    1개보유
                                </div>
                            </div>
                            <div className={styles['box']}>
                                <div className={styles['label']}>
                                    포인트 사용
                                </div>
                                <div className={styles['info']}>
                                    1000원
                                </div>
                            </div>
                            <div className={cx('total-order')}>
                                <div className={cx('item')}>
                                    <div className={cx('text-cost', 'title')}>
                                        <div className={cx('pd-box', 'text-cost')}>
                                            <div className={cx('text')}>
                                                총 결제금액
                                        </div>
                                            <div className={cx('cost')}>
                                                50000원
                                        </div>
                                        </div>
                                    </div>
                                    <div className={styles['total-table']}>

                                        <div className={cx('text-cost', 'info')}>
                                            <div className={cx('pd-in', 'text-cost')}>
                                                <div className={cx('text')}>
                                                    주문 금액
                                        </div>
                                                <div className={cx('cost')}>
                                                    50000원
                                        </div>
                                            </div>
                                        </div>
                                        <div className={cx('text-cost', 'info')}>
                                            <div className={cx('pd-in', 'text-cost')}>
                                                <div className={cx('text')}>
                                                    주문 금액
                                        </div>
                                                <div className={cx('cost')}>
                                                    50000원
                                        </div>
                                            </div>
                                        </div>
                                        <div className={cx('text-cost', 'info')}>
                                            <div className={cx('pd-in', 'text-cost')}>
                                                <div className={cx('text')}>
                                                    주문 금액
                                        </div>
                                                <div className={cx('cost')}>
                                                    50000원
                                        </div>
                                            </div>
                                        </div>
                                        <div className={cx('text-cost', 'info')}>
                                            <div className={cx('pd-in', 'text-cost')}>
                                                <div className={cx('text')}>
                                                    주문 금액
                                        </div>
                                                <div className={cx('cost')}>
                                                    50000원
                                        </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>

                            <div className={cx('box', 'bt-mg')}>
                                <div className={cx('label')}>
                                    <input type="checkbox" /> 구매에 동의하시겠습니까?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button title={"10000원 결제"} />
        </>
    )
}

export default OrderContainer;