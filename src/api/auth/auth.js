import axios from 'axios';
import { Paths } from '../../paths';

export const getUserInfo = async (token) => {
    const req = Paths.api + 'user/me';
    axios.defaults.baseURL = req;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const res = await axios.post();
    return res.data;
};

export const requestAgreeChange = async (token, type, value) => {
    const req = Paths.api + 'user/mypage/agree_' + type;
    const form_data = {
        ['agree_' + type]: value,
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.put(req, form_data);
    return res;
};

export const updateName = async (token, value) => {
    const req = Paths.api + 'user/mypage/update_name';
    const form_data = {
        name: value,
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.put(req, form_data);
    return res;
};

export const updatePhone = async (token, value) => {
    const req = Paths.api + 'user/mypage/update_hp';
    const form_data = {
        hp: value,
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.put(req, form_data);
    return res;
};

export const updatePassword = async (token, pw_o, pw, pw_c) => {
    const req = Paths.api + 'user/mypage/update_pw';
    const form_data = {
        pw_o,
        pw,
        pw_c
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.put(req, form_data);
    return res;
};

export const localLogin = async (email, password) => {
    const req = Paths.api + 'user/login';
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const form_data = {
        email: email,
        password: password,
    };
    const res = await axios.post(req, form_data);
    return res;
};

export const localLogout = async (token) => {
    const req = Paths.api + 'user/logout';
    axios.defaults.baseURL = req;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const res = await axios.post();
    return res.data;
};

export const localRegister = async (
    email,
    password,
    password_confirm,
    agree_marketing,
) => {
    const req = Paths.api + 'user/register';
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const form_data = {
        email,
        password,
        password_confirm,
        agree_marketing,
    };

    const res = await axios.post(req, form_data);
    return res;
};

export const findId = async (name, hp) => {
    const req = Paths.api + 'user/find_id';
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const form_data = {
        name,
        hp,
    };
    const res = await axios.post(req, form_data);
    return res;
};
export const findPw = async (name, hp, email) => {
    const req = Paths.api + 'user/find_pw';
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const form_data = {
        name,
        hp,
        email,
    };
    const res = await axios.post(req, form_data);
    return res;
};
export const changePw = async (email, name, hp, pw, pw_c) => {
    const req = Paths.api + 'user/change_pw';
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const form_data = {
        email, name, hp, pw, pw_c
    };

    const res = await axios.post(req, form_data);
    return res;
}

export const requestPostMobileAuth = async (pv_hp) => {
    const req = Paths.api + 'mobile/auth';
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const form_data = {
        pv_hp,
    };
    const res = await axios.post(req, form_data);
    return res;
};
export const requestPostMobileAuthCheck = async (pv_hp, pv_vnum) => {
    const req = Paths.api + 'mobile/confirm';
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const form_data = {
        pv_hp,
        pv_vnum,
    };
    const res = await axios.post(req, form_data);
    return res;
};

export const requestPutSecession = async (token, agree_secession) => {
    const req = Paths.api + 'user/mypage/update_status';
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    
    const res = await axios.put(req, { agree_secession });
    return res;
}