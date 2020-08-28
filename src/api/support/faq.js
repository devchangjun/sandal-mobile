import axios from 'axios';
import { Paths } from '../../paths';

export const requestFAQList = async (token, faq_type) => {
    const req = Paths.api + 'user/faq/list';
    const params = {
        faq_type
    };
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params
    };
    const result = await axios.get(req, config);
    return result.data.query;
}