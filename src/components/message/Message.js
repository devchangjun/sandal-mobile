import React from 'react';
import styles from './Message.module.scss';
import propTypes from 'prop-types';
import NoMenu from 'components/svg/menu/nomenu.svg';

//맞춤 주문시 보여줄 컴포넌트
const Message = ({ src, msg,onClick, isButton ,buttonName }) => {

    return (
        <div className={styles['reserve-custom-order']}>
            {src &&
            <div className={styles['icon']}>
                <img src={NoMenu} alt={""}></img>
            </div>
                }
            <div className={styles['title-msg']}>
                {msg}
            </div>
            {isButton ? (
                <div className={styles['custom-btn']} onClick={onClick}>
                   {buttonName}
                </div>
            ) : null}

        </div>
    )
}

Message.propTypes={
    msg : propTypes.string,
    onClick :propTypes.func,
    isButton :propTypes.bool
}

Message.defaultProps={
    msg : "아주나무",
    isButton : false,
    onClick :() => console.warn("onClick no defined")
}

export default Message;