import {combineReducers} from 'redux';
import auth,{auth_saga} from './auth/auth';
import {all} from 'redux-saga/effects';

const rootReducer = combineReducers({auth});

export function* rootSaga(){
    yield all([auth_saga()]);
}

export default rootReducer;