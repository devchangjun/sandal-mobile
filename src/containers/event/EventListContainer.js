import React, { useEffect, useState, useCallback } from 'react';
import styles from './EventListContainer.module.scss';
import { Button } from '@material-ui/core';
import { requestEventList } from '../../api/event';
import EventList from '../../components/event/EventList';

export default () => {
    const [list, setList] = useState([]);

    const getEventList = useCallback(async () => {
        const res = await requestEventList();
        setList(res);
        console.log(res);
    }, []);

    useEffect(() => {
        getEventList();
    }, [getEventList]);

    return (
        <div className={styles['container']}>
            <EventList listData={list} />
        </div>
    );
};
