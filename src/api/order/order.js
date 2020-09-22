import axios from 'axios';
import { Paths } from '../../paths';

export const user_order = async (
    token,
//     order_type,
//     cp_id,
//     order_memo,
//     delivery_memo,
) => {
    const req = Paths.api + 'user/order';

    const form_data = {
        order_type: 'reserve',
        order_memo: '빨리좀',
        delivery_memo: '주세요',
    };

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.post(req, form_data);
    return res;
};
