import React from 'react';
import styles from './DetailOrder.module.scss';
import IMG from '../../components/svg/menu/menuitem5.png';

const DetailOrderItem =(props)=>{
    const{item_name,item_option,item_price} = props;
    return(
        <div className={styles['detail-order-item']}>
            <div className ={styles['menu-img']}>
                <img src ={IMG} alt="메뉴"/>
            </div>
            <div className={styles['menu-info']}>
                <div className={styles['menu-name']}>
                    {item_name}
                </div>
                <div className={styles['menu-options']}>
                    <div className={styles['addition']}>
                            추가 옵션: {item_option ? item_option : "없음"}
                    </div>
                    <div className={styles['counter']}>
                        수량: 1개
                    </div>
                </div>  
                <div className={styles['menu-price']}>
                   {item_price}원
                </div>
            </div>
        </div>
    )
}

export default DetailOrderItem;