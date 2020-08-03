import * as sign_api from '../../api/auth/auth';
import { call, put, takeEvery, getContext } from 'redux-saga/effects';


const LOCAL_LOGIN = "LOCAL_LOGIN";
const LOCAL_LOGIN_SUCCEED = "LOCAL_LOGIN_SUCCEED";
const LOCAL_LOGIN_ERROR = "LOCAL_LOGIN_ERROR";

const GET_TOKEN ="GET_TOKET";

export const local_login = (email, password) => ({
    type: LOCAL_LOGIN,
    email,
    password
});

const initState = {
    loading: false,
    error: false,
    succeed: false,
    auth :[],
    token :'',
}

function* local_login_saga(action) {
    console.log(action);
    try {
        const res = yield call(sign_api.localLogin, action.email, action.password);
        console.log(res);
        window.sessionStorage.setItem('access_token',res.access_token);
        yield put({
            type: LOCAL_LOGIN_SUCCEED,
            payload: res,
        });
    }
    catch (e) {
        yield put({
            type: LOCAL_LOGIN_ERROR,
            payload: e
        })
    }

}

export function* signin_saga() {
    yield takeEvery(LOCAL_LOGIN, local_login_saga);

}

export default function signin(state = initState, action) {

    switch (action.type) {
        case LOCAL_LOGIN:
            console.log("로그인")
            return {
                loading:true,
                error: false,
                succeed : false,
                token : '',
                auth : []
            }
        case LOCAL_LOGIN_SUCCEED:
            console.log("로그인 성공")
            return {
                loading:false,
                error: false,
                succeed : true,
                token : action.payload.access_token,
                auth : action.payload.user
            }
        case LOCAL_LOGIN_ERROR:
            console.log("로그인에러");
            return{
                loading:false,
                error: true,
                succeed:false,
                token :'',
                auth:[],
            }

        default:
            return state;
    }

}