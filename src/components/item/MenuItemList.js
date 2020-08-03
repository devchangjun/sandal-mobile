import React from 'react';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import TempleteItem from './TempleteItem';
import logo from 'logo.svg';

const initMenu = [
    {
        item_id: 1,
        title: "김치1",
        text: "김치 맛잇어",
        img: "http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg",
        price: "5000원"
    },
    {
        item_id: 2,
        title: "김치2",
        text: "김치 맛잇어",
        img:"https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg",
        price: "5000원"
    },
    {
        item_id: 3,
        title: "김치3",
        text: "김치 맛잇어",
        img : "http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb",
        price: "5000원"
    },    
    {
        id: 4,
        title: "김치4",
        text: "김치 맛잇어",
        img: "https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg",
        price: "5000원"
    },    {
        id: 5,
        title: "김치5",
        img: "http://aeriskitchen.com/wp-content/uploads/2020/06/Seafood_Tteokbokki_01-1-1.jpg",
        text: "김치 맛잇어",
        price: "5000원"
    },    {
        id: 6,
        title: "김치6",
        text: "김치 맛잇어",
        img:"http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg",
        price: "5000원"
    },
    {
        id: 7,
        title: "김치7",
        text: "김치 맛잇어",
        img:"http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg",
        price: "5000원"
    },
    {
        id: 8,
        title: "김치8",
        text: "김치 맛잇어",
        img:"http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg",
        price: "5000원"
    },
    {
        id: 9,
        title: "김치19",
        text: "김치 맛잇어",
        img:"http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg",
        price: "5000원"
    },

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