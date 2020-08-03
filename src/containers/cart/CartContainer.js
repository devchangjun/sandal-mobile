import React, { useCallback, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import {getCartList} from '../../api/cart/cart';
import { Paths } from 'paths';
import styles from './Cart.module.scss';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import CartItemList from 'components/cart/CartItemList';
import CartModal from 'components/asset/CartModal';
import produce from 'immer';



const CartContainer = () => {
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [allChecked ,setAllChecked] = React.useState(false); //전체선택
    const [esitChcked ,setEsitChcked] = React.useState(true); //견적서 발송
    const [cartList ,setCartList] = React.useState([]); //장바구니
    const [total ,setTotal] =React.useState(0);  //총 주문금액
    const [delivery_cost ,setCost] = React.useState(0); // 배달비

    const {user} = useSelector(state=>state.auth);

    useEffect(()=>{
        console.log("들어옴");
        getList();
    },[])

    useEffect(()=>{
        haddleAllChecked();
        totalPrice();
    },[cartList])

    //장바구니 들고와서 check 추가
    const getList = useCallback(async()=>{
        const token = sessionStorage.getItem("access_token");
        const res = await getCartList(token);
        console.log(res);
        let len = Object.keys(res).length;
        let list= new Array();
        for(let i =0 ; i<len-1;i++){
            list[i] = res[i];
            list[i].isChecked = false;
          } 
        setCost(res.delivery_cost); 
        setCartList(list);

    },[cartList]);

    const totalPrice =useCallback(()=>{
        setTotal(0);
        let total = 0;
        console.log("계산하자");
        for (let i=0 ;i<cartList.length;i++){
            if(cartList[i].isChecked){
                console.log(cartList[i].item.item_price);
                total+= cartList[i].item.item_price
            }
        }
        setTotal(total);
    })

    // 주문 설정하기 버튼 클릭
    const onClickOrder = () => {
        setOpen(true);
    }

    // 모달창 닫기
    const handleClose = () => {
        setOpen(false);
    };

    const handleAllChecked = useCallback((e)=>{
        const newState = cartList.map(cart => {
            return {...cart ,isChecked : e.target.checked};
        })
        setCartList(newState)
    });

    const handleCheckChild =useCallback((e) =>{
        const index = e.target.id;
        setCartList(
            produce(cartList,draft =>{
                draft[index].isChecked= !draft[index].isChecked;
            })
        );
 
    },[cartList]);

    //전체 선택인지 아닌지 여부 판단
    const haddleAllChecked =()=>{

        for (let i = 0 ;i<cartList.length;i++){
            console.log(cartList[i]);
            if(cartList[i].isChecked == false){
                setAllChecked(false);
                return ;
            }
        }
        setAllChecked(true);
        return;
    }

    const test =()=>{
        console.log(allChecked);
    }
    const goToOrder = () => history.push(Paths.ajoonamu.order);

    return (
        <>
            <Header />
            <Title mainTitle={"장바구니"} subTitle={"장바구니"} />
            <div className={styles['cart-page']}>
                <button onClick={test}>test</button>
                <div className={styles['bar']}>
                    <div className={styles['all-check']}>
                    <input type="checkbox" checked={allChecked} onClick={handleAllChecked} value="checkedall"></input><label>전체선택</label>
                    </div>
                    <div className={styles['select']}>
                        선택삭제
                    </div>
                </div>
                <div className={styles['cart-list']}>
                  <CartItemList allChecked ={allChecked} carts={cartList}  handleCheckChild={handleCheckChild}/>
                </div>
                <div className={styles['finally']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['finally-price']}>
                            <div className={styles['title']}>
                                총 주문금액
                        </div>
                            <div className={styles['price']}>
                               {total}원
                        </div>
                        </div>
                        <div className={styles['finally-price']}>
                            <div className={styles['title']}>
                                배달비
                        </div>
                            <div className={styles['price']}>
                               {delivery_cost}원
                        </div>
                        </div>
                        <div className={styles['order-text']}>
                            * 배달비는 거리에 따라 측정되며, 20만원 이상 결제시 배달비는 무료입니다.
                        </div>
                        <div className={styles['estm']}>
                            <div className={styles['title']}>
                                견적서 발송 여부
                           </div>
                            <div className={styles['check']}>
                                <input type="checkbox" checked={esitChcked}></input> 견적서 받음
                                <input type="checkbox" checked={!esitChcked}></input> 견적서 안받음
                            </div>
                        </div>
                        <div className={styles['btn']}>
                            <div className={styles['btn-name']} onClick={onClickOrder}>
                                주문하기
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <CartModal
                    open={open}
                    handleClose={handleClose}
                    order={goToOrder}
                />
        </>
    )
}
export default CartContainer;