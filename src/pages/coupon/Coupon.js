import React from 'react';
import CouponContainer from 'containers/coupon/CouponContainer';

const Coupon=({match})=>{
    console.log("탭 확인");
    console.log(match);
    return(
        <CouponContainer tab={match.params.tab}/>
    )
}
export default Coupon;