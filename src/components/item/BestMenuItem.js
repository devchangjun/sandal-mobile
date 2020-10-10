import React from 'react';
import {useHistory} from 'react-router-dom';
import { Paths } from 'paths';
import styles from './BestMenu.module.scss';
import { ButtonBase } from '@material-ui/core';
import { numberFormat } from '../../lib/formatter';
import MenuItemImage1 from 'components/svg/menu/menuitem1.png';


//홈 메뉴 아이템 컴포넌트
const BestMenuItem = (props) => {

    const history = useHistory();
    // item_id 로 경로 줘야함
    return (
            <ButtonBase component='li' className={styles['menu-item']} onClick={() => history.push(`${Paths.ajoonamu.product}?item_id=${props.item_id}`)}>
                <div className={styles['btn-base']}>
                    <MenuImg src={MenuItemImage1} />
                </div>
                <div className={styles['pd-box']}>
                    <div className={styles['menu-info']}>
                        <MenuTitle menuTitle={props.item_name} />
                        <MenuPrice menuPrice={props.item_price} />
                    </div>
                </div>
            </ButtonBase>
        // </MenuDetilLink>
    );
};

//홈 메뉴 이미지 컴포넌트
function MenuImg({ src }) {
    return (
        <div className={styles['menu-img']}>
            <img className={styles.img} src={src} alt="메뉴이미지"></img>
        </div>
    );
}
//홈 메뉴 제목 컴포넌트
function MenuTitle({ menuTitle }) {
    return <div className={styles['menu-title']}>{menuTitle}</div>;
}

//홈 메뉴 텍스트 컴포넌트
// function MenuText({ menuText }) {
//     return <div className={styles['menu-text']}>{menuText}</div>;
// }

//홈 메뉴 가격 컴포넌트
function MenuPrice({ menuPrice }) {
    return (
        <div className={styles['menu-price']}>{numberFormat(menuPrice)} 원</div>
    );
}

export default BestMenuItem;
