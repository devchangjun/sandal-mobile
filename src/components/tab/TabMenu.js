import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import styles from './TabMenu.module.scss';
import Button from '@material-ui/core/Button';

const TabLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    display: table-cell; /* 핵심! */
    width: 100px; height: 100%;
    border-bottom: 3px solid transparent;
    vertical-align: middle;
    text-align: center;
`;

const TabMenu = ({ tabs }) => {
    const activeStyle = {
        borderBottom: '3px solid #000',
    };

    const tabList = tabs.map((tab) => (
        <TabLink key={tab.url} to={tab.url} activeStyle={activeStyle}>
            <TabItem name={tab.name} />
        </TabLink>
    ));
    return <div className={styles['tab-menu']}>{tabList}</div>;
};

const TabItem = ({ name }) => {
    return <Button className={styles['tab-item']}>{name}</Button>;
};
export default TabMenu;
