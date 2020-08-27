import React from 'react';
import ReserveContainer from 'containers/shop/ReserveContainer';
import qs from 'qs';

function Reserve({location }) {
    const query = qs.parse(location.search,{
        ignoreQueryPrefix: true
    });
    const menu_id = query.menu;
    return <ReserveContainer tab={menu_id}/>;
}
export default Reserve;
