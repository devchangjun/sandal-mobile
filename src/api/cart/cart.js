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
    const res = await axios.get(req, config);
    console.log(res);
    return res;
};

export const addCartItem = async (
    token,
    item_id,
    item_options,
    item_quanity,
) => {
    console.log(item_options);
    const req = Paths.api + 'user/cart';
    const form_data = {
        item_id: item_id,
        item_option_id: item_options,
        item_quanity: item_quanity,
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.post(req, form_data);
    return res;
};

export const deleteCartItem = async (token, cart_id) => {
    const req = Paths.api + 'user/cart/delete';
    const form_data = { cart_id };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const res = await axios.delete(req, {
        data: form_data
    });
    return res;
}