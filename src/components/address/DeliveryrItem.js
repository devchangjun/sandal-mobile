import React from 'react';
import styles from './Addr.module.scss';
import { ButtonBase, IconButton } from '@material-ui/core';
import Cross from '../svg/counter/Cross';

const DeliveryrItem = (props) => {
    /* 
        최근 배달 주소를 보여줄 컴포넌트
    */
    const { addr1, addr2, lat, lng } = props;

    return (
        <div className={styles['delivery-item']}>
            <ButtonBase className={styles['item-box']}component="div"  onClick={props.onClick}>
                <JibunAddrBox jibunAddr={addr1}></JibunAddrBox>
                <RoadAddrBox roadAddr={addr2}></RoadAddrBox>
            </ButtonBase>
            <IconButton className={styles['item-remove']}
                onClick={e => {
                    e.stopPropagation();
                    props.onRemove();
                }}
            >
                <Cross color="#777" angle={45} />
            </IconButton>
        </div>
    );
};
const JibunAddrBox = ({ jibunAddr }) => {
    return <div className={styles['jibun-box']}>{jibunAddr}</div>;
};
const RoadAddrBox = ({ roadAddr }) => {
    return (
        <div className={styles['roadAddr-box']}>
            <AddrBtn />
            <span className={styles['roadAddr-content']}>{roadAddr}</span>
        </div>
    );
};
const AddrBtn = () => {
    return <div className={styles['btn']}>상세주소</div>;
};

export default DeliveryrItem;
