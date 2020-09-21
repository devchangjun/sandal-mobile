import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

export const useStore =()=>{
    const user_token = sessionStorage.getItem("access_token");
    const history = useHistory();
    useEffect(()=>{
        if(!user_token){
            history.replace('/login');
        }
    },[user_token,history])
    
    return user_token;
}