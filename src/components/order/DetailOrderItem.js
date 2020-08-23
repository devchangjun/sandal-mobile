import React from 'react';
import styles from './DetailOrder.module.scss';
import IMG from '../../components/svg/menu/menuitem5.png';

const DetailOrderItem =()=>{
    return(
        <div className={styles['detail-order-item']}>
            <div className ={styles['menu-img']}>
                <img src ={IMG} alt="메뉴"/>
            </div>
            <div className={styles['menu-info']}>
                <div className={styles['menu-name']}>
                    과일 도시락
                </div>
                <div className={styles['menu-options']}>
                    <div className={styles['addition']}>
                            추가 옵션 없음
                    </div>
                    <div className={styles['counter']}>
                        수량 100개
                    </div>
                </div>  
                <div className={styles['menu-price']}>
                    50,000원
                </div>
            </div>
        </div>
    )
}

export default DetailOrderItem;