import axios from 'axios';
import { Paths } from '../../paths';

export const getCompanyInfo = async (token) => {
    const req = Paths.api + 'user/company/main';
    axios.defaults.baseURL = req;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const res = await axios.get();
    return res;
};