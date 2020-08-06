import React from 'react';
import { Paths } from 'paths'
import styles from './Detail.module.scss';
import Button from 'components/button/Button';
import TitleBar from 'components/titlebar/TitleBar'
import MenuItem from 'components/item/MenuItem';
import AdditionalList from 'components/item/AdditionalList';
import Counter from 'components/counter/Counter';
import { useHistory } from 'react-router';

const initMenu = {
    item_id: 1,
    title: "과일도시락1",
    text: "과일도시락 맛잇어",
    price: "5000원"
}

const DetailContainer = ({ match }) => {
    const history = useHistory();
    console.log(match.params.data)

    const getCart = () => {
        history.push(Paths.ajoonamu.cart);
    }
    return (
        <>
            <TitleBar title={match.params.data} />
            <div className={styles['detail-view']}>
                <div className={styles['menu-view']}>
                    <MenuItem menuTitle={initMenu.title} menuText={initMenu.text} src={initMenu.img} menuPrice={initMenu.price}></MenuItem>
                </div>
                <div className={styles['item-info']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['item-text']}>
                            추가 선택
                    </div>
                        <div className={styles['item-additional-list']}>
                            <AdditionalList />
                        </div>
                        <div className={styles['item-space']}>
                            희망수량 <Counter value={10} />
                        </div>
                        <div className={styles['item-space']}>
                            <div className={styles['text']}>
                                주문금액
                        </div>
                            <div className={styles['price']}>
                                30000원
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button title={"10개담기(30000원)"} onClick ={getCart}/>
        </>
    )
}

export default DetailContainer;