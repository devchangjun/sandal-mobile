import React, { useReducer, useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './QNAContainer.module.scss';
import classNames from 'classnames/bind';

import TitleBar from '../../components/titlebar/TitleBar';
import TabMenu from '../../components/tab/TabMenu';
import BottomNav from '../../components/nav/BottomNav';
import QNASend from '../../components/support/QNASend';
import QNAList from '../../components/support/QNAList';

import { Paths } from '../../paths';
import { requestQNAList, requestQNAStore } from '../../api/support/qna';
import Loading from '../../components/asset/Loading';
import SwipeableViews from 'react-swipeable-views';

const cn = classNames.bind(styles);

const tabInit = [
    {
        url: `${Paths.ajoonamu.support}/qna/send`,
        name: '문의하기',
    },
    {
        url: `${Paths.ajoonamu.support}/qna/list`,
        name: '문의 내역 확인',
    },
];

function reducer(state, action) {
    return {
        ...state,
        [action.name]: action.value,
    };
}

const QNAContainer = ({ tab = 'send' }) => {
    // QNASend
    const history = useHistory();
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, {
        title: '',
        content: '',
        email: '',
        files: '',
    });

    const onChangeTabIndex = (e, value) => {
        setIndex(value);
    };
    const onChangeSwiperIndex = (index) => {
        setIndex(index);
        const tab= (index===0) ? 'send' : 'list';
        history.replace(`${Paths.ajoonamu.support}/qna/${tab}`);
    };

    const sendQNAItem = useCallback(async () => {
        /*
            문의하기 등록 버튼.
        */
        setLoading(true);
        const token = sessionStorage.getItem('access_token');
        const res = await requestQNAStore(token, state);
        setLoading(false);
    }, [state]);
    const onChange = (e) => dispatch(e.target);
    const onSubmit = (e) => sendQNAItem();
    // QNASend

    // QNAList
    const [qnaList, setQnaList] = useState([]);
    const getQNAList = useCallback(async () => {
        /*
            1:1 문의 내역 불러오기
        */
        setLoading(true);
        const token = sessionStorage.getItem('access_token');
        if (token) {
            const res = await requestQNAList(token);
            const { qnas } = res;
            setQnaList(qnas);
        } else {
            alert('토큰이 없습니다.');
        }
        setLoading(false);
    }, []);
    useEffect(() => {
        if (tab === 'list') getQNAList();
    }, [getQNAList, tab]);
    // QNAList

    return (
        <>
            <Loading open={loading} />
            <TitleBar title="고객센터" />
            <TabMenu tabs={tabInit} index={index} onChange={onChangeTabIndex} />
            <div className={cn('container', { list: tab === 'list' })}>
                <SwipeableViews
                    enableMouseEvents
                    index={index}
                    onChangeIndex={onChangeSwiperIndex}
                >
                    <div>
                        <QNASend
                            state={state}
                            onChange={onChange}
                            onSubmit={onSubmit}
                        />
                    </div>
                    <div>
                        <QNAList
                            listData={qnaList}
                            emptyMessage="등록된 1:1 문의가 없습니다."
                        />
                    </div>
                </SwipeableViews>
            </div>
            <BottomNav />
        </>
    );
};

export default QNAContainer;
