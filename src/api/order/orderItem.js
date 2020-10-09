import axios from 'axios';
import { Paths } from '../../paths';

export const getOrderList = async (token) => {
    const req = Paths.api + 'user/order/list';
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.get(req, config);
    return res;
};

export const getDetailOrderView = async (token,order_id) =>{
    const req = Paths.api + `user/order/view?order_id=${order_id}`;
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.get(req, config);
    console.log(res);
    return res.data.query;
}