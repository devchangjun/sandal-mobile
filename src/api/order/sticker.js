import axios from 'axios';
import { Paths } from '../../paths';

export const requestPostPhraseSerive = async (token, {
    order_id,
    sticker_logo,
    sticker_text
}) => {
    const req = Paths.api + 'user/sticker';

    console.log(sticker_logo);
    console.log(order_id);
    console.log(sticker_text);
    const formData = new FormData();
    console.log('?');
    formData.append('order_id', order_id);
    sticker_logo.forEach(logo => formData.append('sticker_logo[]', logo, logo.name));
    formData.append('sticker_text', sticker_text);
    console.log('?');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers['Context-Type'] = 'multipart/form-data';
    console.log('?');
    const res = await axios.post(req, formData);
    return res;
};
