import React, { useState, useCallback } from 'react';
import { Paths } from 'paths';
import styles from './Detail.module.scss';
import Button from 'components/button/Button';
import AdditionalList from 'components/item/AdditionalList';
import Counter from 'components/counter/Counter';
import { useHistory } from 'react-router';
import Test from 'components/svg/cart/test.png';
import classNames from 'classnames/bind';
import Back from 'components/svg/header/Back';
import { numberFormat } from '../../lib/formatter';
const cx = classNames.bind(styles);



const DetailContainer = ({ menu_name }) => {
    const history = useHistory();
    const onClickCart = () => history.push(Paths.ajoonamu.cart);
    const onClickBack = () => history.goBack();

    const [amount, setAmount] = useState(1);
    const [addItem, setAddItem] = useState(
        [
            {
                id: 1,
                menu_name: '딸기',
                menu_price: 1000,
                check: false,
            },
            {
                id: 2,
                menu_name: '떡볶이',
                menu_price: 1000,
                check: false,
            },
        ]
    )

    const onClickAddItem = (id) => {
        const newAddItem = addItem.map(item => {
            console.log(id);
            if (item.id === id) {
                item.check = !item.check;
            }
            return item;
        })
        setAddItem(newAddItem);
    }

    const onDecrement = useCallback(() => {
        if(amount > 0) 
            setAmount(amount - 1);
    }, [amount]);
    const onIncrement = useCallback(() => {
        setAmount(amount + 1);
    }, [amount]);

    return (
        <>
            <div className={styles['menu-img']}>
                <img className={styles['img']} src={Test} alt={menu_name} />
                <div className={styles['back']}>
                    <Back
                        onClick={onClickBack}
                        stroke={'#fff'}
                        strokeWidth={'3'}
                    />
                </div>
            </div>
            <div className={styles['detail-view']}>
                <div className={styles['menu-info']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['item-text']}>{menu_name}</div>
                        <div className={styles['item-text']}>
                            싱싱한 과일들로 구성된 알찬 도시락입니다.
                        </div>
                        <div className={styles['cost-count']}>
                            <div className={styles['cost']}>
                                {numberFormat(5000 * amount)}원
                            </div>
                            <div className={styles['count']}>
                                <Counter
                                    value={amount}
                                    onDecrement={onDecrement}
                                    onIncrement={onIncrement}
                                />
                            </div>
                        </div>
                        <div className={cx('item-text', 'mg-top')}>
                            추가 선택
                        </div>
                        <div className={styles['item-text']}>
                            <AdditionalList itemList={addItem} onClickAddItem={onClickAddItem}/>
                        </div>
                    </div>
                </div>
            </div>
            <Button
                title={`${amount}개 담기(${numberFormat(5000 * amount)}원)`}
                onClick={onClickCart}
                toggle={true}
            />
        </>
    );
};

export default DetailContainer;
