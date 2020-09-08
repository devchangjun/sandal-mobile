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
        text: "아주나무",
        img: MenuItemImage1,
        price: "5000원"
    },
    {
        item_id: 2,
        title: "과일도시락2",
        text: "아주나무",
        img:MenuItemImage2,
        price: "5000원"
    },
    {
        item_id: 3,
        title: "과일도시락3",
        text: "아주나무",
        img : MenuItemImage3,
        price: "5000원"
    },    
    {
        item_id: 4,
        title: "과일도시락4",
        text: "아주나무",
        img: MenuItemImage4,
        price: "5000원"
    },
    {
        item_id: 5,
        title: "과일도시락5",
        text: "아주나무",
        img: MenuItemImage5,
        price: "5000원"
    },
    {
        item_id: 6,
        title: "과일도시락6",
        text: "아주나무",
        img: MenuItemImage6,
        price: "5000원"
    }
]



const BestMenuItemList = ({menuList}) => {
    console.log(menuList);
    const list = menuList.map(menu => (
        <BestMenuItem 
        ca_id ={menu.ca_id}
        created_at ={menu.created_at}
        deleted={menu.deleted}
        item_id={menu.item_id}
        item_img={menu.item_img}
        item_name={menu.item_name}
        item_order={menu.item_order}
        item_prefer={menu.item_prefer}
        item_price={menu.item_price}
        item_sales={menu.item_sales}
        item_sub={menu.item_sub}
        item_taxmny={menu.item_taxmny}
        item_vatmny={menu.item_vatmny}
        updated_at={menu.updated_at}
        key={menu.item_id}/>
    )
    )
    return (
        <div className={styles['menu-list']}>
            {list}
        </div>

    )
}

export default BestMenuItemList;