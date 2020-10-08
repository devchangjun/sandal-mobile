import React,{useState,useEffect,useCallback} from 'react';
import { Paths } from 'paths';
import Title from 'components/titlebar/Title';
import styles from './HomeContainer.module.scss';
import BestMenuItemList from 'components/item/BestMenuItemList';
import HomeSlick from './HomeSlick';
import TabMenu from 'components/tab/TabMenu';
import BannerImg from 'components/svg/banner/subBanner1.png';
import BottomNav from 'components/nav/BottomNav';
import Loading from 'components/asset/Loading';
import {getMainMenuList} from '../../../api/menu/menu';

const tabInit = [
    {
        url: `${Paths.ajoonamu.shop}?menu=0`,
        name: '예약주문'
    },
    {
        url :'/',
        // url: `${Paths.ajoonamu.shop}?menu=1`,
        name: '기업조식'
    },
]


const HomeContainer = () => {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error , setError] = useState(false);
    const [menuList, setMenuList] = useState([]);


    const getMainMenu = async () => {
        setLoading(true);
        try{
            const res = await getMainMenuList();
            console.log(res);
            const list = res.data.query.items;
            setMenuList(list);
            setSuccess(true);
        }
        catch(e){
            console.error(e);
            setError(true);

        }
        setLoading(false);
    }

    useEffect(()=>{
        getMainMenu();
    },[])

    
    return (
        <>
            <Title/>
            <TabMenu tabs={tabInit} index={0} isPush={true}/>
            <div className={styles['container']}>
                <div className={styles['carousel']}>
                    <HomeSlick />
                </div>
                <Banner title={"건강 단체 도시락/베이커리 아주나무"}subtitle={"건강한 단체 도시락/베이커리로 모두 fresh하게! "}/>
                <div className={styles['menu-list']}>
                <h3 className={styles["menu-list-title"]}>베스트 메뉴</h3>
                {loading ? <Loading open={loading}/> :
                    <>
                        {menuList.length!==0 &&   <BestMenuItemList menuList={menuList}/>}
                    
                    </>
                }
                </div>
            </div>
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