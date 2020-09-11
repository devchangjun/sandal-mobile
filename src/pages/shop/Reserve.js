import React from 'react';
import ReserveContainer from 'containers/shop/ReserveContainer';
import qs from 'qs'
function Reserve({location}) {

    const query = qs.parse(location.search,{
        ignoreQueryPrefix: true
    });
    console.log(query.menu);
    let menu = query.menu;
    if(menu===undefined){
        menu='0';
    }
    return (
    <ReserveContainer menu={parseInt(menu)}/>
    )
}
export default Reserve;
