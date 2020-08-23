import React from 'react';
import styles from './Additional.module.scss';
import Select from 'components/svg/select/Select';
import { numberFormat } from "../../lib/formatter";

//추가선택 아이템
const Additional = ({ menuName, menuPrice, check }) => {
    return (
        <div className={styles['additional-item']}>
            <input type="checkbox" id="test"></input>
            <label className={styles['label']} htmlFor="test">
                <Select check={check} /> {menuName} 추가 {numberFormat(menuPrice)} 원
            </label>
        </div>
    );
};

export default Additional;
