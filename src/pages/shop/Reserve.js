import React,{useEffect} from 'react';
import ReserveContainer from 'containers/shop/ReserveContainer';

function Reserve({match}){
    console.log(match.params);
    const tab = match.params.tab;
    return(
        <>
        <ReserveContainer tab={tab} />
        </>

    )
}
export default Reserve;