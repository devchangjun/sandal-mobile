import React, { useEffect,useCallback, useRef } from 'react';
import { Paths } from 'paths';
import styles from './Coupon.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import classNames from 'classnames/bind';
import TabMenu from 'components/tab/TabMenu';
import CouponItemList from 'components/coupon/CouponItemList';
import UseCouponItemList from 'components/coupon/UseCouponItemList';
import BottomNav from 'components/nav/BottomNav';

const cx = classNames.bind(styles);

const tabInit = [
    {
        url: `${Paths.ajoonamu.coupon}/mycoupon`,
        name: '내쿠폰',
    },
    {
        url: `${Paths.ajoonamu.coupon}/download_cp`,
        name: '쿠폰받기',

    },
    {
        url: `${Paths.ajoonamu.coupon}/list_use`,
        name: '쿠폰사용내역',

    },
]


const CouponConatiner = ({ tab = 'mycoupon' }) => {

    const my_coupon = useRef(null);

    const onScroll = useCallback(e => {

        if (tab === 'mycoupon') {

            const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);

            if (scrollTop > 250) {
                my_coupon.current.classList.add(cx('shadow'));
            }
            else {
                my_coupon.current.classList.remove(cx('shadow'));
            }
        }
    }, [tab]);

    useEffect(() => {

        console.log("탭 바뀜");
        console.log(tab);
        tab === 'mycoupon' && window.addEventListener('scroll', onScroll);

        return () => {
            console.log("언마운트");
            window.removeEventListener('scroll', onScroll);
        };

    }, [tab, onScroll]);




    return (
        <>
            <TitleBar title={"쿠폰함"} />
            <TabMenu tabs={tabInit} />
            <div className={styles['coupon-tab']}>
                <div className={styles['container']}>
                    {tab === 'mycoupon' &&
                        <>
                            <div className={cx('coupon-title', 'pd-box')}>
                                쿠폰 코드 입력
                            </div>
                            <div className={cx('coupon-form', 'pd-box')}>
                                <input className={styles['code-input']} type="text" placeholder={"쿠폰 코드를 입력하세요"} />
                                <div className={styles['submit-btn']}>쿠폰등록</div>
                            </div>
                            <div className={cx('sticky-title', 'pd-box')} ref={my_coupon}>
                                내 쿠폰
                           </div>
                            <div className={cx('coupon-list', 'pd-box')}>
                                <CouponItemList check={false} />
                            </div>
                        </>}
                    {tab === 'download_cp' &&
                        <div className={cx('coupon-list', 'pd-box')}>
                            <CouponItemList check={true} />
                        </div>
                    }
                    {tab === 'list_use' &&
                        <div className={cx('coupon-list', 'pd-box')}>
                            <UseCouponItemList />
                        </div>
                    }
                </div>
            </div>
            <BottomNav />
        </>
    )
}

export default CouponConatiner;