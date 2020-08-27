import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { Paths } from 'paths';
import styles from './Reserve.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import TabMenu from 'components/tab/TabMenu';
import MenuItemList from 'components/item/MenuItemList';
import Message from 'components/message/Message';
import CustomItemList from 'components/item/CustomItemList';
import PreferModal from 'components/asset/PreferModal';
import BottomNav from 'components/nav/BottomNav';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller } from 'swiper'

SwiperCore.use([Controller]);

const tabInit = [
    {
        url: `${Paths.ajoonamu.shop}?menu=0`,
        name: '추천메뉴',
    },
    {
        url: `${Paths.ajoonamu.shop}?menu=1`,
        name: '메뉴1',
    },
    {
        url: `${Paths.ajoonamu.shop}?menu=2`,
        name: '메뉴2',
    },
    {
        url: `${Paths.ajoonamu.shop}?menu=3`,
        name: '메뉴3',
    },

];

const ReserveContainer = ({ tab }) => {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    // const { user } = useSelector(state => state.auth);
    const [budget, setBudget] = useState(0); //맞춤 가격
    const [desireQuan, setDesireQuan] = useState(0); //희망수량
    const [itemType, setItemType] = useState('reserve'); //사용자 선택 값 1.예약주문 2.배달주문
    const [result, setResult] = useState(false); // 예약주문 요청시 결과값.
    const [title, setTitle] = useState('추천메뉴');

    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);



    const onChangeTitle = useCallback(() => {
        if (tab === '0') {
            setTitle('추천메뉴');
        } else if (tab === '1') {
            setTitle('메뉴1');
        } else if (tab === '2') {
            setTitle('메뉴2');
        } else if (tab === '3') {
            setTitle('메뉴3');
        }
    }, [tab]);
    useEffect(() => {
        onChangeTitle();
    }, [onChangeTitle]);

    //맞춤 주문하기 버튼 클릭
    const handleOpen = () => setOpen(true);
    // 모달창 닫기
    const handleClose = () => setOpen(false);

    //주문 종류 선택
    const onChangeType = (e) => setItemType(e.target.value);

    //전체 예산 입력
    const onChangeBudget = (e) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
            setBudget(e.target.value);
        }
    };
    const onChangeDesireQune = (value) => {
        setDesireQuan(value);
    };
    // 모달창 설정 버튼 클릭 => 맞춤 주문 설정.
    const onCustomOrder = () => {
        setOpen(false);
        if (budget !== 0) setResult(true);
    };

    const onSetSwiper =(swiper) =>{
        setFirstSwiper(swiper);
    }

    return (
        <>
            <TitleBar title={title} />
            <TabMenu tabs={tabInit} onSetSwiper={onSetSwiper} ctl ={secondSwiper} />

            <div className={styles['container']}>
                <div className={styles['pd-box']}>
                    <Swiper
                          onSwiper={(swiper) => {
                           setSecondSwiper(swiper);
                           console.log("스위퍼 셋");
                        }}
                        controller={{ control: firstSwiper }}
                        initialSlide={0}
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={(swiper) => {
                                console.log("자식 스위퍼 변환");
                                console.log(swiper);
                        }}
                  
                    >
                        <SwiperSlide>
                            <Message
                                msg={
                                    '전체 예산과 희망 수량을 선택하시면 메뉴 구성을 추천 받으실 수 있습니다.'
                                }
                                isButton={true}
                                onClick={handleOpen}
                                buttonName={'맞춤 주문 하기'}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <MenuItemList />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Message
                                msg={'추천드릴 메뉴 구성이 존재하지 않습니다.'}
                                src={true}
                                isButton={false}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Message
                                msg={
                                    '배달 가능한 매장이 없거나 메뉴가 존재하지 않습니다.'
                                }
                                isButton={false}
                                src={true}
                            />
                        </SwiperSlide>
                    </Swiper>

                    {/* {tab === 'custom' && result ? (
                        <div className={styles['title']}>
                            맞춤 메뉴
                            <CustomItemList />
                        </div>
                    ) : (
                        tab === 'custom' &&
                        !result && (
                            <Message
                                msg={
                                    '전체 예산과 희망 수량을 선택하시면 메뉴 구성을 추천 받으실 수 있습니다.'
                                }
                                isButton={true}
                                onClick={handleOpen}
                                buttonName={'맞춤 주문 하기'}
                            />
                        )
                    )}
                    {tab === 'menu1' && <MenuItemList />}
                    {tab === 'menu2' && (
                        <Message
                            msg={'추천드릴 메뉴 구성이 존재하지 않습니다.'}
                            src={true}
                            isButton={false}
                        />
                    )}
                    {tab === 'menu3' && (
                        <Message
                            msg={
                                '배달 가능한 매장이 없거나 메뉴가 존재하지 않습니다.'
                            }
                            isButton={false}
                            src={true}
                        />
                    )} */}
                </div>
            </div>
            <BottomNav></BottomNav>

            <PreferModal
                open={open}
                handleClose={handleClose}
                itemType={itemType}
                onChangeType={onChangeType}
                budget={budget}
                onChangeBudget={onChangeBudget}
                desireQuan={desireQuan}
                onCustomOrder={onCustomOrder}
                onChangeDesireQune={onChangeDesireQune}
            />
        </>
    );
};
export default ReserveContainer;
