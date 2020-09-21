import { createAction, handleActions } from 'redux-actions';

const GET_CATEGORY = 'product/GET_CATEGORY';
const GET_MENULIST = 'product/GET_MENULIST';

export const get_catergory = createAction(GET_CATEGORY);
export const get_menulist = createAction(GET_MENULIST);

const initState = {
    categorys: [
        {
            ca_id: 0,
            ca_name: '추천메뉴',
            ca_order: 0,
            ca_use: 1,
        },
    ],
    items: null,
    name: 'test',
};

const product = handleActions(
    {
        [GET_CATEGORY]: (state, action) => ({
            ...state,
            categorys: state.categorys.concat(action.payload),
        }),
        [GET_MENULIST]: (state, action) => ({
            ...state,
            items: action.payload,
        }),
    },
    initState,
);

export default product;
