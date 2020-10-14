import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

const GET_PREFER_MENU = 'prefer/GET_PREFER_MENU';
const GET_GENERAL_MENU = 'prefer/GET_GENERAL_MENU';
const ADD_PREFER_MENU = 'prefer/ADD_PREFER_MENU';
const ADD_GENERAL_MENU = 'prefer/ADD_GENERAL_MENU';


export const get_prefer_list = createAction(GET_PREFER_MENU);
export const get_general_list = createAction(GET_GENERAL_MENU);
export const add_prefer_list = createAction(ADD_PREFER_MENU)
export const add_gernal_list = createAction(ADD_GENERAL_MENU)


const initState = {
    prefer_items: [],
    general_items: [],
};

const prefer = handleActions(
    {

        [GET_PREFER_MENU]: (state, action) => {
            return{
                ...state,
                prefer_items: action.payload,
            }
        },
        [GET_GENERAL_MENU]: (state, action) => ({
            ...state,
            general_items: action.payload,
        }),
    },
    initState,
);

export default prefer;
