import axios from 'axios';
import { Paths } from '../../paths';

export const requestPostEstimate = async (token, {
    estm_email,
    estm_username,
    estm_file
}) => {
    const req = Paths.api + 'user/estimate';
    const formData = new FormData();

    formData.append('estm_email', estm_email);
    formData.append('estm_username', estm_username);
    formData.append('estm_file', []);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers['Context-Type'] = 'application/json';

    const res = await axios.post(req, formData);
    console.log(res);
    return res;
};
