import axios from 'axios';
import { Paths } from '../../paths';

export const getDeliveryList = async (token) => {

    const req = `${Paths.api}user/delivery/list`;
    const params = {
        params: {
            lat: 37.182183,
            lng: 129.227344
        }
    }

    axios.defaults.baseURL = req;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.get['Context-Type'] = 'application/json';
    axios.defaults.params = params;
    const res = await axios.get();
    return res;

}