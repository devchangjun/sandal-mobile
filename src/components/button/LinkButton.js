import React from 'react';
import styles from './LinkButton.module.scss';
import './LinkButton.module.scss';

//fixed button

const LinkButton =({title, onClick})=>{
    return(
        <div className={styles['link-btn']} onClick ={onClick}>{title}</div>
    )
}

export default LinkButton; 