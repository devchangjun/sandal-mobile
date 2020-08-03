import React from 'react';
import './Button.scss';


const Button =({title, onClick})=>{
    return(
        <div className="sign-btn" onClick ={onClick}>{title}</div>
    )
}

export default Button; 