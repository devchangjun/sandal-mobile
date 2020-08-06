import React from 'react';
import './Button.scss';

//fixed button

const Button =({title, onClick})=>{
    return(
        <div className="btn" onClick ={onClick}>{title}</div>
    )
}

export default Button; 