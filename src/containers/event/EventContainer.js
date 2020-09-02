import React, { useState, useCallback, useEffect } from 'react';
import EventImage from '../../components/event/EventImage';
import EventCotent from '../../components/event/EventCotent';

import { requestEventPost } from '../../api/event';

import styles from './EventContainer.module.scss';
import Loading from '../../components/asset/Loading';

export default ({ id }) => {
    const [loading, setLoading] = useState(false);
    const [eventData, setEventData] = useState({});

    const getEventPost = useCallback(async (id) => {
        setLoading(true);
        const res = await requestEventPost(id);
        setEventData(res);
        setLoading(false);
    }, []);

    useEffect(() => {
        getEventPost(parseInt(id));
    }, [getEventPost, id]);

    const {
        image, created_at, ended_at,
        content, precautions
    } = eventData;
    return (
        <>
        {loading ? <Loading open ={true}/> :
        
        <div className={styles['container']}>
        <Loading open={loading} />
        <EventImage image={image} />
        <EventCotent
            created_at={created_at}
            ended_at={ended_at}
            content={content}
            precautions={precautions}
        />
    </div>
        }
     
        </>
    );
};
