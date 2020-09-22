import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Address.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import classNames from 'classnames/bind';
import DeliveryItemList from 'components/address/DeliveryItemList';
import { AiOutlineSearch } from 'react-icons/ai';
import AddressModal from 'components/modal/AddressModal';
import MapModal from 'components/modal/MapModal';
import { getDeliveryList } from '../../api/address/address';
import produce from 'immer';
import { getCoordinates } from 'api/address/address';
import { useStore } from '../../hooks/useStore';
import { insertAddress, searchAddress } from '../../api/address/address';
import Loading from '../../components/asset/Loading';

const cx = classNames.bind(styles);

// const key = 'devU01TX0FVVEgyMDIwMDcyMzE4MTUzMzEwOTk4NzE';
const AddressContainer = () => {
    const user_token = useStore();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [searchAddr, setSearchAddr] = useState(''); //검색
    const [selectAddr, setSelectAddr] = useState(''); //선택
    const [detailAddr, setDetailAddr] = useState(''); //상세주소
    const [addrList, setAddrList] = useState(''); // 검색 리스트
    const [position, setPosition] = useState('');
    const [open, setOpen] = useState(false);
    const [mapOpen, setMapOpen] = useState(false);
    const nextId = useRef(3);
    const [delivery_addrs, setDeliveryAddrs] = useState([]);


    const onClickDeliveryItem =()=>{
        
    }

    //검색 아이템 클릭
    const onClickSearchItem = (data) => {
        setSelectAddr(data);
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
    const callAddrListApi = useCallback(async () => {
        const res = await getDeliveryList(user_token);
        console.log(res.data.query);
        setDeliveryAddrs(res.data.query);
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
        console.log(newState);
        setPosition(newState);
        setLoading(false);
        setMapOpen(true);
    };

    //최근 배달주소 렌더
    const renderAddrList = useCallback(() => {
        return <DeliveryItemList addrs={delivery_addrs} />;
    }, [delivery_addrs]);

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
        console.log(lat);
        console.log(lng);
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
            setAddrList(result);
            console.log(result);
            setLoading(false);
        }
    };

    //검색 api 호출
    const callSearchApi = async () => {
        const res = await searchAddress(searchAddr);
        return res;
    };

    //최근 주소지에 추가
    const onClickDeliveryAddrInsert = async (jibun, road) => {
        const { lat, lng } = position;
        const res = await insertAddress(
            user_token,
            10,
            jibun,
            detailAddr,
            0,
            lat,
            lng,
        );
        console.log(res);
        callAddrListApi();
        setMapOpen(false);
    };

    useEffect(() => {
        callAddrListApi();
    }, [callAddrListApi]);

    return (
        <>
            <TitleBar title={'주소설정'} />

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
                            <div
                                className={cx('location-btn')}
                                onClick={onClickMapOpen}
                            >
                                현위치로 주소 설정
                            </div>
                        </div>
                        <div className={styles['recently-title']}>
                            최근 배달 주소
                        </div>
                        <div className={cx('addr-list', 'pd-box')}>
                            {delivery_addrs && renderAddrList()}
                        </div>
                    </div>
                    <AddressModal
                        open={open}
                        handleClose={handleClose}
                        searchAddr={searchAddr}
                        onChangeAddr={onChangeSearchAddr}
                        handleKeyPress={handleKeyPress}
                        onSearch={onChangeSearch}
                        addrs={addrList}
                        onClickAddrItem={onClickSearchItem}
                        selectAddr={selectAddr}
                        detailAddr={detailAddr}
                        onChangeDetail={onChangeDetailAddr}
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
