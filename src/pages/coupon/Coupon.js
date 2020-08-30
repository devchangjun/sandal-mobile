import React from 'react';
import CouponContainer from 'containers/coupon/CouponContainer';

export default ({ match }) => <CouponContainer tab={match.params.tab ? match.params.tab : 'mycoupon'} />;
