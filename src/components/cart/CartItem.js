import React from 'react';
import PropsTypes from 'prop-types'; 
import styles from './Cart.module.scss';
import Counter from 'components/counter/Counter';
import logo from 'logo.svg';


// 메뉴이름, 추가옵션

const CartItem = props => {

    console.log(props);
    console.log(props.item);
    console.log(props.options);
    const {id,isChecked,handleCheckChild} = props;
    const {item_img,item_name,item_option_id,item_price,item_quanity} =props.item;
    const options = props.options;
    console.log(options);

    const onClick=()=>{
        console.log(options);
    }

    return (
        <div className={styles['cart-item']}  onClick={onClick}>
            <div className={styles['bar']}>
                <div className={styles['check']}>
                    <input type="checkbox" checked={isChecked} id={id}onChange={handleCheckChild}></input>
                </div>
                <div className={styles['delete']}>
                    &times;
                </div>
            </div>
            <div className={styles['item-box']}>
                <div className={styles['item-info']}>
                    <div className={styles['name']}>
                        {item_name}
                    </div>
                    <div className={styles['options']}>
                        추가선택 
                        {
                            options.map(
                                op =>(
                                   op.option_name
                                )
                            )
                        }
                    </div>
                    <div className={styles['count-price']}>
                        <div className={styles['count']}>
                            수량 <Counter value={item_quanity} />
                        </div>
                        <div className={styles['price']}>
                            {item_price}
                        </div>
                    </div>
                </div>
                <div className={styles['item-img']}>
                     <img src={logo}></img>
                </div>
            </div>
        </div>

    )
}

CartItem.PropsTypes ={
    isChecked : PropsTypes.bool,
}
CartItem.defaultProps={
    isChecked :false,
}

export default React.memo(CartItem);