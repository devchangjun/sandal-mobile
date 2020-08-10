import React from 'react';
import { Paths } from 'paths';
import styles from './Coupon.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import Title from 'components/titlebar/Title';
import TabMenu from 'components/tab/TabMenu';
import CouponItemList from 'components/coupon/CouponItemList';
import UseCouponItemList from 'components/coupon/UseCouponItemList';
import BottomNav from 'components/tab/BottomNav';
import SignAuthInput from 'components/sign/SignAuthInput';

const tabInit = [
    {
        url: `${Paths.ajoonamu.coupon}/mycoupon?`,
        name: '내쿠폰'
    },
    {
        url: `${Paths.ajoonamu.coupon}/download_cp`,
        name: '쿠폰받기'
    },
    {
        url: `${Paths.ajoonamu.coupon}/list_use`,
        name: '쿠폰사용내역'
    },
]


const CouponConatiner = ({ tab = 'mycoupon' }) => {
    return (
        <>
            <TitleBar title={"쿠폰함"} />
            <div className={styles['coupon-tab']}>
                <TabMenu tabs={tabInit} />
                <div className={styles['container']}>
                    {tab === 'mycoupon' &&
                        <>
                            <div>
                                쿠폰 코드 입력
                            </div>
                            <div>
                                <input className={styles['code-input']} type="text" placeholder={"쿠폰 코드를 입력하세요"} />
                                <div className={styles['submit-btn']}>쿠폰등록</div>
                            </div>
                            <div>
                                내 쿠폰
                           </div>
                            <CouponItemList check={false} />
                        </>}
                    {tab === 'download_cp' &&
                        <CouponItemList check={true} />}
                    {tab === 'list_use' &&
                        <UseCouponItemList />
                    }
                </div>
            </div>
            <BottomNav />
        </>
    )
}

export default CouponConatiner;