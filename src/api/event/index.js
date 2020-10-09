import axios from 'axios';
import { Paths } from '../../paths';

export const requestEventPost = async (id) => {
    const req = Paths.api + 'user/event/show';
    const config = {
        params: {
            event_id: id
        }
    }
    const res = await axios.get(req, config);
    return res;
}

export const requestEventList = async () => {
    const req = `${Paths.api}user/event/list`;
    const res = await axios.get(req);
    return res;
};
