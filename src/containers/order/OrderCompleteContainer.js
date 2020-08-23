import React from 'react';
import styles from './OrderComplete.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import DetailOrderItem from 'components/order/DetailOrderItem';
import classNames from 'classnames/bind';
const cx =classNames.bind(styles);

const OrderCompleteContainer =()=>{
    return (
        <>
            <TitleBar title={'주문완료'} />
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <div className={styles['title']}>
                        주문이 완료되었습니다.
                    </div>
                    <div className={styles['order-number']}>주문번호 :1234</div>
                    <div className={styles['bank']}>
                        <div className={styles['bank-box']}>
                            <div className={styles['bank-name']}>입금은행</div>
                            <div className={styles['bank-value']}>
                                국민은행 12345-67-89000 아주나무
                            </div>
                        </div>
                        <div className={styles['bank-box']}>
                            <div className={styles['bank-name']}>가상계좌</div>
                            <div className={styles['bank-value']}>
                                유효기간 2020/06/09 00:00:00
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['order-list']}>
                    <div className={styles['title']}>주문상품</div>
                    <div className={styles['list']}>
                        <DetailOrderItem />
                        <DetailOrderItem />
                        <DetailOrderItem />
                    </div>
                    <div className={styles['title']}>배달 정보</div>
                    <div className={styles['list']}>
                        <UserInfo
                            value1={'김종완'}
                            value2={
                                '서울특별시 구로구 구로동 557, 삼성빌딩 407호'
                            }
                            value3={'010-8885-7406'}
                        />
                    </div>

                    <div className={styles['title']}>주문정보</div>
                    <div className={styles['list']}>
                        <UserInfo
                            value1={'김종완'}
                            value2={'010-8885-7406'}
                            value3={'1123@naver.com'}
                        />
                    </div>
                    <div className={styles['title']}>매장정보</div>
                    <div className={styles['list']}>
                        <UserInfo
                            value1={'아주나무 혜화점'}
                            value2={'서울특별시 구로구 구로동 557'}
                            value3={'02-454-8888'}
                        />
                    </div>
                    <div className={styles['title']}>결제정보</div>
                    <div className={styles['list']}>
                        <PaymentInfo text={'주문번호'} value={'001234567890'} />
                        <PaymentInfo text={'주문일시'} value={'2020-00-00 12:59:59'} />
                        <PaymentInfo text={'결제방식'} value={'가상계좌 입금'} />
                        <PaymentInfo text={'결제금액'} value={'101,000원'} />
                        <PaymentInfo text={'입금자명'} value={'김종완'} />
                        <PaymentInfo text={'입금계좌'} value={'국민은행 12345-67-89000 아주나무'} />
                        <PaymentInfo text={'가상계좌 유효기간'} value={'2020년 06월 09일 00:00:00'} />
                    </div>
                    <div className={styles['button-box']}>
                        <div className={styles['btn']}>
                                문구 서비스 신청
                        </div>
                        <div className={cx('btn',{on:true})}>
                                    완료
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function UserInfo({ value1, value2, value3 }) {
    return (
        <>
            <div className={styles['name']}>{value1}</div>
            <div className={styles['user-info']}>{value2}</div>
            <div className={styles['user-info']}>{value3}</div>
        </>
    );
}

function PaymentInfo ({text,value}){
    return(
        <div className={styles['payment-info']}>
        <div className={styles['info']}>
        {text}
        </div>
        <div className={styles['value']}>
        {value}
        </div>
    </div>
    )
}
export default OrderCompleteContainer;