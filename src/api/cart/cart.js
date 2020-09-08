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
    console.log(res.data.query);
    return res.data.query;
};


export const addCartItem =async (token,item_id,item_options, item_quanity)=>{
    console.log(item_options);
    const req = Paths.api + 'user/cart';
    const form_data = {
       item_id : item_id,
       item_option_id :item_options,
       item_quanity: item_quanity
    };
    console.log(form_data);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.post(req, form_data);
    console.log(res)
    return res;
}