import React from 'react';
import ReserveContainer from 'containers/shop/ReserveContainer';
import qs from 'qs';
function Reserve({ location }) {
    console.log(location);
    const query = qs.parse(location.search,{
        ignoreQueryPrefix: true
    });
    return <ReserveContainer />;
}
export default Reserve;
