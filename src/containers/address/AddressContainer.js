import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {BsSearch} from 'react-icons/bs';
import styles from './Address.module.scss';
import Header from 'components/header/Header';
import AddrItemList from 'components/address/AddrItemList';
import DeliveryItemList from 'components/address/DeliveryItemList';


import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import produce from 'immer';

// import key from "./key";


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));


const key = "devU01TX0FVVEgyMDIwMDcyMzE4MTUzMzEwOTk4NzE";
const AddressContainer = () => {
  const [userAddr, setUserAddr] = useState(""); //검색
  const [selectAddr, setSelectAddr] = useState(""); //선택
  const [detailAddr, setDetailAddr] = useState(""); //상세주소
  const [addrs, setAddrs] = useState(''); // 검색 리스트
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [open, setOpen] = React.useState(false);
  const nextId = useRef(3);
  const [latestAddrs, setLatestAddrs] = useState([
    {
      id: 1,
      jibunAddr: "동아대학교",
      roadAddr: "사하구",
    },
    {
      id: 2,
      jibunAddr: "동아대학교",
      roadAddr: "사하구",
    }
  ])

  const handleClickOpen = () => {
    if (userAddr == "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    else {
      setOpen(true);
      onSearch();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      handleClickOpen();
    }
  }

  const onInsertAddr = () => {
    setOpen(false);
    const item = {
      id: nextId.current,
      jibunAddr: selectAddr,
      roadAddr: detailAddr
    }
    setLatestAddrs(
      produce(latestAddrs, draft => {
        draft.push(item);
      })
    )
    setDetailAddr("");
  };

  const onClickAddrItem = (data) => {
    setSelectAddr(data);
  }
  const onChangeAddr = e => {
    setUserAddr(e.target.value);
  };
  const onChangeDetail = e => {
    setDetailAddr(e.target.value);
  }

  const onSearch = async () => {
    if (userAddr == "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    else {
      const result = await callApi();
      setAddrs(result);
      console.log(result);
    }

  }

  const callApi = () => {
    return fetch(`http://www.juso.go.kr/addrlink/addrLinkApi.do?currrentPage=1&countPerPage=100&keyword=${userAddr}&confmKey=${key}=&resultType=json`)
      .then(res => res.json())
      .then(json => json.results.juso)
      .catch(err => console.log(err));
  }


  useEffect(() => {
    console.log("재 렌더");
  }, [])


  return (
    <>
      <Header />
      <div className={styles['addr']}>
        <h1>배달지 검색</h1>
        <div className={styles['addr-input']}>
          <input className={styles['input-box']} placeholder="예) 아주나무동12-3 또는 아주나무 아파트" value={userAddr} onChange={onChangeAddr} onKeyPress={handleKeyPress} />
          <div className={styles['search-btn']} onClick={handleClickOpen} >주소검색</div>
        </div>
        <div className={styles['addr-list']}>
          <h3>최근 배달 주소</h3>
          <DeliveryItemList addrs={latestAddrs} />
        </div>
      </div>
      <div className={styles['modal']}>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div className={styles['title']}>
            <DialogTitle id="form-dialog-title">배달 받을 주소</DialogTitle>
          </div>
          <DialogContent>
            <div className={styles['modal-input-box']}>
              <input className={styles['modal-input']} type="text" value={userAddr} placeholder="예) 아주나무동12-3 또는 아주나무 아파트" onChange={onChangeAddr} onKeyPress={handleKeyPress}></input>
              <div className={styles['search-btn']} onClick={onSearch} ><BsSearch/></div>
            </div>
          </DialogContent>
          <DialogContent>
            <div className={styles['addrs-box']}>
              {addrs ? `${addrs.length}개의 검색결과가 있습니다.` : "0개의 검색결과가 있습니다."}
              <div className={styles['addrs-list']}>
                {addrs ? <AddrItemList addrs={addrs} onClick={onClickAddrItem} /> : ""}
              </div>
              {selectAddr ? selectAddr : ""}
              <input className={styles['modal-input']} type="text" value={detailAddr} placeholder="상세 주소를 입력하세요" onChange={onChangeDetail}></input>
            </div>
          </DialogContent>
          <DialogContent>
            <div className={styles['setting-btn']} onClick={onInsertAddr}>
              이 주소로 배달지 설정
          </div>
          </DialogContent>
        </Dialog>
      </div>

    </>
  );
};

export default AddressContainer;