import axios from 'axios';
import { Paths } from '../../paths';

export const user_order = async (
    token,
    order_type,
    order_memo,
    delivery_memo,
    delivery_req_time,
    cp_id,
    point_price = 0,
) => {
    const req = Paths.api + 'user/order';
    let form_data;
    if (cp_id === null) {
        form_data = {
            order_type: 'reserve',
            order_memo: order_memo,
            delivery_memo: delivery_memo,
            delivery_req_time: delivery_req_time,
            point_price: point_price,
            device: 'mobile',
        };
    } else {
        form_data = {
            order_type: 'reserve',
            order_memo: order_memo,
            delivery_memo: delivery_memo,
            delivery_req_time: delivery_req_time,
            cp_id: cp_id,
            point_price: point_price,
            device: 'mobile',
        };
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const res = await axios.post(req, form_data);
    return res;
};

export const order_cancle = async (token, order_id) => {
    const req = Paths.api + 'user/order/cancel';

    const form_data = {
        order_id: order_id,
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const res = await axios.put(req, form_data);
    return res;
};
