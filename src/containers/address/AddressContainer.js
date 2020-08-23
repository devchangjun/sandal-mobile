import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Address.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import classNames from 'classnames/bind';
import DeliveryItemList from 'components/address/DeliveryItemList';
import { AiOutlineSearch } from 'react-icons/ai';
import AddressModal from 'components/asset/AddressModal';
import { getDeliveryList } from '../../api/address/address';
import produce from 'immer';


const cx = classNames.bind(styles);
// Address Branch Commit

const key = 'devU01TX0FVVEgyMDIwMDcyMzE4MTUzMzEwOTk4NzE';
const AddressContainer = () => {
    const [searchAddr, setSearchAddr] = useState(''); //검색
    const [selectAddr, setSelectAddr] = useState(''); //선택
    const [detailAddr, setDetailAddr] = useState(''); //상세주소
    const [addrs, setAddrs] = useState(''); // 검색 리스트

    const [open, setOpen] = useState(false);
    const nextId = useRef(3);
    const [delivery_addrs, setDeliveryAddrs] = useState([]);

    const onClickAddrItem = (data) => setSelectAddr(data);

    const onChangeSearchAddr = useCallback((e) => {
        setSearchAddr(e.target.value);
    }, []);
    const onChangeDetail = (e) => setDetailAddr(e.target.value);

    const onAddrList = useCallback(async () => {
        const token = sessionStorage.getItem('access_token');
        const res = await getDeliveryList(token);
        console.log(res.data.query);
        setDeliveryAddrs(res.data.query);
    }, []);

    //토큰 없으면 에러.
    useEffect(() => {
        onAddrList();
    }, [onAddrList]);

    const renderAddrList = useCallback(() => {
        return (
            <>
                <DeliveryItemList addrs={delivery_addrs} />
            </>
        );
    }, [delivery_addrs]);

    const handleClickOpen = () => {
        if (searchAddr === '') {
            alert('검색어를 입력해주세요.');
            return;
        } else {
            setOpen(true);
            onChangeSearch();
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClickOpen();
        }
    };

    const onClickInsertAddr = () => {
        setOpen(false);
        const item = {
            id: nextId.current,
            jibunAddr: selectAddr,
            roadAddr: detailAddr,
        };
        setDeliveryAddrs(
            produce(delivery_addrs, (draft) => {
                draft.push(item);
            }),
        );
        setDetailAddr('');
    };

    const onChangeSearch = async () => {
        if (searchAddr === '') {
            alert('검색어를 입력해주세요.');
            return;
        } else {
            const result = await callApi();
            setAddrs(result);
            console.log(result);
        }
    };

    const callApi = () => {
        return fetch(
            `http://www.juso.go.kr/addrlink/addrLinkApi.do?currrentPage=1&countPerPage=100&keyword=${searchAddr}&confmKey=${key}=&resultType=json`,
        )
            .then((res) => res.json())
            .then((json) => json.results.juso)
            .catch((err) => console.log(err));
    };

    return (
        <>
            <TitleBar title={'주소설정'} />
            <div className={styles['container']}>
                <div className={cx('title','pd-box')}>
                    배달 받으실 장소를 입력하세요
                </div>
                <div className={cx('addr-input','pd-box')}>
                    <input
                        className={cx('input-box','pd-box')}
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
                <div className={cx('location-btn')}>현위치로 주소 설정</div>
                </div>
                   <div className={styles['recently-title']}>최근 배달 주소</div>
                <div className={cx('addr-list','pd-box')}>
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
                addrs={addrs}
                onClickAddrItem={onClickAddrItem}
                selectAddr={selectAddr}
                detailAddr={detailAddr}
                onChangeDetail={onChangeDetail}
                onInsertAddr={onClickInsertAddr}
            />
        </>
    );
};

export default AddressContainer;
