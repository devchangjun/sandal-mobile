import axios from 'axios';
import { Paths } from '../../paths';

export const getCategory = async (token) => {
    const req = Paths.api + 'user/category/list';
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const result = await axios.get(req, config);
    return result.data.query.categorys;
};
