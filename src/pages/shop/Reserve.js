import React from 'react';
import ReserveContainer from 'containers/shop/ReserveContainer';

function Reserve({ match }) {
    const tab = match.params.tab;
    return <ReserveContainer tab={tab} />;
}
export default Reserve;
