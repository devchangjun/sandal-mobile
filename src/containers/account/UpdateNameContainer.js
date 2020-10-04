import React,{useState} from 'react';
import {Paths} from 'paths';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {updateName} from '../../api/auth/auth';
import {update_user_info} from '../../store/auth/auth';

import {useStore} from '../../hooks/useStore';
import TitleBar from 'components/titlebar/TitleBar';
import styles from './UpdateInfo.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import Button from 'components/button/Button';
import CloseButton from 'components/svg/account/Close';


const UpdateNameContainer=()=>{
    const history = useHistory();
    const user_token = useStore();
    const [newName,setNewName] = useState('');

    const onChageNewName =(e) => setNewName(e.target.value);
    const dispatch = useDispatch();


    const onClickUpdateName = async()=>{

        const res = await updateName(user_token,newName);
        dispatch(update_user_info({name :'name' ,value: newName}));
        if(res.data.msg==="성공"){
                history.replace(Paths.ajoonamu.account);
        }
    }
    const onClickClear =()=>{
        setNewName('');
    }

    return(
            <>
          <div className={styles['container']}>
                <div className={styles['context']}>
                    <div className={styles['input']}>
                    <SignNormalInput initValue={newName} onChange={onChageNewName}/>

                    <div className={styles['close']} onClick={onClickClear}>
                        <CloseButton/>
                    </div>
                    </div>
                </div>
        </div>
        <Button title={"확인"} toggle={newName.length>0} onClick={ newName.length>0 && onClickUpdateName}/>
        </>
    )
}

export default UpdateNameContainer;