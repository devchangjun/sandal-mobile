import React from 'react';
import ReserveContainer from 'containers/shop/ReserveContainer';
import qs from 'qs';

const Reserve = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const menu = query.menu !== undefined ? query.menu : '0';
    return <ReserveContainer menu={parseInt(menu)} />;
}
export default Reserve;
