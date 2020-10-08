import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom' 
import { Paths } from 'paths';
import Title from 'components/titlebar/Title';
import styles from './HomeContainer.module.scss';
import BestMenuItemList from 'components/item/BestMenuItemList';
import HomeSlick from './HomeSlick';
import TabMenu from 'components/tab/TabMenu';
import BannerImg from 'components/svg/banner/subBanner1.png';
import Loading from 'components/asset/Loading';
import { getMainMenuList } from '../../../api/menu/menu';

const tabInit = [
    {
        url: `${Paths.ajoonamu.shop}?menu=0`,
        name: '예약주문',
    },
    {
        url: '/',
        // url: `${Paths.ajoonamu.shop}?menu=1`,
        name: '기업조식',
    },
];

const HomeContainer = () => {
    const [loading, setLoading] = useState(false);
    const [menuList, setMenuList] = useState([]);

    const history = useHistory();

    const getMainMenu = async () => {
        setLoading(true);
        try {
            const res = await getMainMenuList();
            const list = res.data.query.items;
            setMenuList(list);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        getMainMenu();
    }, []);

    return (
        <>
            <Title />
            <TabMenu tabs={tabInit} index={0} isPush={true} />
            <div className={styles['container']}>
                <div className={styles['carousel']}>
                    <HomeSlick />
                </div>
                <div className={styles['banner']}
                    onClick={() => {
                        history.push(`${Paths.ajoonamu.shop}?tab=${0}`);
                        window.scrollTo(0, 0);
                    }}>
                    <img src={BannerImg} alt="subBanner" />
                </div>
                <div className={styles['menu-list']}>
                    <h3 className={styles['menu-list-title']}>베스트 메뉴</h3>
                    {loading ? (
                        <Loading open={loading} />
                    ) : (
                        <>
                            {menuList.length !== 0 && (
                                <BestMenuItemList menuList={menuList} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default HomeContainer;
