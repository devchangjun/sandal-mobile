import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {Paths} from 'paths';
import styles from './Reserve.module.scss';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import TabMenu from 'components/tab/TabMenu';
import MenuItemList from 'components/item/MenuItemList';
import Message from 'components/message/Message'
import Counter from 'components/counter/Counter';
import CustomItemList from 'components/item/CustomItemList';

import ReserveModal from 'components/asset/ReserveModal';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router';

const tabInit = [
    {
        url: `${Paths.ajoonamu.reserve}/custom?`,
        name: '추천메뉴'
    },
    {
        url: `${Paths.ajoonamu.reserve}/menu1`,
        name: '메뉴1'
    },
    {
        url: `${Paths.ajoonamu.reserve}/menu2`,
        name: '메뉴2'
    },
    {
        url: `${Paths.ajoonamu.reserve}/menu3`,
        name: '메뉴3'
    },

]

const ReserveContainer = ({ tab='custom'}) => {

    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const {user} = useSelector(state=>state.auth);
    const [budget, setBudget] = React.useState(0); //맞춤 가격
    const [desireQuan , setDesireQuan] = React.useState(0); //희망수량
    const [itemType, setItemType] = React.useState("reserve"); //사용자 선택 값 1.예약주문 2.배달주문
    const [result, setResult] = React.useState(false); // 예약주문 요청시 결과값.

 
    useEffect(()=>{
   
    },[])
    //맞춤 주문 설정하기 버튼 클릭
    const onClickCustomOrder = () => {
        setOpen(true);
    }

    //주문 종류 선택
    const onChangeType = (e) => {
        setItemType(e.target.value);
    }

    //전체 예산 입력
    const onChangeBudget = (e) => {

        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value == '' || re.test(e.target.value)) {
            setBudget(e.target.value)
        }
    }

    // 모달창 닫기
    const handleClose = () => {
        setOpen(false);
    };

    // 모달창 설정 버튼 클릭 => 맞춤 주문 설정.
    const onCustomOrder = () => {
        setOpen(false);
        if (budget != 0) setResult(true);
    }
    return (
        <>
            <Header />
            <Title mainTitle={"예약주문>메뉴"} subTitle={"예약주문 메뉴 리스트"}></Title>
            <div className={styles['reserve-tab']}>
                <TabMenu tabs={tabInit}/>
                {/* 이부분 바꿔야함 */}
                {tab === 'custom' &&
                        <Message
                        msg={"전체 예산과 희망 수량을 선택하시면 메뉴 구성을 추천 받으실 수 있습니다."}
                        onClick={onClickCustomOrder}
                        isButton={true}
                    />}
            
                {tab === 'menu1' &&
                    <MenuItemList />}
                {tab === 'menu2' &&
                    <Message
                        msg={"추천메뉴가 없습니다."}
                        isButton={false}
                    />}
                {tab === 'menu3' &&
                    <Message
                        msg={"메뉴가 없습니다."}
                        isButton={false}
                    />}
            </div>
            <div className={styles['modal']}>
                <ReserveModal 
                open={open}
                handleClose={handleClose}
                itemType={itemType}
                onChangeType={onChangeType}
                budget={budget}
                onChangeBudget={onChangeBudget}
                desireQuan={desireQuan}
                onCustomOrder={onCustomOrder}
                />
            </div>
        </>
    )
}
export default ReserveContainer;


{/* <Tabs> */ }
{/* 맞춤주문 설정이 되어있지 않을 때 메시지 띄우기 */ }
{/* {result ? <CustomItemList /> :
    <Message
        msg={"전체 예산과 희망 수량을 선택하시면 메뉴 구성을 추천 받으실 수 있습니다."}
        onClick={onClickCustomOrder}
        isButton={true}
    />
}
<MenuItemList />
<Message
    msg={"추천메뉴가 없습니다."}
    isButton={false}
/> */}
{/* </Tabs> */ }