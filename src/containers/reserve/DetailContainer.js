import React from 'react';
import {Paths} from 'paths'
import styles from './Detail.module.scss';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title'
import MenuItem from 'components/item/MenuItem';
import AdditionalList from 'components/item/AdditionalList';
import Counter from 'components/counter/Counter';
import { useHistory } from 'react-router';

const initMenu = {
    item_id: 1,
    title: "김치1",
    text: "김치 맛잇어",
    img: "http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg",
    price: "5000원"
}

const DetailContainer = ({ match }) => {
    const history = useHistory();
    console.log(match.params.data)

    const getCart =()=>{
        history.push(Paths.ajoonamu.cart);
    }
    return (
        <>
            <Header />
            <Title mainTitle={"예약주문>메뉴>상세보기"} subTitle={"상세보기"} />
            <div className={styles['detail-view']}>
                <div className={styles['menu-view']}>
                    <MenuItem menuTitle={initMenu.title} menuText={initMenu.text} src={initMenu.img} menuPrice={initMenu.price}></MenuItem>
                </div>
                <div className={styles['item-info']}>
                    <div className={styles['item-text']}>
                        추가 선택
                    </div>
                    <div className={styles['item-additional-list']}>
                        <AdditionalList/>
                    </div>
                    <div className={styles['item-space']}>
                        희망수량 <Counter value={10}/>
                    </div>
                    <div className={styles['item-space']}>
                        <div className={styles['text']}>
                            주문금액
                        </div>
                        <div className={styles['price']}>
                            30000원
                        </div>
                    </div>
                    <div className={styles['item-btn']} onClick={getCart}>
                        10개 담기 (30000)원
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailContainer;