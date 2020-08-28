import axios from 'axios';
import { Paths } from '../../paths';

export const requestQNAList = async (token) => {
    const req = Paths.api + 'user/qna/list';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const result = await axios.get(req, config);
    return result.data.query;
};

export const requestQNAStore = async (token, {
    title: subject,
    content: question,
    files: q_files
}) => {
    const req = Paths.api + 'user/qna';
    
    const form_data = {
        subject,
        question,
        q_files
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.post(req, form_data);
    return res;
};
