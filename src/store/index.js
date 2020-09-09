import {combineReducers} from 'redux';
import auth,{auth_saga} from './auth/auth';
import product from './product/product';
import {all} from 'redux-saga/effects';

const rootReducer = combineReducers({auth,product});

export function* rootSaga(){
    yield all([auth_saga()]);
}

export default rootReducer;