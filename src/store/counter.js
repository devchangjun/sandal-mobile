import { call, put, takeEvery, getContext } from 'redux-saga/effects';


const INCREMENT = "counter/INCREMENT";
const DECREMENT = "counter/DECREMENT";

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

const initialState = {
    number: 1
};


function counter(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                number: state.number + 1
            };
        case DECREMENT:
            return {
                number: state.number - 1
            }
        default:
            return state;
    }
};

export default counter;