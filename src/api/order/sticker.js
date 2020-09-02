import axios from 'axios';
import { Paths } from '../../paths';

export const requestPostPhraseSerive = async (token, {
    order_id,
    sticker_logo,
    sticker_text
}) => {
    const req = Paths.api + 'user/sticker';

    const formData = new FormData();

    formData.append('order_id', order_id);
    formData.append('sticker_logo', [sticker_logo]);
    formData.append('sticker_text', sticker_text);
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.post(req, formData);
    return res;
};
