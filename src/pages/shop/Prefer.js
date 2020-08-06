import React,{useEffect} from 'react';
import PreferContainer from 'containers/shop/PreferContainer';

function Prefer({match}){
    console.log(match.params);
    const tab = match.params.tab;
    return(
        <>
        <PreferContainer tab={tab} />
        </>

    )
}
export default Prefer;