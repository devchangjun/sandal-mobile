import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './TabMenu.module.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tabs: {
        width: '100%',
        maxWidth: '768px',
        minHeight: '40px',
        margin: '0 auto',
        top: '40px',
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        position: 'fixed',
        zIndex: 99,
        paddingLeft:"24px",
        paddingRight:"24px",
    },
}));

const TabMenu = ({ tabs, index, onChange,isPush }) => {
    const classes = useStyles();
    const history = useHistory();

    const onClickTab = (url) => {
        if (url !== undefined) {
            isPush ? history.push(url) : history.replace(url);
        }
    };

    const tabList = tabs.map((tab) => (
        <Tab
            label={tab.name}
            key={tab.name}
            className={styles['tab-item']}
            onClick={() => onClickTab(tab.url)}
        />
    ));

    return (
        <Tabs
            value={index}
            onChange={onChange}
            TabIndicatorProps={{
                style: {
                    backgroundColor: '#000',
                    height:'4px',
                    borderRadius:'100px'
                },
            }}
            className={classes.tabs}
        >
            {tabList}
        </Tabs>
    );
};

TabMenu.defaultProps = {
    tabs: null,
    index: 0,
    isPush : false,
    onChange: () => console.warn(null),
};

export default TabMenu;
