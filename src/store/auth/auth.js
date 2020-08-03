import * as auth_api from '../../api/auth/auth';
import { call, put, takeEvery, getContext } from 'redux-saga/effects';

const GET_USERINFO = "GET_USERINFO";
const GET_USERINFO_SUCCEED = "GET_USERINFO_SUCCEED";
const GET_USERINFO_ERROR = "GET_USERINFO_ERROR";


export const get_user_info = (token) => ({
    type: GET_USERINFO,
    token,
});

const initState = {
    loading: false,
    error: false,
    succeed: false,
    user: null,
}


function* get_user_info_saga(action) {
    console.log(action);
    try {
        const res = yield call(auth_api.getUserInfo, action.token);
        console.log(res);
        yield put(
            {
                type: GET_USERINFO_SUCCEED,
                payload :res
            }
        )
    }
    catch(e){
        yield put({
            type: GET_USERINFO_ERROR,
            payload :e 
        })
    }

}

export function* auth_saga() {
    yield takeEvery(GET_USERINFO, get_user_info_saga);
}

export default function auth(state = initState, action) {
    switch (action.type) {
        case GET_USERINFO:
            console.log("유저정보 들고오기");
            return {
                ...state,
                loading: true,
            }
        case GET_USERINFO_SUCCEED:
            console.log("정보들고오기 성공");
            return {
                ...state,
                loading: false,
                succeed: true,
                user: action.payload
            }
        case GET_USERINFO_ERROR:
            console.log("에러");
            return {
                ...state,
                error: true,
            }
        default:
            return state
    }
}