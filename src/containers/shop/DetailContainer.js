import React from 'react';
import { Paths } from 'paths'
import styles from './Detail.module.scss';
import Button from 'components/button/Button';
import TitleBar from 'components/titlebar/TitleBar'
import MenuItem from 'components/item/MenuItem';
import AdditionalList from 'components/item/AdditionalList';
import Counter from 'components/counter/Counter';
import { useHistory } from 'react-router';
import Test from 'components/svg/cart/test.png';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);
const initMenu = {
    item_id: 1,
    title: "과일도시락1",
    text: "과일도시락 맛잇어",
    price: "5000원"
}

const DetailContainer = ({ menu_name }) => {
    const history = useHistory();

    const getCart = () => {
        history.push(Paths.ajoonamu.cart);
    }
    return (
        <>
            <div className={styles['menu-img']}>
                <img className={styles['img']} src= {Test}/>

            </div>
            <div className={styles['detail-view']}>
                <div className={styles['item-info']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['item-text']}>
                            {menu_name}
                         </div>
                         <div className={styles['item-text']}>
                         싱싱한 과일들로 구성된 알찬 도시락입니다.
                         </div>
                        <div className={styles['cost-count']}>
                            <div className={styles['cost']}>
                                    5000원
                            </div>
                            <div className={styles['count']}>
                                <Counter value={1}/>
                            </div>
                        </div>
                        <div className={cx('item-text','mg-top')}>
                            추가 선택
                         </div>
                         <div className={styles['item-text']}>
                            <AdditionalList/>
                         </div>
                    </div>
                </div>
            </div>
            <Button title={"1개 담기(5,000원)"} onClick ={getCart} toggle={true}/>
        </>
    )
}

export default DetailContainer;