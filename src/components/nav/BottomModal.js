import React, { useCallback, useState } from 'react';
import styles from './BottomModal.module.scss';
import LinkButtom from 'components/button/LinkButton';
import classnames from 'classnames/bind';
import DatePicker from '../asset/DatePicker';
import { calculateDate } from '../../lib/calculateDate';
import { Backdrop, ButtonBase } from '@material-ui/core';

const cn = classnames.bind(styles);

const BottomModal = ({ open, handleClose, onClick, startDate, setStartDate, endDate, setEndDate }) => {
    const [select, setSelect] = useState(0);

    const onDateClick = useCallback((term, type, index) => {
        setSelect(index);
        const setDate = calculateDate(endDate, term, type);
        setStartDate(setDate);
    }, [endDate, setStartDate]);

    return (
        <>
            <div className={cn('bottom-modal', { on: open })}>
                <div className={styles['table']}>
                    <div className={styles['title']}>조회기간</div>
                    <div className={styles['month-cell']}>
                        <ButtonBase className={cn('date-box', { select: select === 0 })} onClick={() => onDateClick(7, 'DATE', 0)}>1주일</ButtonBase>
                        <ButtonBase className={cn('date-box', { select: select === 1 })} onClick={() => onDateClick(1, 'MONTH', 1)}>1개월</ButtonBase>
                        <ButtonBase className={cn('date-box', { select: select === 2 })} onClick={() => onDateClick(3, 'MONTH', 2)}>3개월</ButtonBase>
                        <ButtonBase className={cn('date-box', { select: select === 3 })} onClick={() => onDateClick(6, 'MONTH', 3)}>6개월</ButtonBase>
                    </div>
                    <div className={styles['date-cell']}>
                        <div className={styles['box']}>
                            <DatePicker
                                maxDate={endDate}
                                date={startDate} setDate={setStartDate}
                                position="top-start"
                            />
                        </div>
                        <div className={styles['line']}></div>

                        <div className={styles['box']}>
                            <DatePicker
                                minDate={startDate}
                                maxDate={new Date()}
                                date={endDate} setDate={setEndDate}
                                position="bottom-end"
                            />
                        </div>
                    </div>
                    <LinkButtom title={'조회'} onClick={() => { onClick(); handleClose(); }} toggle={true} />
                </div>
            </div>
            <Backdrop open={open} className={styles['dim']} onClick={handleClose} />
        </>
    );
};

export default BottomModal;
