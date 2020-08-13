import axios from 'axios';

const DEFAULT_URL = "http://devapi.ajoonamu.com/api/";

export const getDeliveryList = async (token) => {

    const req = `${DEFAULT_URL}user/delivery/list`;
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