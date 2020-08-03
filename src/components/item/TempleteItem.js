import React from 'react';
import styles from './Templete.module.scss';
import logo from 'logo.svg';

const img = "https://garitonkids.com/wp-content/uploads/2020/03/1981_3.png";

//문구 템플릿 컴포넌트
const TempleteItem = ({ src }) => {
    return (
        <div className={styles['templete-item']}>
            <TempleteImg />
        </div>
    )

}
//문구 템플릿 이미지 컴포넌트
function TempleteImg({ src }) {
    return (
        <div className={styles['templete-img']}>
            <img className={styles.img} src={img}></img>
        </div>
    )
}

export default TempleteItem;