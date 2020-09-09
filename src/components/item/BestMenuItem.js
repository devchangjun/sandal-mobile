import React from 'react';
import { Paths } from 'paths';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import styles from './BestMenu.module.scss';
import { ButtonBase } from '@material-ui/core';
import { numberFormat } from '../../lib/formatter';
import MenuItemImage1 from 'components/svg/menu/menuitem1.png';

const MenuDetailLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    margin: 10px;
`;

//홈 메뉴 아이템 컴포넌트
const BestMenuItem = (props) => {
    // item_id 로 경로 줘야함
    return (
        <MenuDetailLink to={`${Paths.ajoonamu.shop}/menu/detail?item_id=${props.item_id}`}>
            <div className={styles['menu-item']}>
                <ButtonBase>
                    <MenuImg src={MenuItemImage1} />
                </ButtonBase>
                <div className={styles['pd-box']}>
                    <div className={styles['menu-info']}>
                        <MenuTitle menuTitle={props.item_name} />
                        <MenuPrice menuPrice={props.item_price} />
                    </div>
                </div>
            </div>
        </MenuDetailLink>
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
        <div className={styles['menu-price']}>{numberFormat(menuPrice)}</div>
    );
}

export default BestMenuItem;
