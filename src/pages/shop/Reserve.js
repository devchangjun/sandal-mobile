import React from 'react';
import ReserveContainer from 'containers/shop/ReserveContainer';
import qs from 'qs'
function Reserve({location}) {

    const query = qs.parse(location.search,{
        ignoreQueryPrefix: true
    });
    console.log(query.menu);
    return (
    <ReserveContainer menu={parseInt(query.menu)}/>
    )
}
export default Reserve;
