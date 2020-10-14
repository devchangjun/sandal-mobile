import axios from 'axios';
import { Paths } from '../../paths';

//지점 검색
export const getStoreList = async (search, offset, limit) => {
    const req = Paths.api + 'user/shop/list';
    axios.defaults.headers.get['Context-Type'] = 'application/json';

    const config = {
        params: {
            search,
            limit,
            offset,
        },
    };

    const res = await axios.get(req, config);
    return res;
};

export const getNearStore = async (lat, lng, addr1) => {
    const req = Paths.api + 'user/delivery/select';
    axios.defaults.headers.get['Context-Type'] = 'application/json';

    const config = {
        params: {
            lat,
            lng,
            addr1,
        },
    };

    const res = await axios.get(req, config);
    return res;
};
