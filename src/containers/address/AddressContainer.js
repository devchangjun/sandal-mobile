/*global kakao*/

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import styles from './Address.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import classNames from 'classnames/bind';
import DeliveryItemList from 'components/address/DeliveryItemList';
import { AiOutlineSearch } from 'react-icons/ai';
import AddressModal from '../../components/modal/AddressModal';
import MapModal from '../../components/modal/MapModal';
import Loading from '../../components/asset/Loading';
import Message from '../../components/message/Message';

import produce from 'immer';
import { getCoordinates } from 'api/address/address';
import { useStore } from '../../hooks/useStore';
import { insertAddress, searchAddress,selectAddress,getDeliveryList ,deleteAddr } from '../../api/address/address';

import { modalOpen } from '../../store/modal';
import { getNearStore } from '../../api/store/store';
import { noAuthGetNearStore } from '../../api/noAuth/store';
import {useInit} from '../../hooks/useStore';
import { ButtonBase } from '@material-ui/core';

const cx = classNames.bind(styles);

// const key = 'devU01TX0FVVEgyMDIwMDcyMzE4MTUzMzEwOTk4NzE';
const AddressContainer = () => {

    const user_token = useStore(false);
    const modalDispatch = useDispatch();
    const initStore = useInit();
    const dispatch = useDispatch();

    const openMessage = useCallback(
        (isConfirm, title, text, handleClick = () => { }) => {
            modalDispatch(modalOpen(isConfirm, title, text, handleClick));
        },
        [modalDispatch],
    );

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [searchAddr, setSearchAddr] = useState(''); //검색
    const [selectAddr, setSelectAddr] = useState(''); //선택
    const [detailAddr, setDetailAddr] = useState(''); //상세주소
    const [searchList, setSearchList] = useState([]); // 검색 리스트
    const [position, setPosition] = useState('');
    const [open, setOpen] = useState(false);
    const [mapOpen, setMapOpen] = useState(false);
    const nextId = useRef(3);
    const [deliveryList, setDeliveryList] = useState([]);
    const [post_num, setPostNum] = useState('');


    const onClickDeliveryItem =()=>{
        
    }

    //검색 아이템 클릭
    const onClickAddrItem = (data, zipNo, index) => {
        setSelectAddr(data);
        setPostNum(zipNo);

    };

    //검색어 변경
    const onChangeSearchAddr = useCallback((e) => {
        setSearchAddr(e.target.value);
    }, []);

    //상세주소 설정
    const onChangeDetailAddr = (e) => {
        setDetailAddr(e.target.value);
    };

    //선택한 주소지 불러오기
    const callDeliveryList = useCallback(async () => {
        setLoading(true);
        if(user_token){
            try{
                const res = await getDeliveryList(user_token);
                console.log(res);
                console.log(res.data.query);
                setDeliveryList(res.data.query);
            }
            catch(e){
                console.error(e);
            }

        }
        else{
            const noAuthAddrs = JSON.parse(localStorage.getItem('noAuthAddrs'));
            if (noAuthAddrs) {
                setDeliveryList(noAuthAddrs);
            }
        }
        setLoading(false);
    }, [user_token]);

    //지도 열기
    const onClickMapOpen = useCallback(() => {
        getUserLocation();
    }, []);

    //지도 닫기
    const onClickMapClose = useCallback(() => {
        setMapOpen(false);
        setDetailAddr('');
        setPosition({ lat: null, lng: null });
    }, []);

    //현재 위치 받아오기
    const getUserLocation = async () => {
        setLoading(true);
        const p = await getCoordinates();
        const lat = p.coords.latitude;
        const lng = p.coords.longitude;
        const newState = { lat: lat, lng: lng };
        setPosition(newState);
        setLoading(false);
        setMapOpen(true);
    };


    //검색창 열기
    const handleClickOpen = () => {
        if (searchAddr === '') {
            alert('검색어를 입력해주세요.');
            return;
        } else {
            setOpen(true);
            onChangeSearch();
        }
    };

    //검색창 닫기
    const handleClose = () => {
        setOpen(false);
        setDetailAddr('');
        setSelectAddr('');
    };

    //엔터키
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClickOpen();
        }
    };

    // 좌표 변경
    const onClickPosition = useCallback((lat, lng) => {
        setPosition({ lat: lat, lng: lng });
    }, []);

    //검색 하기
    const onChangeSearch = async () => {
        if (searchAddr === '') {
            alert('검색어를 입력해주세요.');
            return;
        } else {
            setLoading(true);
            const result = await callSearchApi();
            setSearchList(result);
            console.log(result);
            setLoading(false);
        }
    };

    //검색 api 호출
    const callSearchApi = async () => {
        try{
            const res = await searchAddress(searchAddr);
            return res;
        }
     
        catch(e){
            console.error(e);
        }
    };

    //주소지 삭제
    const onRemoveAddr = useCallback(
        (delivery_id) => {
            console.log(delivery_id);
            openMessage(true, '해당 주소를 삭제하시겠습니까?', '', async () => {
                if (user_token) {
                    try {
                        const res = await deleteAddr(user_token, delivery_id);
                        console.log(res);
                        const index = deliveryList.findIndex((item) => item.delivery_id === delivery_id);

                        //삭제하려는 주소가 활성화 주소라면 배달지 설정 초기화
                        if (deliveryList[index].active === 1) {
                            initStore();
                        }
                        setDeliveryList((list) => list.filter((item) => item.delivery_id !== delivery_id));
                    } catch (e) {
                        
                    }
                } else {
                    const noAuthAddrs = JSON.parse(
                        localStorage.getItem('noAuthAddrs'),
                    );
                    if (noAuthAddrs) {
                        //선택한 주소가 현재 활성 주소일시.
                        if (noAuthAddrs.length !== 0) {
                            if (noAuthAddrs[delivery_id].active === 1) {
                                initStore();
                            }
                            //선택한 주소를 제일 위로 올리기.
                            noAuthAddrs.splice(delivery_id, 1);
                            localStorage.setItem('noAuthAddrs', JSON.stringify(noAuthAddrs));
                            const temp = JSON.parse(localStorage.getItem('noAuthAddrs'));
                            setDeliveryList(temp);
                        }
                    }
                }
            });
        },
        [openMessage, user_token, deliveryList, dispatch],
    );



    //선택한 주소지로 설정 하기
    const onClickDeliveyAddr = useCallback(
            (delivery_id, addr1, addr2, lat, lng, post_num) => {
                openMessage(
                    true,
                    '선택한 주소지로 설정하시겠습니까?',
                    '',
                    async () => {
                        if (user_token) {
                            try {
                                // const res = await selectAddress(user_token, delivery_id);
                                await selectAddress(user_token, delivery_id);
                                const near_store = await getNearStore(lat, lng, addr1);
                                initStore(addr1, addr2, lat, lng, post_num,near_store.data.query);
                       
    
                                callDeliveryList();
                            } catch (e) {
                                
                            }
                        }
                        else {

                            //로컬 스토리지에 있는 아이템을 들고온다.
                            //선택한 주소지가 있다는 것은 로컬스토리지에 아이템이 있다고 판단하고 조건을 뺀다.
                            const noAuthAddrs = JSON.parse(localStorage.getItem('noAuthAddrs'));
    
                            //모든 활성화를 0으로 초기화
                            noAuthAddrs.map((item) => (item.active = 0));
    
                            //선택한 주소를 활성화
                            noAuthAddrs[delivery_id].active = 1;
    
                            //활성화된 스토리지의 주소를 제일 위로 올린다.
                            let tmp = noAuthAddrs[delivery_id];
                            noAuthAddrs.splice(delivery_id, 1);
                            noAuthAddrs.unshift(tmp);
    
                            //활성화된 정보를 갱신
                            localStorage.setItem('noAuthAddrs', JSON.stringify(noAuthAddrs));
    
                            //갱신한 뒤 상태 업데이트 및 리덕스 업데이트
                            const temp = JSON.parse(localStorage.getItem('noAuthAddrs'));
                            setDeliveryList(temp);
                            const near_store = await noAuthGetNearStore(lat, lng, addr1);
                            initStore(addr1, addr2, lat, lng, post_num,near_store.data.query);
    
    
                        }
                    },
                );
            },
            [callDeliveryList,dispatch, openMessage, user_token],
        );


        
    //최근 주소지에 추가
    const onClickDeliveryAddrInsert = async () => {
        console.log("ㅎㅇ");
        if (selectAddr === '') {
            openMessage(
                false,
                '주소가 선택되지 않았습니다.',
                '주소를 선택해주세요.',
            );
        } else if (detailAddr === '') {
            openMessage(
                false,
                '상세 주소를 입력해주세요',
                '상세주소가 입력되지 않았습니다.',
            );
        } else {
            openMessage(
                true,
                '이 주소로 배달지를 설정하시겠습니까?',
                '',
                async () => {
                    if (user_token) {
                        try {
                            var geocoder = new kakao.maps.services.Geocoder();
                            var temp_lat, temp_lng;
                            //선택한 주소의 좌표정보 받아오기
                            geocoder.addressSearch(selectAddr, async function (
                                result,
                                status,
                            ) {
                                // 정상적으로 검색이 완료됐으면
                                if (status === kakao.maps.services.Status.OK) {
                                    temp_lat = result[0].y;
                                    temp_lng = result[0].x;
                                    try {
                                        const res = await insertAddress(
                                            user_token,
                                            post_num,
                                            selectAddr,
                                            detailAddr,
                                            0,
                                            temp_lat,
                                            temp_lng,
                                        );
                                        if (res.data.msg === '성공') {
                                            const near_store = await getNearStore(temp_lat, temp_lng, selectAddr);
                                        
                                           initStore(selectAddr, detailAddr, temp_lat, temp_lng, post_num,near_store.data.query);

                                            callDeliveryList();
                                            setOpen(false);
                                        } else {
                                            openMessage(
                                                false,
                                                res.data.msg,
                                                '주변 매장정보를 확인해 주세요.',
                                            );
                                        }
                                    } catch (e) {
                                        setLoading(false);
                                    }
                                }
                                //검색이 완료되지 않앗으면.
                                else {
                                    setLoading(false);
                                }
                            });
                        } catch (e) {
                            
                        }
                    }
                    //비회원 
                    else {
                        let geocoder = new kakao.maps.services.Geocoder();
                        let temp_lat, temp_lng;
                        //선택한 주소의 좌표정보 받아오기
                        geocoder.addressSearch(selectAddr, async function (
                            result,
                            status,
                        ) {
                            // 정상적으로 검색이 완료됐으면
                            if (status === kakao.maps.services.Status.OK) {
                                temp_lat = result[0].y;
                                temp_lng = result[0].x;

                                try{
                                    const near_store = await noAuthGetNearStore(temp_lat, temp_lng, selectAddr);
                                    if(near_store.data.msg==="배달 가능한 지역이 아닙니다."){
                                        openMessage(
                                            false,
                                            near_store.data.msg,
                                            '주변 매장정보를 확인해 주세요.',
                                        );
                                    }

                                    //배달 가능한 지역이라면
                                    else{
                                        //비회원일시 로컬스토리지에서 아이템을 들고온다.
                                        const noAuthAddrs = JSON.parse(
                                            localStorage.getItem('noAuthAddrs'),
                                        );
                                        //로컬 스토리지에 아이템이 있을시.
                                        if (noAuthAddrs) {
                                            //모든 활성화를 0으로 초기화
                                            noAuthAddrs.map(
                                                (item) => (item.active = 0),
                                            );
                                            //새로운 주소를 푸쉬
                                            noAuthAddrs.push({
                                                addr1: selectAddr,
                                                addr2: detailAddr,
                                                lat: temp_lat,
                                                lng: temp_lng,
                                                post_num: post_num,
                                                active: 1,
                                            });
                                            localStorage.setItem(
                                                'noAuthAddrs',
                                                JSON.stringify(
                                                    noAuthAddrs.reverse(),
                                                ),
                                            );
                                        }
                                        //로컬스토리지에 아이템이 없을시.
                                        else {
                                            localStorage.setItem(
                                                'noAuthAddrs',
                                                JSON.stringify([
                                                    {
                                                        addr1: selectAddr,
                                                        addr2: detailAddr,
                                                        lat: temp_lat,
                                                        lng: temp_lng,
                                                        post_num: post_num,
                                                        active: 1,
                                                    },
                                                ]),
                                            );
                                        }
                                        //모든 작업이 완료 되었다면. 리덕스에 좌표정보저장, 추가된 배열로 상태 업데이트
                                        const test2 = JSON.parse(
                                            localStorage.getItem('noAuthAddrs'),
                                        );
                                    
                                        initStore(selectAddr, detailAddr, temp_lat, temp_lng, post_num,near_store.data.query);
                                        setDeliveryList(test2);
                                        setOpen(false);
                                    }


                                }

                                catch(e){
                                    
                                }
                               
                            }

                            //검색이 완료되지 않앗으면.
                            else {
                                setLoading(false);
                            }
                        });
                    }
                },
            );
        }
    };

    useEffect(() => {
        callDeliveryList();
    }, [callDeliveryList]);

    useEffect(()=>{
        setSelectAddr('');
        setDetailAddr('');
    },[open])
    return (
        <>

            {loading ? (
                <Loading open={true} />
            ) : (
                <>
                    <div className={styles['container']}>
                        <div className={cx('title', 'pd-box')}>
                            배달 받으실 장소를 입력하세요
                        </div>
                        <div className={cx('addr-input', 'pd-box')}>
                            <input
                                className={cx('input-box', 'pd-box')}
                                // placeholder="예) 아주나무동12-3 또는 아주나무 아파트"
                                value={searchAddr}
                                onChange={onChangeSearchAddr}
                                onKeyPress={handleKeyPress}
                            />
                            <div
                                className={cx('search-btn')}
                                onClick={handleClickOpen}
                            >
                                <AiOutlineSearch />
                            </div>
                        </div>
                        <div className={styles['pd-box']}>
                            <ButtonBase
                                className={cx('location-btn')}
                                onClick={onClickMapOpen}
                            >
                                현 위치로 주소 설정
                            </ButtonBase>
                        </div>
                        <div className={styles['recently-title']}>
                            최근 배달 주소
                        </div>
                        <div className={cx('addr-list', 'pd-box')}>
                            {deliveryList.length!==0 ? 
                             <DeliveryItemList 
                             user_token={user_token}
                             addrs={deliveryList} 
                             onClick={onClickDeliveyAddr}
                              onRemove ={onRemoveAddr}/> 
                            :
                            <Message msg={"최근 주소지가 없습니다."}></Message>    
                        }
                        </div>
                    </div>
                    <AddressModal
                        open={open}
                        handleClose={handleClose}
                        searchAddr={searchAddr}
                        onChangeAddr={onChangeSearchAddr}
                        handleKeyPress={handleKeyPress}
                        onSearch={onChangeSearch}
                        addrs={searchList}
                        onClickAddrItem={onClickAddrItem}
                        selectAddr={selectAddr}
                        detailAddr={detailAddr}
                        onChangeDetail={onChangeDetailAddr}
                        onClick= { onClickDeliveryAddrInsert}
                    />
                    <MapModal
                        open={mapOpen}
                        detailAddr={detailAddr}
                        position={position}
                        onClick={onClickDeliveryAddrInsert}
                        onChange={onChangeDetailAddr}
                        handleClose={onClickMapClose}
                        onClickPosition={onClickPosition}
                    />
                </>
            )}
        </>
    );
};

export default AddressContainer;
