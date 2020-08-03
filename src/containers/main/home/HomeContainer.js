import React from 'react';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import styles from './HomeContainer.module.scss';
import Header from 'components/header/Header';
import MenuItemList from 'components/item/MenuItemList';
import TempleteItmeList from 'components/item/TempleteItemList';
import OrderButton from 'components/button/OrderButton';
import HomeSlick from './HomeSlick';
import MenuListView from 'components/item/MenuListView';
import { useSelector } from 'react-redux';


const HomeContainer = () => {

    const history = useHistory();
    const {user} = useSelector(state=>state.auth);

    const goToReverve = () => {
        history.push(`${Paths.ajoonamu.reserve}/custom`);
    }
    return (
        <>
            <Header />
            <div className={styles['carousel']}>
                <HomeSlick />
            </div>
            <div className={styles['home']}>
                <Banner title={"건강 단체 도시락/베이커리 아주나무"}subtitle={"건강한 단체 도시락/베이커리로 모두 fresh하게! "}/>
                <div className={styles['menu-list']}>
                    <MenuListView />
                </div>
                <Banner title={"퀵 배달과 택배 배송 모두가능!"} subtitle={"익일 배달서비스와 베이커리 택배 배송 서비스를 골라서 활용해보세요. "}/>
                <div className={styles['order']}>
                    <div className={styles['order-btn']} onClick={goToReverve}>
                        <OrderButton title={"예약주문"} />
                    </div>
                    <div className={styles['order-btn']} onClick={goToReverve}>
                        <OrderButton title={"배달주문"} />
                    </div>
                </div>
                <Banner
                    title={"간편하게 메뉴 추천 받아보기"}
                    subtitle={"예산은 정해져있고 단체 주문은 내가 맡아야 하고 어떤 메뉴를 골라야 할지 고민이시라구요? "}
                    text={"고민하지 마시고! 간단하게 정해진 예산과 희망 수량을 입력하시고 최적의 메뉴를 추천 받아보세요!"}
                />

                <Banner title={"도시락 무료 문구서비스 제공"} subtitle={"원하는 템플릿을 골라 정성과 마음을 전하세요. "}
                />
                <div className={styles['menu-list']}>
                <TempleteItmeList />
                </div>
            </div>
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