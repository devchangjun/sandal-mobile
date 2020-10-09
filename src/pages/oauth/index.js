import React,{useEffect} from 'react';
import qs from 'qs';

import {useDispatch} from 'react-redux';

//api
import { noAuthGetNearStore } from '../../api/noAuth/store';
import { getActiveAddr } from '../../api/address/address';
import { getNearStore } from '../../api/store/store';
import {socialRegister} from '../../api/social';
//hooks
import {useInit} from '../../hooks/useStore';

//store
import { get_user_info } from '../../store/auth/auth';


const OAuth =({match,location})=>{

    const dispatch = useDispatch();
    const initStore = useInit();

    const {type} = match.params; //
    const query = qs.parse(location.search,{
        ignoreQueryPrefix: true
    });

    const GetInfo = async (access_token) => {
  
        if (access_token) {
            dispatch(get_user_info(access_token));
            const res = await getActiveAddr(access_token);
            if(res){
                const {lat,lng,addr1,addr2,post_num} = res;
                const near_store = await getNearStore(lat, lng, addr1);
                initStore(addr1,addr2,lat,lng,post_num,near_store.data.query );
            }
            else{
                initStore();
            }
        } 
    };

    useEffect(()=>{
        const {email,access_token,register_type,name} = query;

        if(type==='login'){
            GetInfo(access_token);
        }
        else if(type==='register'){
            socialRegister(email,name,register_type);
        }   
    },[])


    return(
        <>
        
        </>
    )
}

export default OAuth;

