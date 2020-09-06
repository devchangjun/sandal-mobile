import React from 'react';
import DetailContainer from '../../containers/shop/DetailContainer';
import qs from 'qs';

function DetailMenu({match,location}){
    // components/listbox/menuItem 에서 넘어옴
    console.log(location);
    const query = qs.parse(location.search,{
        ignoreQueryPrefix: true
    });
    console.log(query);
    return(
        <>
        <DetailContainer menu_name ={query.item_id}/>
        </>

    )
}
export default DetailMenu;