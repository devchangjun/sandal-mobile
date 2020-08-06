import React from 'react';
import styles from './Custom.module.scss';
const logo = "http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg";

const initMenu = [
    {
        id: 1,
        title: "떡볶이",
        img: "http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg",
        count : "100",
        price: "5000원"
    },
    {
        id: 2,
        title: "순대",
        img: "https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg",
        count : "100",
        price: "5000원"
    },
    {
        id: 3,
        title: "참치",
        count :"2",
        img: "http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb",
        price: "5000원"
    }, {
        id: 4,
        title: "볶음밥",
        img: "https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg",
        count :"2",
        price: "5000원"
    },


]


//추천 메뉴 아이템
const CoustomItem = ({datas}) => {

    return (
        <div className={styles['custom-item']}>
            {/* <CustomImgList datas={datas}/> */}
            <CustomTitleList datas={datas}/>
            <div className={styles['custom-info']}>
                <CustomCount count={"2"}/>
                <CustomPrice/>
            </div>

        </div>
    )
}

//추천 메뉴에서 이미지를 렌더할 컴포넌트
function CustomImg({ src }) {
    return (
        <div className={styles['custom-img']}>
            <img src={logo}></img>
        </div>
    )
}

//추천 메뉴리스트에서 이미지를 렌더할 컴포넌트
function CustomImgList({ datas }) {
    const list = datas.map(item => (
        <CustomImg src={logo} />
    ))
    return (
        <div className={styles['custom-img-list']}>
            {list}
        </div>
    )
}

//추천 메뉴리스트에서 메뉴, 가격 등 텍스트를 렌더할 컴포넌트
function CustomTitleList({datas}){
    const list = datas.map((item,index) => (
        <CustomTitle 
        title={item.title} 
        count={item.count}
        price={item.price}
        key={index}
        />
    ))
    return (
        <div className={styles['custom-title-list']}>
            {list}
        </div>
    )
}

//추천 메뉴에서 메뉴, 가격 등 텍스트를 렌더할 컴포넌트
function CustomTitle({ title,count,price }) {
    return (
        <div className={styles['custom-title']}>
            {`${title} ${count}개 (${price})`}
        </div>
    )
}

//추천 메뉴에서 수량을 렌더할 컴포넌트
function CustomCount({ count }) {
    return (
        <div className={styles['custom-count']}>
            {"수량 2개"}
        </div>
    )
}

//추천 메뉴에서 가격을 렌더할 컴포넌트
function CustomPrice({ price }) {
    return (
        <div className={styles['custom-price']}>
            총 {"20000원"}
        </div>
    )
}

export default CoustomItem;