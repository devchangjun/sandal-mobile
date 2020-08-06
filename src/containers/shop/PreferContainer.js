import React from 'react';
import styles from './Prefer.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import classNames from 'classnames/bind';
import Counter from 'components/counter/Counter';
import Button from 'components/button/Button';

const cx = classNames.bind(styles);

const PreferContainer = () => {
    return (
        <>
            <TitleBar title={"맞춤주문"} />
            <div className={styles['prefer']}>
                <div className={styles['title-input']}>
                    <div className={styles['title']}>
                            주문 종류
                    </div>
                    <div className={styles['input']}>
                        <form>
                            <select>
                                <option value="reserve">예약주문</option>
                                <option value="delivery">배달주문</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div className={styles['title-input']}>
                    <div className={styles['title']}>
                            전체 예산
                    </div>
                    <div className={styles['input']}>
                        <input value={"5000원"}></input>
                    </div>
                </div>
                <div className={cx('title-input','box')}>
                    <div className={styles['title']}>
                            전체 예산
                    </div>
                    <div className={styles['input']}>
                        <Counter value={0}/>
                    </div>
                </div>
            </div>
            <Button title={"확인"}/>
        </>
    )
}
export default PreferContainer;