import axios from 'axios';
import { Paths } from '../../paths';

export const noAuthGetNearStore = async (lat, lng, addr1) => {
    const req = Paths.api + 'user/shop/near';
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
