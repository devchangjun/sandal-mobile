import React from 'react';
import styles from './Addr.module.scss';

const DeliveryrItem = ({ jibunAddr, roadAddr, onClick }) => {

    /* 
        최근 배달 주소를 보여줄 컴포넌트
    */


    //배달 받을 주소로 설정
    const handleClick = () => {
        console.log("gd");
        var data = jibunAddr;
    }

    //최근 배달 주소 삭제
    const handleRemove = () => {

        // 최근 배달 주소 삭제시 id값 넣어줘야 함.
        console.log("삭제");
    }

    return (
        <div className={styles['latest-item']} onClick={handleClick}>
            <div className={styles['item-box']}>
                <JibunAddrBox jibunAddr={jibunAddr}></JibunAddrBox>
                <RoadAddrBox roadAddr={roadAddr}></RoadAddrBox>
            </div>
            <div className={styles['item-remove']} onClick={(e) => {
                e.stopPropagation();
                handleRemove()
            }}> &times;
            </div>
        </div>
    )
}
const JibunAddrBox = ({ jibunAddr }) => {
    return (
        <div className={styles['jibun-box']}>
            {jibunAddr}
        </div>
    )
}
const RoadAddrBox = ({ roadAddr }) => {
    return (
        <div className={styles['roadAddr-box']}>
            <AddrBtn /> {roadAddr}
        </div>
    )
}
const AddrBtn = () => {
    return (
        <div className={styles['btn']}>
            도로명
        </div>
    )
}

export default DeliveryrItem;