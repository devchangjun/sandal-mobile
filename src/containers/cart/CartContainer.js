import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getCartList } from '../../api/cart/cart';
import { Paths } from 'paths';
import styles from './Cart.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import CartItemList from 'components/cart/CartItemList';
import CartItem from 'components/cart/CartItem';
import Button from 'components/button/Button';
import produce from 'immer';
import classNames from 'classnames/bind';
import Check from 'components/svg/sign/Check';
import CheckBox from 'components/checkbox/CheckBox';
import CartModal from 'components/asset/CartModal';

const cx = classNames.bind(styles);




const CartContainer = () => {
    const history = useHistory();

    const [open, setOpen] = React.useState(false); //모달창 오픈
    const [allChecked, setAllChecked] = React.useState(false); //전체선택
    const [esitChcked, setEsitChcked] = React.useState(true); //견적서 발송
    const [cartList, setCartList] = React.useState([]); //장바구니
    const [total, setTotal] = React.useState(0);  //총 주문금액
    const [delivery_cost, setCost] = React.useState(0); // 배달비

    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        console.log("들어옴");
        getList();
    }, [])

    useEffect(() => {
        haddleAllChecked();
        totalPrice();
    }, [cartList])


    //모달 오픈
    const handleOpen = () => {

        setOpen(true);
    }
    // 모달창 닫기
    const handleClose = () => {
        setOpen(false);
    };

    //장바구니 들고와서 check 추가
    const getList = useCallback(async () => {
        const token = sessionStorage.getItem("access_token");
        const res = await getCartList(token);
        console.log(res);
        let len = Object.keys(res).length;
        let list = new Array();
        for (let i = 0; i < len - 1; i++) {
            list[i] = res[i];
            list[i].isChecked = false;
        }
        setCost(res.delivery_cost);
        setCartList(list);

    }, [cartList]);

    const totalPrice = useCallback(() => {
        setTotal(0);
        let total = 0;
        console.log("계산하자");
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].isChecked) {
                console.log(cartList[i].item.item_price);
                total += cartList[i].item.item_price
            }
        }
        setTotal(total);
    })

    const handleAllChecked = useCallback((e) => {
        const newState = cartList.map(cart => {
            return { ...cart, isChecked: e.target.checked };
        })
        setCartList(newState)
    });

    const handleCheckChild = useCallback((e) => {
        const index = e.target.id;
        setCartList(
            produce(cartList, draft => {
                draft[index].isChecked = !draft[index].isChecked;
            })
        );

    }, [cartList]);

    //전체 선택인지 아닌지 여부 판단
    const haddleAllChecked = () => {

        for (let i = 0; i < cartList.length; i++) {
            console.log(cartList[i]);
            if (cartList[i].isChecked == false) {
                setAllChecked(false);
                return;
            }
        }
        setAllChecked(true);
        return;
    }

    const test = () => {
        console.log(allChecked);
    }
    const goToOrder = () => history.push(Paths.ajoonamu.order);

    return (
        <>
            <TitleBar title={"장바구니"} />
            <div className={styles['cart-page']}>
                <div className={styles['bar']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['delete']}>
                            전체 삭제
                    </div>
                    </div>
                </div>
                <div className={styles['cart-list']}>
                    {/* <CartItem />
                    <CartItem />
                    <CartItem /> */}
                    <CartItemList allChecked ={allChecked} carts={cartList}  handleCheckChild={handleCheckChild}/>
                </div>
                <div className={styles['finally']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['finally-price']}>
                            <div className={cx('title', 'total')}>
                                총 주문금액
                        </div>
                            <div className={cx('title', 'total')}>
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

                        {/* 이거 그냥 다시 만드는게 나을듯 */}
                        <div className={styles['estm']}>
                            <div className={styles['estm-check']}>
                                <CheckBox id={"check1"} text={"견적서 미발송"} />
                            </div>
                            <div className={styles['estm-check']}>
                                <CheckBox id={"check1"} text={"견적서 발송"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button title={"주문하기"} onClick={handleOpen} toggle={true}></Button>
            <CartModal
                open={open}
                handleClose={handleClose}
                handleOpen={handleOpen}
                onClick={goToOrder}
            />

        </>
    )
}




export default CartContainer;