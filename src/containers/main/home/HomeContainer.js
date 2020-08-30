import React from 'react';
import { Paths } from 'paths';
import Title from 'components/titlebar/Title';
import styles from './HomeContainer.module.scss';
import BestMenuItemList from 'components/item/BestMenuItemList';
import HomeSlick from './HomeSlick';
import TabMenu from 'components/tab/TabMenu';
import BannerImg from 'components/svg/banner/subBanner1.png';
// import { useSelector } from 'react-redux';
import BottomNav from 'components/nav/BottomNav';

const tabInit = [
    {
        url: `${Paths.ajoonamu.shop}?menu=0`,
        name: '예약주문'
    },
    {
        url: `${Paths.ajoonamu.shop}?menu=1`,
        name: '택배주문'
    },
]


const HomeContainer = () => {

    return (
        <>
            <Title/>
            <TabMenu tabs={tabInit} index={0}/>
            <div className={styles['carousel']}>
                <HomeSlick />
            </div>
            <div className={styles['container']}>
                <Banner title={"건강 단체 도시락/베이커리 아주나무"}subtitle={"건강한 단체 도시락/베이커리로 모두 fresh하게! "}/>
                <div className={styles['menu-list']}>
                <h3 className={styles["menu-list-title"]}>베스트 메뉴</h3>
                    <BestMenuItemList />
                </div>
            </div>
            <BottomNav></BottomNav>
        </>
    )
}

function Banner() {
    return (
        <div className={styles['banner']}>
            <img src={BannerImg} alt="subBanner" />
        </div>
    )
}

export default HomeContainer;