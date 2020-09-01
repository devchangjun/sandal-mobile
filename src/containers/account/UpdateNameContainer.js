import React,{useState, useEffect} from 'react';
import {useSelector , useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {updateName} from '../../api/auth/auth';
import {update_user_info} from '../../store/auth/auth';

import TitleBar from 'components/titlebar/TitleBar';
import styles from './UpdateInfo.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import Button from 'components/button/Button';
import CloseButton from 'components/svg/account/Close';


const UpdateNameContainer=()=>{
    const { user } = useSelector((state) => state.auth);
    const history = useHistory();
    const [newName,setNewName] = useState('');
    const onChageNewName =(e) => setNewName(e.target.value);
    
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const token = sessionStorage.getItem("access_token");
        console.log(token);
        if(token === undefined || token ===null){
            history.replace("/");
        }
    },[])
    const onClickButton =()=>{
        onChangeName();
    }
    const onChangeName = async()=>{
        const token = sessionStorage.getItem("access_token");
        const res = await updateName(token,newName);
        dispatch(update_user_info({name :'name' ,value: newName}));
        console.log(res);

    }

    return(
            <>
            <TitleBar title={"이름수정"}/>
          <div className={styles['container']}>
                <div className={styles['context']}>
                    <div className={styles['input']}>
                    <SignNormalInput initValue={newName} onChange={onChageNewName}/>
                    <div className={styles['close']}>
                        <CloseButton/>
                    </div>
                    </div>
                </div>
        </div>
        <Button title={"확인"} toggle={true} onClick={onClickButton}/>
        </>
    )
}

export default UpdateNameContainer;