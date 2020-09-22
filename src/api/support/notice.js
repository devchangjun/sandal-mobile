import axios from 'axios';
import { Paths } from '../../paths';

export const requestNoticeList = async (token) => {
    const req = Paths.api + 'user/notice/list';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const result = await axios.get(req, config);
    return result.data.query;
}

