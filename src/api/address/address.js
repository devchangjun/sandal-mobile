import axios from 'axios';
import { Paths } from '../../paths';
const key= 'devU01TX0FVVEgyMDIwMDgyMzIxNTAzMDExMDA4OTU';

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

export function getCoordinates() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}


export const insertAddress = async (token ,post_num, addr1,addr2,extra,lat,lng) => {
    const req = Paths.api + `user/delivery`;

    const form_data = {
        post_num:post_num,
        addr1:addr1,
        addr2:addr2,
        extra:0,
        lat:lat,
        lng:lng,
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const res = await axios.post(req, form_data);
    return res;
}


export const searchAddress = (searchAddr) =>{
    return fetch(
        `http://www.juso.go.kr/addrlink/addrLinkApi.do?currrentPage=1&countPerPage=100&keyword=${searchAddr}&confmKey=${key}=&resultType=json`,
    )
        .then((res) => res.json())
        .then((json) => json.results.juso)
        .catch((err) => console.log(err));
}