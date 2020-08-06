import React,{useEffect} from 'react';
import DetailContainer from '../../containers/shop/DetailContainer';

function DetailMenu({match}){
    // components/listbox/menuItem 에서 넘어옴
    console.log(match.params);
    return(
        <>
        <DetailContainer match={match}/>
        </>

    )
}
export default DetailMenu;