import axios from 'axios';
import {Paths} from '../../paths';

export const getMyCoupons = async (token) =>{
    const req = Paths.api +'user/coupon/list_my';
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const result = await axios.get(req, config);
    return result.data.query;
}