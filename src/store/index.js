import { combineReducers } from 'redux';
import auth, { auth_saga } from './auth/auth';
import { product, bestmenu, breakfast } from './product';
import { address, store } from './address';
import notice from './notice/notice';
import modal from './modal';
import scroll from './scroll';

import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
    auth,
    product,
    bestmenu,
    breakfast,
    address,
    store,
    modal,
    notice,
    scroll,
});

export function* rootSaga() {
    yield all([auth_saga()]);
}

export default rootReducer;
