import React, { useState, useCallback, useEffect } from 'react';
import EventImage from '../../components/event/EventImage';
import EventCotent from '../../components/event/EventCotent';

import { requestEventPost } from '../../api/event';

import styles from './EventContainer.module.scss';
import Loading from '../../components/asset/Loading';
import { DBImageFormat } from '../../lib/formatter';
import { useModal } from '../../hooks/useModal';

export default ({ id }) => {
    const openModal = useModal();
    
    const [loading, setLoading] = useState(false);
    const [eventData, setEventData] = useState({});

    const getEventPost = useCallback(async (id) => {
        setLoading(true);
        try {
            const res = await requestEventPost(id);
            if (res.data.msg === '성공') {
                setEventData(res.data.query.event);
            } else {
                openModal('이벤트 내용을 가져오는데 오류가 발생했습니다.', '잠시 후 재시도 해주세요.');
            }
        } catch (e) {
            openModal('잘못된 접근입니다.', '잠시 후 재시도 해주세요.');
        }
        setLoading(false);
    }, [openModal]);

    useEffect(() => {
        getEventPost(parseInt(id));
    }, [getEventPost, id]);

    const { images_mobile, created_at, end_date, body, warn } = eventData;
    return (
        <>
            {!loading && (
                <div className={styles['container']}>
                    <Loading open={loading} />
                    <EventImage image={DBImageFormat(images_mobile)} />
                    <EventCotent
                        created_at={created_at}
                        ended_at={end_date}
                        body={body}
                        warn={warn}
                    />
                </div>
            )}
            <Loading open={loading} />
        </>
    );
};
