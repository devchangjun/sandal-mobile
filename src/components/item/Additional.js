import React from 'react';
import styles from './Additional.module.scss';


//추가선택 아이템
const Additional =({menuName, menuPrice})=>{
    return(
        <div className={styles['additional-item']}>
            <label><input type="checkbox"></input>{menuName} 추가 </label> +{menuPrice}원
        </div>
    )
}

export default Additional