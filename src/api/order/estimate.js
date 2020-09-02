import axios from 'axios';
import { Paths } from '../../paths';

export const requestPostEstimate = async (token, {
    estm_email,
    estm_username,
    estm_file
}) => {
    const req = Paths.api + 'user/estimate';
    const formData = new FormData();

    console.log(estm_email);

    formData.append('estm_email', estm_email);
    formData.append('estm_username', estm_username);
    formData.append('estm_file', [estm_file]);
    console.log(formData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.post(req, formData);
    console.log(res);
    return res;
};
