import React from 'react';
import styles from './Order.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import Button from 'components/button/Button';
import PointModal from 'components/asset/PointModal';
import CouponModal from 'components/asset/CouponModal';
import classNames from 'classnames/bind';
import produce from 'immer';

const cx = classNames.bind(styles);

const cp_init=[
    {
        cp_id :1,
        event_name:"첫 주문 3,000원 할인 쿠폰",
        sale :"3000원",
        sub_name:"첫주문시 사용",
        date:"2020-05-10 ~ 2020-06-10 까지",
        select : false,
    },

    {
        cp_id :2,
        event_name:"첫 주문 3,000원 할인 쿠폰",
        sale :"4000원",
        sub_name:"첫 주문시 사용",
        date:"2020-05-10 ~ 2020-06-10 까지",
        select : false,
    },
    
    {
        cp_id :3,
        event_name:"첫 주문 3,000원 할인 쿠폰",
        sale :"4000원",
        sub_name:"첫 주문시 사용",
        date:"2020-05-10 ~ 2020-06-10 까지",
        select : false,
    },
    {
        cp_id :4,
        event_name:"첫 주문 3,000원 할인 쿠폰",
        sale :"4000원",
        sub_name:"첫 주문시 사용",
        date:"2020-05-10 ~ 2020-06-10 까지",
        select : false,
    },
    {
        cp_id :5,
        event_name:"첫 주문 3,000원 할인 쿠폰",
        sale :"4000원",
        sub_name:"첫 주문시 사용",
        date:"2020-05-10 ~ 2020-06-10 까지",
        select : false,
    }
]




const OrderContainer = () => {


//    포인트모달, 결제방식 모달 때 사용할 것.
    
    const [pointOpen, setPointOpen] = React.useState(false);
    const onClickPointOpen = () => setPointOpen(true);
    const onClickPointClose = () => setPointOpen(false);
    const [couponOpen, setCouponOpen] = React.useState(false);
    const onClickCouponOpen =()=>setCouponOpen(true);
    const onClickCouponClose =()=>setCouponOpen(false);
    const [couponList ,setCouponList] = React.useState(cp_init);

    
    const onClickSelectCoupon =(data)=>{

        const index = couponList.findIndex(c=>c.cp_id ===data);
        console.log(index);

        setCouponList(
            produce(couponList, draft => {
                draft[index].select = !draft[index].select;
            })
        );
    }


    return (
        <>
            <TitleBar title={"주문하기"} />
            <div className={styles['order']}>
                <div className={cx('title', 'mg-top', 'pd-box')}>
                    배달정보
                     </div>
                <div className={styles['table']}>
                    <div className={cx('text-info', 'pd-box')}>
                        <div className={styles['info']}>
                            서울특별시 구로구 구로동 557
                       </div>
                    </div>
                    <div className={cx('text-info', 'pd-box')}>
                        <div className={styles['info']}>
                            <input type="text" className={cx('input', 'normal')} />
                        </div>
                    </div>
                    <div className={cx('text-info', 'mg-top', 'pd-box')}>
                        <div className={cx('info', 'row')}>
                            <input type="text" placeholder="핸드폰번호" className={cx('input', 'auth')} />
                            <div className={styles['auth-btn']}>인증번호 발송</div>
                        </div>
                    </div>
                    <div className={cx('text-info', 'mg-top', 'pd-box')}>
                        <div className={cx('info', 'row')}>
                            <input type="text" placeholder="인증번호" className={cx('input', 'auth')} />
                            <div className={styles['auth-btn']}>인증하기</div>
                        </div>
                    </div>
                </div>

                <div className={cx('title', 'pd-box')}>
                    요청사항
                        </div>
                <div className={cx('table', 'pd-box')}>
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
                </div>
                <div className={cx('title', 'pd-box')}>
                    결제방법
                </div>
                <div className={cx('table')}>
                    <div className={cx('value','pd-box')}>
                             <div className={styles['payment']}>
                            만나서 직접 결제
                            </div>
                            <div className={styles['label']}>
                            다른결제를 원하시면 눌러서 변경해주세요.
                            </div>
                       </div>
                    <div className={styles['order-info']}>
                        <div className={cx('box','pd-box')} onClick={onClickCouponOpen}>
                            <div className={styles['label']}>
                                할인 쿠폰
                                </div>
                            <div className={styles['info']}>
                                1개보유
                                </div>
                            </div>
                        <div className={cx('box','pd-box')} onClick={onClickPointOpen}>
                            <div className={styles['label']}>
                                포인트 사용
                                </div>
                            <div className={styles['info']}>
                                1000원
                                </div>
                        </div>
                    </div>
                </div>
                <div className={cx('table', 'pd-box','bg-color','pd-top')}>
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
                                            배달비용
                                                </div>
                                        <div className={cx('cost')}>
                                            50000원
                                                 </div>
                                    </div>
                                </div>
                                <div className={cx('text-cost', 'info')}>
                                    <div className={cx('pd-in', 'text-cost')}>
                                        <div className={cx('text')}>
                                            쿠폰 할인
                                               </div>
                                        <div className={cx('cost')}>
                                            50000원
                                              </div>
                                    </div>
                                </div>
                                <div className={cx('text-cost', 'info')}>
                                    <div className={cx('pd-in', 'text-cost')}>
                                        <div className={cx('text')}>
                                            포인트 할인
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
            <Button title={"10000원 결제"} />
            <PointModal
                open={pointOpen}
                handleClose={onClickPointClose}
            />
            <CouponModal
                open={couponOpen}
                handleClose={onClickCouponClose}
                onClick={onClickSelectCoupon}
                list ={couponList}
                />
        </>
    )
}

export default OrderContainer;