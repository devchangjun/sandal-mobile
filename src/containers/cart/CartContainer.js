import React, { useCallback, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import {getCartList} from '../../api/cart/cart';
import { Paths } from 'paths';
import styles from './Cart.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import CartItemList from 'components/cart/CartItemList';
import CartItem from 'components/cart/CartItem';
import Button from 'components/button/Button';
import produce from 'immer';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);




const CartContainer = () => {
    const history = useHistory();

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
            <TitleBar title={"장바구니"} />
            <div className={styles['cart-page']}>
                {/* <div className={styles['bar']}>
                    <div className={styles['all-check']}>
                    <input type="checkbox" checked={allChecked} onClick={handleAllChecked} value="checkedall"></input><label>전체선택</label>
                    </div>
                    <div className={styles['select']}>
                        선택삭제
                    </div>
                </div> */}
                <div className={styles['cart-list']}>
                        <CartItem/>
                        <CartItem/>
                  {/* <CartItemList allChecked ={allChecked} carts={cartList}  handleCheckChild={handleCheckChild}/> */}
                </div>
                <div className={styles['finally']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['finally-price']}>
                            <div className={cx('title','total')}>
                                총 주문금액
                        </div>
                            <div className={cx('title','total')}>
                               {total}원
                        </div>
                        </div>
                        <div className={styles['finally-price']}>
                            <div className={styles['title']}>
                                배달비
                        </div>
                            <div className={styles['title']}>
                               {delivery_cost}원
                        </div>
                        </div>
                        {/* <div className={styles['order-text']}>
                            * 배달비는 거리에 따라 측정되며, 20만원 이상 결제시 배달비는 무료입니다.
                        </div> */}
                        <div className={styles['estm']}>
                            <div className={styles['check']}>
                                <input type="checkbox" checked={esitChcked}></input> <span>견적서 받음</span>
                                <input type="checkbox" checked={!esitChcked}></input> <span>견적서 안받음</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button title={"주문하기"} onClick={goToOrder} toggle={true}></Button>
        </>
    )
}
export default CartContainer;