import React from 'react';
import SignCompleteContainer from 'containers/sign/SignCompleteContainer';
import qs from 'qs';

const SignupComplete =({match,location})=>{
    console.log(match.params.name);
    console.log(location);
    const query = qs.parse(location.search,{
        ignoreQueryPrefix: true
    });
    console.log(query);
    return(
        <SignCompleteContainer name={query.name}/>
    )
}

export default SignupComplete;