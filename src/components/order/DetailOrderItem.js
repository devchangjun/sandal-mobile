import React from 'react';
import styles from './DetailOrder.module.scss';
import { DBImageFormat, numberFormat } from '../../lib/formatter';
import ErrorCoverImage from '../asset/ErrorCoverImage';
import Noimage from '../svg/noimage.png';

const DetailOrderItem = (props) => {
    const { item_name, item_option, item_price, item_img } = props;
    return (
        <div className={styles['detail-order-item']}>
            <div className={styles['menu-img']}>
                <ErrorCoverImage
                    className={styles['img']}
                    src={
                        item_img !== '[]' ? DBImageFormat(item_img)[0] : Noimage
                    }
                    alt={'메뉴 이미지'}
                />
            </div>
            <div className={styles['menu-info']}>
                <div className={styles['menu-name']}>{item_name}</div>
                <div className={styles['menu-options']}>
                    <div className={styles['addition']}>
                        추가 옵션: {item_option ? item_option : '없음'}
                    </div>
                    <div className={styles['counter']}>수량: 1개</div>
                </div>
                <div className={styles['menu-price']}>
                    {numberFormat(item_price)}원
                </div>
            </div>
        </div>
    );
};

DetailOrderItem.defaultProps = {
    item_price: 10000,
    item_name: '과일도시락',
};

export default DetailOrderItem;
