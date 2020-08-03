import React from 'react';
import Counter from './Counter';
import {increment,decrement} from '../store/counter';
import {useSelector, useDispatch} from 'react-redux';

function CounterContainer() {
  
    const {number} = useSelector(state => state.counter);
    const dispatch = useDispatch();
  
    const onIncrement = () => {
      dispatch(increment());
    };

    const onDecrement = () => {
      dispatch(decrement());
    };

    return (
      <Counter number={number} onIncrement={onIncrement} onDecrement={onDecrement} />
    );
  }
  
  export default CounterContainer;