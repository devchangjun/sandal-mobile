import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paths } from 'paths';
import styles from './Tos.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import TabMenu from 'components/tab/TabMenu';
import SwipeableViews from 'react-swipeable-views';

const tabInit = [
    {
        url: `${Paths.ajoonamu.tos}?tab=0`,
        name: '개인정보 취급방침',
    },
    {
        url: `${Paths.ajoonamu.tos}?tab=1`,
        name: '이용약관',
    },
];

const TosConatainer = ({ tab = '0' }) => {
    const [index, setIndex] = useState(parseInt(tab));
    const history = useHistory();

    const onChangeTabIndex = (e, value) => {
        setIndex(value);
    };
    const onChangeSwiperIndex = (index) => {
        setIndex(index);
        history.replace(`${Paths.ajoonamu.tos}?tab=${index}`);
    };

    return (
        <>
            <TitleBar title={'이용약관'} />
            <TabMenu tabs={tabInit} index={index} onChange={onChangeTabIndex} />
            <div className={styles['container']}>
                <SwipeableViews
                    enableMouseEvents
                    index={index}
                    onChangeIndex={onChangeSwiperIndex}
                    animateHeight={true}
                >
                    <div className={styles['content']}>
                        아주나무(이하 “회사”)는 회원님의 개인정보를 안전하게
                        보호하기 위하 여 최선의 노력을 다하고 있으며,
                        개인정보보호관련 법규 및 정부기관의 가이드라인을
                        준수하고 있습니다. - 아주나무는 개인정보 처리방침을
                        통하여 회원님의 개인정보가 이용되 고 있고, 이용 시
                        어떠한 보호조치가 취해지고 있는지 알려드립니다. -
                        개인정보 처리방침은 법령의 변경이나, 보다 나은 서비스의
                        제공을 위하 여 내용이 변경될 수 있습니다. 이 경우
                        아주나무는 웹 사이트의 공지사항 또는 이메일을 통해서
                        공지하고 있습니다. 개인정보 처리방침은 홈페이 지 첫
                        화면의 맨 아래에 굵은 글씨로 표시되어 있습니다. -
                        개인정보 처리방침과 이용 약관의 개인정보 관련한 내용의
                        경우 이용약 관이 우선 순위를 갖습니다.
                    </div>
                    <div className={styles['content']}>이용약관</div>
                </SwipeableViews>
            </div>
        </>
    );
};

export default TosConatainer;
