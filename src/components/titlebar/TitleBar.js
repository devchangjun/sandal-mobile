import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './TitleBar.module.scss';
import back from 'components/svg/header/back.svg';

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

    )
}

function Title({ title }) {
    return (
        <div className={styles['title']}>
            <span>{title}</span>
        </div>
    )
}

function BackButton() {
    const history = useHistory();
    const goToBack = () => {
        history.goBack();
    }
    return (
        <div className ={styles['back'] }onClick={goToBack}>
            <div className={styles['pd-box']}>
            <img src ={back} alt={"뒤로가기"}/>
            </div>
        </div>
    )
}

export default TitleBar;