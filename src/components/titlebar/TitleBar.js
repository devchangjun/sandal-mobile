import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './TitleBar.module.scss';
import Back from 'components/svg/header/Back';
import { IconButton } from '@material-ui/core';



// 메인 로고 이미지

const TitleBar = ({ title, sub, alt, onClick, children, isHome }) => {
    return (
        <>
            {title &&
                <div className={styles['title-bar']}>
                    <div className={styles['item']}>
                        <BackButton isHome={isHome} />
                        <Title title={title} />
                        <div className={styles['empty']}>{children}</div>
                    </div>
                </div>
            }
        </>
    );
};

const Title = ({ title }) => {
    return (
        <div className={styles['title']}>
            <span>{title}</span>
        </div>
    );
};

const BackButton = ({isHome}) => {
    const history = useHistory();
    const onClickBack = () =>{
        isHome ? history.push('/') : history.goBack();
    } 
    return (
        <div className={styles['back']}>
            <div className={styles['pd-box']}>
                <IconButton
                    onClick={onClickBack}
                    className={styles['back-button']}
                >
                    <Back />
                </IconButton>
            </div>
        </div>
    );
};

TitleBar.defaultProps = {
    sub: false,
    isHome: false,
    onClick: () => console.warn('null'),
};

export default TitleBar;
