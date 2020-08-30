import React  from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import styles from './TabMenu.module.scss';
import Button from '@material-ui/core/Button';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";




const useStyles = makeStyles((theme) => ({
    tabs:{
        display:"table",
        width:"100%",
        heigth:"40px",
        maxHeight:"40px",
        maxWidth:"1374px",
        margin: "0 auto",
        top:"40px",
        left:0,
        zIndex:99,
        position: "fixed"
    },
    tabitem: {
        backgroundColor: '#fff', 
        minHeight:'40px',
        padding:0,
        display:"table-cell",
        width:"100px",
        height:"100%",
    }

}));


const TabMenu = ({ tabs,index,onChange }) => {

    const classes = useStyles();


    const activeStyle = {
        borderBottom: '3px solid #000'
    };


    const tabList = tabs.map(tab => (
        <Tab  className={classes.tabitem} label={tab.name} />
    ))
    return (
            <Tabs
                value={index}
                fullWidth
                onChange={onChange}
                TabIndicatorProps={{
                    style: {
                      backgroundColor: "#000"
                    }
                  }}
                className={classes.tabs}
            >
                {tabList}
            </Tabs>
    );
}


export default TabMenu;