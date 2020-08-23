import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './TitleBar.module.scss';
import Back from 'components/svg/header/Back';
import date from 'components/svg/title-bar/date.svg';
// 메인 로고 이미지

const TitleBar = ({ title, sub, alt ,onClick }) => {
    return (
        <div className={styles['title-bar']}>
            <div className={styles['item']}>
                <BackButton />
                <Title title={title} />
                <div className={styles['empty']}>
                    {sub &&
                        <img src ={date} alt="데이트" onClick={onClick}/>
                    }
                    
                </div>
            </div>
        </div>
    );
};

const Title = ({ title }) => {
    return (
        <div className={styles['title']}>
            <span>{title}</span>
        </div>
    );
}

const BackButton = () => {
    const history = useHistory();
    const onClickBack = () => {
        history.goBack();
    };
    return (
        <div className={styles['back']}>
            <div className={styles['pd-box']}>
                <Back onClick={onClickBack} />
            </div>
        </div>
    );
}

TitleBar.defaultProps ={
    sub:false,
    onClick: ()=>console.warn('null'),
}
export default TitleBar;
