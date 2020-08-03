import axios from 'axios';

const DEFAULT_URL = "http://devapi.ajoonamu.com/api/";

export const getCartList =async (token)=>{
    const req = DEFAULT_URL + "user/cart/list";
    const config = {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }
    const result = await axios.get(req,config);
    console.log(result.data.query);
    return result.data.query;
}