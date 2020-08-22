import React from 'react';
import styles from './BestMenu.module.scss';
import BestMenuItem from './BestMenuItem';

import MenuItemImage1 from '../svg/menu/menuitem1.png';
import MenuItemImage2 from '../svg/menu/menuitem2.png';
import MenuItemImage3 from '../svg/menu/menuitem3.png';
import MenuItemImage4 from '../svg/menu/menuitem4.png';
import MenuItemImage5 from '../svg/menu/menuitem5.png';
import MenuItemImage6 from '../svg/menu/menuitem6.png';

const initMenu = [
    {
        item_id: 1,
        title: "과일도시락1",
        text: "과일도시락 맛잇어",
        img: MenuItemImage1,
        price: "5000원"
    },
    {
        item_id: 2,
        title: "과일도시락2",
        text: "과일도시락 맛잇어",
        img:MenuItemImage2,
        price: "5000원"
    },
    {
        item_id: 3,
        title: "과일도시락3",
        text: "과일도시락 맛잇어",
        img : MenuItemImage3,
        price: "5000원"
    },    
    {
        item_id: 4,
        title: "과일도시락4",
        text: "과일도시락 맛잇어",
        img: MenuItemImage4,
        price: "5000원"
    },
    {
        item_id: 5,
        title: "과일도시락5",
        text: "과일도시락 맛잇어",
        img: MenuItemImage5,
        price: "5000원"
    },
    {
        item_id: 6,
        title: "과일도시락6",
        text: "과일도시락 맛잇어",
        img: MenuItemImage6,
        price: "5000원"
    }
]



const BestMenuItemList = () => {
    const menuList = initMenu.map(menu => (
        <BestMenuItem key={menu.item_id} menuTitle={menu.title} menuText={menu.text} menuPrice={menu.price} src ={menu.img}/>
    )
    )
    return (
        <div className={styles['menu-list']}>
            {menuList}
        </div>

    )
}

export default BestMenuItemList;