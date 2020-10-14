import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

const GET_PREFER_MENU = 'prefet/GET_PREFER_MENU';
const GET_GERNAL_MENU = 'prefet/GET_GERNAL_MENU';


export const get_prefer_list = createAction(GET_PREFER_MENU);
export const get_gernal_list = createAction(GET_GERNAL_MENU);

const initState = {
    prefer_items: [],
    gernal_items: [],
};

const prefer = handleActions(
    {

        [GET_PREFER_MENU]: (state, action) => ({
            ...state,
            prefer_items: action.payload,
        }),
        [GET_PREFER_MENU]: (state, action) => ({
            ...state,
            gernal_items: action.payload,
        }),
    },
    initState,
);

export default prefer;
