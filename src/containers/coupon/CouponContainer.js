import React from 'react';
import { Paths } from 'paths';
import stlyes from './Coupon.module.scss';
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
            <Title/>
            <div className={stlyes['coupon-tab']}>
                <TabMenu tabs={tabInit} />
                <div className={stlyes['container']}>
                {tab === 'mycoupon' &&
                    <>
                    <div>
                        쿠폰 코드 입력
                    </div>
                    <SignAuthInput placeholder={"쿠폰 코드를 입력하세요"} buttonTitle={"쿠폰등록"}/>
                    <div>
                        내 쿠폰
                    </div>
                    <CouponItemList check= {false} />
                    </>}
                {tab === 'download_cp' &&
                    <CouponItemList check={true}/>}
                {tab === 'list_use' &&
                    <UseCouponItemList/>
                }
                </div>
            </div>
            <BottomNav/>
        </>
    )
}

export default CouponConatiner;