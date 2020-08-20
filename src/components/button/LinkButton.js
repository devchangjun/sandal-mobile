import React from 'react';
import styles from './LinkButton.module.scss';
import classNames from 'classnames/bind';
import './LinkButton.module.scss';
import propTypes from 'prop-types';

const cx = classNames.bind(styles);
//fixed button

const LinkButton = ({ title, onClick, toggle }) => {
    
    const onClickDefault=()=>{
        console.warn('null');
    }
    
    return (
        <div>
            <div className={cx('link-btn', { on: toggle })} onClick={toggle ? onClick: onClickDefault}>{title}</div>
        </div>
    )
}



LinkButton.propTypes = {
    title : propTypes.string,
    onClick : propTypes.func,
    toggle : propTypes.bool
}
LinkButton.defaultProps ={
    title : "button",
    onClick : ()=>console.log("linkbutton"),
    toggle :false,
}


export default LinkButton; 