import React from 'react';
import ko from 'date-fns/locale/ko';
import DatePicker from 'react-datepicker';
import styles from './DatePicker.module.scss';
import './DatePicker.scss';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = (props) => {
    const {date, setDate} = props;
    return (
        <div className={styles['date-picker']}>
            <DatePicker
                locale={ko}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                selected={date}
                onChange={(date) => setDate(date)}
                className={styles['test']}
                popperModifiers={{
                    preventOverflow: {
                        enabled: false,
                    },
                }}
            />
        </div>
    );
};
export default CustomDatePicker;
