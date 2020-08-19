import React from 'react';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import styles from './HomeContainer.module.scss';
import Header from 'components/header/Header';
import MenuItemList from 'components/item/MenuItemList';
import TempleteItmeList from 'components/item/TempleteItemList';
import OrderButton from 'components/button/OrderButton';
import Title from 'components/titlebar/Title';
import HomeSlick from './HomeSlick';
import TabMenu from 'components/tab/TabMenu';
import MenuListView from 'components/item/MenuListView';
import { useSelector } from 'react-redux';
import BottomNav from 'components/nav/BottomNav';

const tabInit = [
    {
        url: `${Paths.ajoonamu.shop}/custom?`,
        name: '예약주문'
    },
    {
        url: `${Paths.ajoonamu.shop}/menu1`,
        name: '택배주문'
    },
]



const HomeContainer = () => {

    const history = useHistory();
    const {user} = useSelector(state=>state.auth);

    const goToReverve = () => {
        history.push(`${Paths.ajoonamu.reserve}/custom`);
    }
    return (
        <>
            <Header />
            <TabMenu tabs={tabInit}/>
            <div className={styles['carousel']}>
                <HomeSlick />
            </div>
            <div className={styles['container']}>
                <Banner title={"건강 단체 도시락/베이커리 아주나무"}subtitle={"건강한 단체 도시락/베이커리로 모두 fresh하게! "}/>
                <div className={styles['menu-list']}>
                    <MenuItemList />
                </div>
            </div>
            <BottomNav></BottomNav>
        </>
    )
}

function Banner({ title, subtitle, text }) {
    return (
        <div className={styles['banner']}>
            <div className={styles['title']}>
                {title}
            </div>
            <div className={styles['sub-title']}>
                {subtitle}
            </div>
            <div className={styles['text']}>
                {text}
            </div>
        </div>
    )
}

export default HomeContainer;