import React from 'react';
import styles from './LinkButton.module.scss';
import classNames from 'classnames/bind';
import './LinkButton.module.scss';

const cx = classNames.bind(styles);
//fixed button

const LinkButton = ({ title, onClick, toggle }) => {
    return (
        <div>
            <div className={cx('link-btn', { on: toggle })} onClick={onClick}>{title}</div>
        </div>
    )
}

export default LinkButton; 