import axios from 'axios';
import { Paths } from '../../paths';

export const getBreakCategory = async () => {
    const req = Paths.api + `user/item/breakfast_cate`;
    axios.defaults.baseURL = req;
    const res = await axios.get();
    return res;
};

export const getBreakMenu = async (ca_id, offset = 0, limit = 100, shop_id) => {
    const req = Paths.api + `user/item/breakfast`;
    axios.defaults.headers.get['Context-Type'] = 'application/json';
    const config = {
        params: {
            ca_id,
            limit,
            offset,
            shop_id,
        },
    };
    const result = await axios.get(req, config);
    return result;
};
