import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

const GET_NOTICE = 'notice/GET_NOTICE';
const REMOVE_NOTICE = 'notice/REMOVE_NOTICE';
const READ_NOTICE = 'notice/READ_NOTICE';
const READ_ALL_NOTICE = 'notcie/READ_ALL_NOTICE';

export const get_notice = createAction(GET_NOTICE);
export const remove_notice = createAction(REMOVE_NOTICE);
export const read_notice = createAction(READ_NOTICE);
export const read_all_notice = createAction(READ_ALL_NOTICE);



const initState = {
    notification:[]
};


const notice = handleActions(
    {
        [GET_NOTICE]: (state, action) => {
            console.log(action);
            return{
                ...state,
                notification: state.notification.concat(action.payload),
            }
        },
        [REMOVE_NOTICE]: (state, action) => ({
            ...state,
            notification: state.notification.filter((item)=> item.not_id !==action.payload )
        }),
        [READ_NOTICE]: (state, action) => {
            const {notification} = state;
            const {not_id, not_read_datetime} = action.payload
           const newState = notification.map((item)=> item.not_id ===not_id ? { ...item , not_read_datetime : not_read_datetime} : item);
            return{
                ...state,
                notification: newState
            }
        },
        [READ_ALL_NOTICE]: (state, action) => {
            const {notification} = state;
            const {not_id, not_read_datetime} = action.payload
           const newState = notification.map((item) => ({...item, not_read_datetime: not_read_datetime}));
           return{
            ...state,
            notification: newState
        }
        }

    },
    initState,
);

export default notice;


