import React from 'react';
import FindEmailContainer from 'containers/sign/FindEmailContainer';
import qs from 'qs';

const FindEmail=({location})=>{
    console.log(location);
    const query = qs.parse(location.search,{
        ignoreQueryPrefix: true
    });
    console.log(query);
    const email = query.email;
    return(
        <FindEmailContainer email= {email}/>
    )
}

export default FindEmail;