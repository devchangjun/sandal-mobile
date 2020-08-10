import React from 'react';
import styles from './Message.module.scss';
import propTypes from 'prop-types';


//맞춤 주문시 보여줄 컴포넌트
const Message = ({ msg,onClick, isButton }) => {

    return (
        <div className={styles['reserve-custom-order']}>
            <div className={styles['title-msg']}>
                {msg}
            </div>
            {isButton ? (
                <div className={styles['custom-btn']} onClick={onClick}>
                    맞춤 주문 설정
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