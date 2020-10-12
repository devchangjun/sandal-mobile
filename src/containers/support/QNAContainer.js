import React, { useReducer, useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './QNAContainer.module.scss';
import classNames from 'classnames/bind';

import TabMenu from '../../components/tab/TabMenu';
import QNASend from '../../components/support/QNASend';
import QNAList from '../../components/support/QNAList';

import { Paths } from '../../paths';
import { requestQNAList, requestQNAStore } from '../../api/support/qna';
import Loading from '../../components/asset/Loading';
import SwipeableViews from 'react-swipeable-views';
import { useStore } from '../../hooks/useStore';
import { isEmailForm } from '../../lib/formatChecker';
import { useModal } from '../../hooks/useModal';

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
    const openModal = useModal();
    const user_token = useStore();
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, {
        title: '',
        content: '',
        email: '',
    });
    const [files, setFiles] = useState([]);

    const onChangeTabIndex = (e, value) => {
        setIndex(value);
    };
    const onChangeSwiperIndex = (index) => {
        setIndex(index);
        const tab = index === 0 ? 'send' : 'list';
        history.replace(`${Paths.ajoonamu.support}/qna/${tab}`);
    };

    const sendQNAItem = useCallback(async () => {
        /*
            문의하기 등록 버튼.
        */
        setLoading(true);
        if (isEmailForm(state.email)) {
            if (user_token) {
                try {
                    const res = await requestQNAStore(user_token, { ...state, files });
                    if (res.data.msg === "성공") {
                        openModal('성공적으로 작성하였습니다!', '답변이 올 때까지는 조금 시간이 소요됩니다.', () => {
                            history.replace(`${Paths.ajoonamu.mypage}`);
                        });
                    } else {
                        openModal('작성하는 도중 오류가 발생했습니다!', '다시 시도해 주세요.');
                    }
                } catch (e) {
                    openModal('서버에 오류가 발생하겼습니다!', '잠시 후 다시 시도해 주세요.');
                }
            }
        } else {
            openModal('이메일이 형식에 맞지 않습니다!', '확인 후 다시 작성해 주세요.');
        }
        setLoading(false);
    }, [state, files, user_token, history, openModal]);
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

        if (user_token) {
            const res = await requestQNAList(user_token);
            const { qnas } = res;
            setQnaList(qnas);
        } else {
            alert('토큰이 없습니다.');
        }
        setLoading(false);
    }, [user_token]);

    useEffect(() => {
        if (tab === 'list') getQNAList();
    }, [getQNAList, tab]);
    // QNAList

    useEffect(() => {
        if (tab === 'list') {
            setIndex(1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Loading open={loading} />
            <TabMenu tabs={tabInit} index={index} onChange={onChangeTabIndex} />
            <div className={cn('container', { list: tab === 'list' })}>
                <SwipeableViews
                    enableMouseEvents
                    index={index}
                    onChangeIndex={onChangeSwiperIndex}
                    animateHeight={qnaList.length !== 0}
                >
                    <div>
                        <QNASend
                            state={state}
                            files={files}
                            setFiles={setFiles}
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
        </>
    );
};

export default QNAContainer;
