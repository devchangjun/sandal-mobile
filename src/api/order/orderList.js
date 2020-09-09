import axios from 'axios';
import { Paths } from '../../paths';

export const getOrderList = async (token) => {
    const req = Paths.api + 'user/cart/list';
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.get(req, config);
    console.log(res.data.query);
    return res.data.query;
};