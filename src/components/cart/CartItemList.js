import React from 'react';
import CartItem from 'components/cart/CartItem';


const CartItemList = (props) => {
    console.log(props);

    const list = props.carts.map((cart,index) =>(
            <CartItem 
            id={index} 
            key={index} 
            {...cart} 
            handleCheckChild={props.handleCheckChild}
            handleIncrement={props.handleIncrement} 
            handleDecrement={props.handleDecrement}
            />

    ));
    return (
        <div>
            {list}
            {/* <CartItem {...props.carts}/> */}
        </div>
    )
}

export default React.memo(CartItemList);