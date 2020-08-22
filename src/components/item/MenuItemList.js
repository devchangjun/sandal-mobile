import React from 'react';
import styles from './MenuItem.module.scss';
import MenuItem from './MenuItem';

const initMenu=[
    {
        id: 1,
        menu_name:"과일도시락1",
        menu_price:"3000",
    },
    {
        id: 2,
        menu_name:"과일도시락2",
        menu_price:"3000",
    }
]
const MenuItemList= ()=>{
    const list = initMenu.map(menu =>{
        return <MenuItem {...menu} key = {menu.id}/>
    })
    return (
        <div className={styles['menu-list']}>
               {list}
        </div>
    )
}

export default MenuItemList;