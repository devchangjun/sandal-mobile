import React from 'react';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';


const initMenu = [
    {
        item_id: 1,
        title: "과일도시락1",
        text: "과일도시락 맛잇어",
        img: "http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg",
        price: "5000원"
    },
    {
        item_id: 2,
        title: "과일도시락2",
        text: "과일도시락 맛잇어",
        img:"https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg",
        price: "5000원"
    },
    {
        item_id: 3,
        title: "과일도시락3",
        text: "과일도시락 맛잇어",
        img : "http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb",
        price: "5000원"
    },    
    {
        item_id: 4,
        title: "과일도시락4",
        text: "과일도시락 맛잇어",
        img: "https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg",
        price: "5000원"
    }
]



const MenuItemList = () => {
    const menuList = initMenu.map(menu => (
        <MenuItem key={menu.item_id} menuTitle={menu.title} menuText={menu.text} menuPrice={menu.price} src ={menu.img}/>
    )
    )
    return (
        <div className={styles['menu-list']}>
            {menuList}
        </div>

    )
}

export default MenuItemList;