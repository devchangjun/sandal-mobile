import React from 'react';
import {Route} from 'react-router-dom';
import SignCompleteContainer from 'containers/sign/SignCompleteContainer';

const SignupComplete =({match})=>{
    console.log(match.params.name);
    return(
        <SignCompleteContainer name={match.params.name}/>
        // <Route path={`${match.url}/:name`} component={SignCompleteContainer}> </Route>
    )
}

export default SignupComplete;