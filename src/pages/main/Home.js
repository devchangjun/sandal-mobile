import React from 'react';
import HomeContainer from 'containers/main/home/HomeContainer';

function Home ({match}){
    console.log(match.params);
    return(
        <HomeContainer/>
    )
}

export default Home;