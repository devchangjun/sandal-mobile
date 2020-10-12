import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useModal } from './useModal';

import { get_address } from '../store/address/address';
import { get_near_store } from '../store/address/store';
import { get_menulist } from '../store/product/product';
import {get_break_menuList} from '../store/product/breakfast'
import {init} from '../store/notice/notice';
import { Paths } from '../paths';


//스토어 초기화 해줘야할때.
//1.로그인시 (주소초기화 , 알림창 초기화 , 가까운가게 초기화)
//2.첫 로딩시 (비회원 주소초기화 , 알림창 초기화 ,가까운 가게 초기화)
//3.로그아웃 시 (비회원 주소초기화 ,알림창 초기화 ,가까운 가게 초기화)
//4. 회원탈퇴시 (비회원 주소 초기화, 알림창 초기화 ,가까운 가게 초기화)
export const useStore = (isReplace = true) => {
    const user_token = sessionStorage.getItem('access_token');
    const history = useHistory();
    const openModal = useModal();

    useEffect(() => {
        if (!user_token && isReplace) {
            openModal(
                '로그인이 필요한 서비스입니다.',
                '로그인 후에 이용해 주세요.',
                ()=> history.replace(Paths.ajoonamu.signin),
                ()=> history.replace(Paths.ajoonamu.signin)
            );
        }
    }, [user_token, history, openModal, isReplace]);

    return user_token;
};

export const useUrl = () => {
    const history = useHistory();
    const location = useLocation();
    const [current, setCurrent] = useState('/');
    const [prev, setPrev] = useState('');

    useEffect(() => {
        setCurrent(location.pathname);
        setPrev(current);
        const obj = {
            current: location.pathname,
            prev: current,
        };
        sessionStorage.setItem('url', JSON.stringify(obj));
    }, [location.pathname]);

    return { prev, current };
};
export const useAddr = () => {
    const user_addr = sessionStorage.getItem('user_addr');
    return user_addr;
};
export const useInit = () => {
    const dispatch = useDispatch();
    const initStore = (
        addr1 = null,
        addr2 = null,
        lat = null,
        lng = null,
        post_num = null,
        near_store = null,
    ) => {
        console.log('스토어 초기화');
        dispatch(init());
        dispatch(get_address({ addr1, addr2, lat, lng, post_num }));
        dispatch(get_near_store(near_store));
        dispatch(get_menulist(null));
        dispatch(get_break_menuList(null));
    };
    return initStore;
};
