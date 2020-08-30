import axios from 'axios';
import { Paths } from '../../paths';

export const getCartList = async (token) => {
    const req = Paths.api + 'user/cart/list';
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const result = await axios.get(req, config);
    console.log(result.data.query);
    return result.data.query;
};
