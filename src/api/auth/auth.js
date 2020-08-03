import axios from 'axios';

const DEFAULT_URL = "http://devapi.ajoonamu.com/api/";

export const getUserInfo = async (token) => {
    console.log("들어옴" + token);
    const req = DEFAULT_URL + "user/me";
    // console.log(req);
    const config = {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }
    const post_type ={
        'Content-Type': 'application/json',
    }
    axios.defaults.baseURL = req;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const res = await axios.post();
    console.log(res.data);
    return res.data;
}

export const localLogin = async (email, password) => {
    const req = DEFAULT_URL + "user/login";

    const form_data = {
        email: email,
        password: password
    }
    const res = await axios.post(req, form_data);
    console.log(res);
    return res;
}

export const localRegister = async (email, password, password_confirm) => {

    const req = DEFAULT_URL + "user/register";
    const form_data = {

        email: email,
        password: password,
        password_confirm: password_confirm,
        agree_marketing: 0,

    }

    const res = await axios.post(req, form_data);
    console.log(res);
    return res;
}


