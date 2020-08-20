import React from 'react';
import styles from './BottomModal.module.scss';
import LinkButtom from 'components/button/LinkButton';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const BottomModal = ({open,handleClose}) => {
    return (
        <>
            <div className={cx('bottom-modal',{on: open})}>
                <div className={styles['table']}>
                    <div className={styles['title']}>
                        조회기간
                     </div>
                    <div className={styles['month-cell']}>
                        <div className={styles['month']}>
                            1주일
                          </div>
                        <div className={styles['month']}>
                            1개월
                          </div>
                        <div className={styles['month']}>
                            3개월
                          </div>
                        <div className={styles['month']}>
                            6개월
                          </div>
                    </div>
                    <div className={styles['date-cell']}>
                        <div className={styles['box']}>

                        </div>
                        <div className={styles['box']}>

                        </div>
                    </div>
                    <LinkButtom title={"조회"} toggle={true} />

                </div>
            </div>
            {open && <div className={styles['dim']} onClick={handleClose}/>}
    
        </>
    )
}

export default BottomModal;


