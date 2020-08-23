import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { Paths } from 'paths';
import styles from './Reserve.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import TabMenu from 'components/tab/TabMenu';
import MenuItemList from 'components/item/MenuItemList';
import Message from 'components/message/Message'
import CustomItemList from 'components/item/CustomItemList';
import PreferModal from 'components/asset/PreferModal';
import BottomNav from 'components/nav/BottomNav';




const tabInit = [
    {
        url: `${Paths.ajoonamu.shop}/custom?`,
        name: '추천메뉴'
    },
    {
        url: `${Paths.ajoonamu.shop}/menu1`,
        name: '메뉴1'
    },
    {
        url: `${Paths.ajoonamu.shop}/menu2`,
        name: '메뉴2'
    },
    {
        url: `${Paths.ajoonamu.shop}/menu3`,
        name: '메뉴3'
    },

]

const ReserveContainer = ({ tab = 'custom' }) => {

    const [open, setOpen] = React.useState(false);
    // const history = useHistory();
    // const { user } = useSelector(state => state.auth);
    const [budget, setBudget] = React.useState(0); //맞춤 가격
    const [desireQuan, setDesireQuan] = React.useState(0); //희망수량
    const [itemType, setItemType] = React.useState("reserve"); //사용자 선택 값 1.예약주문 2.배달주문
    const [result, setResult] = React.useState(false); // 예약주문 요청시 결과값.


    useEffect(() => {
        console.log("탭 바뀜");
        console.log(tab);
    }, [tab])

    //맞춤 주문하기 버튼 클릭
    const handleOpen = () => setOpen(true);
    // 모달창 닫기
    const handleClose = () => setOpen(false);

    //주문 종류 선택
    const onChangeType = (e) => setItemType(e.target.value);

    //전체 예산 입력
    const onChangeBudget = (e) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
            setBudget(e.target.value)
        }
    }
    const onChangeDesireQune = (value) => {
        setDesireQuan(value);
    }
    // 모달창 설정 버튼 클릭 => 맞춤 주문 설정.
    const onCustomOrder = () => {
        setOpen(false);
        if (budget !== 0) setResult(true);
    }




    return (
        <>
            <TitleBar title={tab} /> {/*분류명 넣어야함 */}
            <TabMenu tabs={tabInit} />

            <div className={styles['container']}>
                <div className={styles['pd-box']}>
                    {/* 이부분 바꿔야함 */}
                    {(tab === 'custom' && result) ?
                        <div className={styles['title']}>
                            맞춤 메뉴
                    <CustomItemList />
                        </div>
                        :
                        (tab === 'custom' && !result) &&
                        <Message
                            msg={"전체 예산과 희망 수량을 선택하시면 메뉴 구성을 추천 받으실 수 있습니다."}
                            isButton={true}
                            onClick={handleOpen}
                            buttonName={"맞춤 주문 하기"}

                        />
                    }
                    {tab === 'menu1' &&
                        <MenuItemList />}
                    {tab === 'menu2' &&
                        <Message
                            msg={"추천드릴 메뉴 구성이 존재하지 않습니다."}
                            src={true}
                            isButton={false}
                        />}
                    {tab === 'menu3' &&
                        <Message
                            msg={"배달 가능한 매장이 없거나 메뉴가 존재하지 않습니다."}
                            isButton={false}
                            src={true}
                        />}
                </div>
            </div>
            <BottomNav></BottomNav>

            <PreferModal
                open={open}
                handleClose={handleClose}
                itemType={itemType}
                onChangeType={onChangeType}
                budget={budget}
                onChangeBudget={onChangeBudget}
                desireQuan={desireQuan}
                onCustomOrder={onCustomOrder}
                onChangeDesireQune={onChangeDesireQune}
            />
        </>
    )
}
export default ReserveContainer;

