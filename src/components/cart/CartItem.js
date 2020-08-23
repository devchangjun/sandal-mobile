import React from 'react';
import PropsTypes from 'prop-types';
import styles from './Cart.module.scss';
import Counter from 'components/counter/Counter';
import cart from '../svg/cart/cart.png';
import { numberFormat } from "../../lib/formatter";



// 메뉴이름, 추가옵션

const CartItem = props => {


    // const { id, isChecked, handleCheckChild } = props;
    // const {item_img, item_option_id} = props.item;
    const { item_name,  item_price, item_quanity } = props.item;
    const options = props.options;

    const onClick = () => {
        // console.log(options);
    }

    return (
        <div className={styles['cart-item']} onClick={onClick}>
            <div className={styles['pd-box']}>
                <div className={styles['item-box']}>
                    <div className={styles['item']}>
                        <div className={styles['item-img']}>
                            <img src={cart} alt={item_name}></img>
                        </div>
                        <div className={styles['item-info']}>
                            <div className={styles['bar']}>
                                <div className={styles['name']}>
                                    {item_name}
                                </div>
                                <div className={styles['delete']}>
                                    &times;
                              </div>
                            </div>
                            <div className={styles['options']}>
                                {
                                    options.map(
                                        op => (
                                            op.option_name
                                        )
                                    )
                                }

                            </div>
                            <div className={styles['count-price']}>
                                <div className={styles['count']}>
                                    {/* <Counter value={3} /> */}
                                     <Counter value={item_quanity} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['price']}>
                        {numberFormat(item_price)} 원
                    </div>
                </div>
            </div>
        </div>

    )
}

CartItem.PropsTypes = {
    isChecked: PropsTypes.bool,
}
CartItem.defaultProps = {
    isChecked: false,
}

export default React.memo(CartItem);