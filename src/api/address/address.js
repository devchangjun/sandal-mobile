import axios from 'axios';
import { Paths } from '../../paths';

const URL = 'http://www.juso.go.kr/addrlink/addrLinkApi.do';
const KEY = 'devU01TX0FVVEgyMDIwMDgyMzIxNTAzMDExMDA4OTU=';


export const getDeliveryList = async (token) => {
    const req = `${Paths.api}user/delivery/list`;
    axios.defaults.baseURL = req;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.get['Context-Type'] = 'application/json';
    const res = await axios.get();
    return res;
}

export function getCoordinates() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}


export const insertAddress = async (
    token,
    post_num,
    addr1,
    addr2,
    extra,
    lat,
    lng,
) => {
    const req = Paths.api + `user/delivery`;

    const form_data = {
        post_num: post_num,
        addr1: addr1,
        addr2: addr2,
        extra: 0,
        lat: lat,
        lng: lng,
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const res = await axios.post(req, form_data);
    return res;
};


export const selectAddress = async (token, delivery_id) => {
    const req = Paths.api + 'user/delivery/update';
    const form_data = {
        delivery_id: delivery_id,
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.put(req, form_data);
    return res;
};


export const getActiveAddr = async (token) => {
    const req = `${Paths.api}user/delivery/list`;
    axios.defaults.baseURL = req;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.get['Context-Type'] = 'application/json';
    const res = await axios.get();

    const { query } = res.data;
    let len = Object.keys(query).length;
    for (let i = 0; i < len; i++) {
        if (query[i].active === 1) {
            const { addr1, addr2, lat, lng, post_num } = query[i];
            return { addr1, addr2, lat, lng, post_num };
        }
    }
    return null;
};



export const deleteAddr = async (token, delivery_id) => {
    const req = Paths.api + 'user/delivery/delete';
    const form_data = { delivery_id };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const res = await axios.delete(req, {
        data: form_data,
    });
    return res;
};


export const searchAddress = (searchAddr) => {
    return fetch(
        `${URL}?confmKey=${KEY}&currentPage=1&countPerPage=10&keyword=${searchAddr}&resultType=json`,
    )
        .then((res) => res.json())
        .then((json) => json.results.juso)
        .catch((err) => console.log(err));
};


export const getPostNum = (addr1) => {
    return fetch(
        `${URL}?confmKey=${KEY}&currentPage=1&countPerPage=10&keyword=${addr1}&resultType=json`,
    )
        .then((res) => res.json())
        .then((json) => json.results.juso)
        .catch((err) => console.log(err));
};



