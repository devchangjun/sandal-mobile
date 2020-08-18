import * as auth_api from '../../api/auth/auth';
import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';

const GET_USERINFO = "auth/GET_USERINFO";
const GET_USERINFO_SUCCEED = "auth/GET_USERINFO_SUCCEED";
const GET_USERINFO_ERROR = "auth/GET_USERINFO_ERROR";

const LOGOUT = "auth/LOGOUT";

export const get_user_info = createAction(GET_USERINFO)
export const logout =createAction(LOGOUT);

const initState = {
    loading: false,
    error: false,
    succeed: false,
    user: null,
}


function* get_user_info_saga(action) {
    console.log(action);
    try {
        const res = yield call(auth_api.getUserInfo, action.payload);
        yield put(
            {
                type: GET_USERINFO_SUCCEED,
                payload: res
            }
        )
    }
    catch (e) {
        yield put({
            type: GET_USERINFO_ERROR,
            payload: e
        })
    }

}

export function* auth_saga() {
    yield takeEvery(GET_USERINFO, get_user_info_saga);
}

const auth = handleActions({
    [GET_USERINFO]: (state, action) => ({
        ...state,
        loading: true
    }),
    [GET_USERINFO_SUCCEED]: (state, action) => ({
        ...state,
        loading: false,
        succeed: true,
        user: action.payload

    }),
    [GET_USERINFO_ERROR]: (state, action) => ({
        ...state,
        error: true,
    }),
    [LOGOUT]: (state, action) => ({
        ...state,
        loading: false,
        succeed: false,
        user: null
    })
}, initState);

export default auth;

