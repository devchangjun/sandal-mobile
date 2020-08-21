import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './TitleBar.module.scss';
import Back from 'components/svg/header/Back';

// 메인 로고 이미지

const TitleBar = ({ title, src, alt }) => {
    return (
        <div className={styles['title-bar']}>
            <div className={styles['item']}>
                <BackButton />
                <Title title={title} />
                <div className={styles['empty']} />
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

export default TitleBar;
