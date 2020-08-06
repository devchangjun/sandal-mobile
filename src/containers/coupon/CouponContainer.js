import React from 'react';
import { Paths } from 'paths';
import stlyes from './Coupon.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import Title from 'components/titlebar/Title';
import TabMenu from 'components/tab/TabMenu';
import CouponItemList from 'components/coupon/CouponItemList';
import UseCouponItemList from 'components/coupon/UseCouponItemList';
import BottomNav from 'components/tab/BottomNav';

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
                {tab === 'mycoupon' &&
                    <CouponItemList check= {false} />}
                {tab === 'download_cp' &&
                    <CouponItemList check={true}/>}
                {tab === 'list_use' &&
                    <UseCouponItemList/>
                }
            </div>
            <BottomNav/>
        </>
    )
}

export default CouponConatiner;