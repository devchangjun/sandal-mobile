import React, { useEffect, useState, useCallback } from 'react';
import styles from './EventListContainer.module.scss';
import { requestEventList } from '../../api/event';
import EventList from '../../components/event/EventList';
import Loading from '../../components/asset/Loading';

export default () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getEventList = useCallback(async () => {
        setLoading(true);
        const res = await requestEventList();
        setList(res);
        setLoading(false);
    }, []);

    useEffect(() => {
        getEventList();
    }, [getEventList]);

    return (
        <>
            {loading ? (
                <Loading open={true} />
            ) : (
                <div className={styles['container']}>
                    <EventList listData={list} />
                </div>
            )}
        </>
    );
};
