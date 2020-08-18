import React from 'react';
import CouponContainer from 'containers/coupon/CouponContainer';

const Coupon=({match})=>{
    // const tab= match.params.tab ? match.params.tab : "mycoupon";
    return(
        <CouponContainer tab={match.params.tab ? match.params.tab : "mycoupon"}/>
    )
}
export default Coupon;