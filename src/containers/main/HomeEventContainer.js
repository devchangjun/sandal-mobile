import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Paths } from 'paths';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import styles from './HomeEvent.module.scss';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

//hooks
import { useModal } from '../../hooks/useModal';

//api
import { requestBannerList } from '../../api/event/banner';

//lib
import { DBImageFormat } from '../../lib/formatter';

import ErrorCoverImage from '../../components/asset/ErrorCoverImage';

SwiperCore.use([Autoplay]);
const HomeSlick = () => {
    const openModal = useModal();
    const history = useHistory();

    const [state, dispatch] = useReducer(
        (state, action) => ({ ...state, ...action }),
        {
            oldSlide: 0,
            activeSlide: 1,
            end: 0,
        },
    );

    const [list, setList] = useState([]);

    const getBannerList = useCallback(async () => {
        try {
            const res = await requestBannerList();
            if (res.data.msg === '성공') {
                setList(res.data.query);
                dispatch({ end: res.data.query.length });
            } else {
                openModal(
                    '배너를 가지고 오는데 오류가 발생했습니다.',
                    '페이지를 새로고침 해 주세요.',
                );
            }
        } catch (e) {
            openModal(
                '배너를 가지고 오는데 오류가 발생했습니다.',
                '페이지를 새로고침 해 주세요.',
            );
        }
    }, [openModal]);

    useEffect(() => {
        getBannerList();
    }, [getBannerList]);

    const calcualteIndex = (index, length) => {
        return index % length === 0 ? length : index % length;
    };

    return (
        <div className={styles['container']}>
            {list.length !== 0 && (
                <Swiper
                    initialSlide={0}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                    }}
                    slidesPerView={1}
                    loop
                    loopedSlides={1}
                    className={styles['event-swiper']}
                    onSlideChange={(swiper) => {
                        dispatch({
                            oldSlide: calcualteIndex(
                                swiper.previousIndex,
                                list.length,
                            ),
                            activeSlide: calcualteIndex(
                                swiper.activeIndex,
                                list.length,
                            ),
                        });
                    }}
                >
                    {list.map((item) => (
                        <SwiperSlide
                            key={item.id}
                            className={styles['event-slide']}
                            isD
                        >
                            <Link to={item.bn_url}>
                                <div className={styles['item']}>
                                    <ErrorCoverImage
                                        src={DBImageFormat(item.bn_img_mobile)[0]}
                                        alt="mainBanner"
                                    />
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            <div
                className={styles['count']}
                onClick={() => history.push(Paths.ajoonamu.event)}
            >
                <span>{state.activeSlide}</span>
                <span>{state.end}</span>
            </div>
        </div>
    );
};

export default HomeSlick;
