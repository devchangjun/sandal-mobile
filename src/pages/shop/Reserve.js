import React from 'react';
import ReserveContainer from 'containers/shop/ReserveContainer';
import qs from 'qs';

function Reserve({ location }) {
    const query = qs.parse(location.search,{
        ignoreQueryPrefix: true
    });
    return (
    <ReserveContainer tab={query.menu}/>
    )
}
export default Reserve;
