import axios from 'axios';
import { Paths } from '../../paths';


export const kakaoLogin = async()=>{
    const req = Paths.api +'user/kakao';

    const config={
        params:{
            device:"mobile"
        }
    }
    console.log(config);
    const res = await axios.get(req,config);
    console.log(res);
    return res;
}