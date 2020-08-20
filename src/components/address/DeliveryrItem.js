import React from 'react';
import styles from './Addr.module.scss';

const DeliveryrItem = (props) => {

    /* 
        최근 배달 주소를 보여줄 컴포넌트
    */
   const {addr1,addr2,lat,lan} = props;
    console.log(props);

    //배달 받을 주소로 설정
    const onClick = () => {
        console.log("배달지 주소로 선택합니다" +lat + lan);
    }

    //최근 배달 주소 삭제
    const onRemove = () => {
        console.log("배달지 삭제 삭제");
    }

    return (
        <div className={styles['delivery-item']} onClick={onClick}>
            <div className={styles['item-box']}>
                <JibunAddrBox jibunAddr={addr1}></JibunAddrBox>
                <RoadAddrBox roadAddr={addr2}></RoadAddrBox>
            </div>
            <div className={styles['item-remove']} onClick={(e) => {
                e.stopPropagation();
                onRemove()
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