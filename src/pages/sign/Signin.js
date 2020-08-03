import React from 'react';
import SignInContainer from 'containers/sign/SignInContainer';
function Signin ({match}){
    console.log(match.url);
    return(
        <SignInContainer/>
    )
}

export default Signin;