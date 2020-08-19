import React from "react";
import styles from './MenuList.module.scss';
import Slider from "react-slick";
import MenuItem from "./MenuItem";


const initMenu = [
    {
        id: 1,
        title: "김치1",
        text: "김치 맛잇어",
        img: "http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg",
        price: "5000원"
    },
    {
        id: 2,
        title: "김치2",
        text: "김치 맛잇어",
        img: "https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg",
        price: "5000원"
    },
    {
        id: 3,
        title: "김치3",
        text: "김치 맛잇어",
        img: "http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb",
        price: "5000원"
    }, {
        id: 4,
        title: "김치4",
        text: "김치 맛잇어",
        img: "https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg",
        price: "5000원"
    }, {
        id: 5,
        title: "김치5",
        img: "http://aeriskitchen.com/wp-content/uploads/2020/06/Seafood_Tteokbokki_01-1-1.jpg",
        text: "김치 맛잇어",
        price: "5000원"
    }, {
        id: 6,
        title: "김치6",
        text: "김치 맛잇어",
        img: "http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg",
        price: "5000원"
    },
    {
        id: 7,
        title: "김치7",
        text: "김치 맛잇어",
        img: "http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg",
        price: "5000원"
    },
    {
        id: 8,
        title: "김치8",
        text: "김치 맛잇어",
        img: "http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg",
        price: "5000원"
    },
    {
        id: 9,
        title: "김치9",
        text: "김치 맛잇어",
        img: "http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg",
        price: "5000원"
    },

]




// 슬릭추가 
const MeunListView = () => {

    /*
        슬릭 추가시 <slider>가 태그를 생성시킴
        그래서 따로 list를 렌더 해야함 
        여기서 didmount로 메뉴 리스트 받아오기
    */
    const cssstyle = `
   .slick-next:before, .slick-prev:before {
       color: #000;
   }
   `



    const menuList = initMenu.map(menu => (
        <MenuItem key = {menu.id} menuTitle={menu.title} menuText={menu.text} menuPrice={menu.price} src={menu.img} />
    ));

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    return (
        <div className={styles['container']}>
            {/* <style>{cssstyle}</style> */}
            <Slider {...settings}>
                {menuList}
            </Slider>
        </div>
    );
}


export default MeunListView;