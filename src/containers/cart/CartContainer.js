import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { deleteCartItem, getCartList } from '../../api/cart/cart';
import { Paths } from 'paths';
import styles from './Cart.module.scss';
import TitleBar from 'components/titlebar/TitleBar';
import CartItemList from 'components/cart/CartItemList';
import Button from 'components/button/Button';
import produce from 'immer';
import classNames from 'classnames/bind';
import Check from 'components/svg/sign/Check';

import EstmModal from 'components/modal/EstmModal';
import Message from 'components/message/Message';
import { numberFormat } from '../../lib/formatter';
import Loading from '../../components/asset/Loading';
import { ButtonBase } from '@material-ui/core';
import {useStore} from '../../hooks/useStore';

const cx = classNames.bind(styles);

const CartContainer = () => {
    const history = useHistory();
    const [open, setOpen] = useState(false); //모달창 오픈
    const [allChecked, setAllChecked] = useState(false); //전체선택
    const [estm, setEstm] = useState(false); //견적서 발송
    const [cartList, setCartList] = useState([]); //장바구니
    const [total, setTotal] = useState(0); //총 주문금액
    const [delivery_cost, setCost] = useState(0); // 배달비
    const [loading, setLoading] = useState(false);
    const user_token = useStore();

    const handleIncrement = useCallback(index => {
        setCartList(
            produce(cartList, (draft) => {
                draft[index].item.item_quanity++;
            }),
        );
    }, [cartList]);
    const handleDecrement = useCallback(index => {
        setCartList(
            produce(cartList, (draft) => {
                const item_quanity = draft[index].item.item_quanity;
                if (item_quanity > 1) {
                    draft[index].item.item_quanity--;
                }
            }),
        );
    }, [cartList]);
    const handleDelete = useCallback(async cart_id => {
        if (user_token) {
            const res = await deleteCartItem(user_token, cart_id);
            console.log(res);
        }
        setCartList(list => list.filter(({ item }) => cart_id.indexOf(item.cart_id) === -1))
    }, [user_token]);

    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    const onChangeEstm = useCallback(e => setEstm(true), []);
    const onChangeNotEstm = useCallback(e => setEstm(false), []);

    //마운트 될 때 만 함수 생성.
    const getCartListApi = useCallback(async () => {
        setLoading(true);

        if (user_token) {
            const res = await getCartList(user_token);
            console.log(res);
            let len = Object.keys(res).length;
            let list = [];
            for (let i = 0; i < len - 1; i++) {
                list[i] = res[i];
                list[i].isChecked = false;
            }
            setCost(res.delivery_cost);
            setCartList(list);
            setAllChecked(true); //나중에 빼야함
        }
        setLoading(false);
    }, [user_token]);

    const onChangeTotalPrice = useCallback(() => {

        let total = cartList.reduce((prev, { item }) => {
            const { item_price, item_quanity } = item;
            return prev + (item_price * item_quanity);
        }, 0);
        
        for(let i=0; i<cartList.length ;i++){
            for(let j=0 ;j<cartList[i].options.length; j++){
                const {option_price} =cartList[i].options[j];
                total+=option_price;
                console.log(total);
            }
        }

        setTotal(total);

    }, [cartList]);

    //마운트 될때만 함수 호출.
    useEffect(() => {
        getCartListApi();
    }, [getCartListApi]);

    useEffect(onChangeTotalPrice, [onChangeTotalPrice]);

    const handleCheckChild = useCallback(e => {
        const index = e.target.id;
        setCartList(
            produce(cartList, (draft) => {
                draft[index].isChecked = !draft[index].isChecked;
            }),
        );
    }, [cartList]);
    const onClickOrder = useCallback(() => history.push(Paths.ajoonamu.order), [history]);

    const renderList = useCallback(() => (
            <>
                <div className={styles['bar']}>
                    <ButtonBase className={styles['delete']}
                        onClick={() => handleDelete(cartList.map(({ item }) => item.cart_id))}
                    >전체삭제</ButtonBase>
                </div>
                <div className={styles['cart-list']}>
                    <CartItemList
                        allChecked={allChecked}
                        carts={cartList}
                        handleCheckChild={handleCheckChild}
                        handleIncrement={handleIncrement}
                        handleDecrement={handleDecrement}
                        handleDelete={handleDelete}
                    />
                </div>
                <div className={styles['finally']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['finally-price']}>
                            <div className={cx('title', 'total')}>
                                총 주문금액
                            </div>
                            <div className={cx('title', 'total')}>
                                {numberFormat(total)}원
                            </div>
                        </div>
                        <div className={styles['finally-price']}>
                            <div className={styles['title']}>배달비</div>
                            <div className={styles['title']}>
                                {numberFormat(delivery_cost)}원
                            </div>
                        </div>
                        <div className={styles['estm']}>
                            <ButtonBase>
                                <div className={cx('check', { on: !estm })} onClick={onChangeNotEstm}>
                                    <div className={styles['check-box']}>
                                        <Check on={!estm} />
                                    </div>
                                    <div className={styles['value']}>견적서 미발송</div>
                                </div>
                            </ButtonBase>
                            <ButtonBase>
                                <div className={cx('check', { on: estm })} onClick={onChangeEstm}>
                                    <div className={styles['check-box']}>
                                        <Check on={estm} />
                                    </div>
                                    <div className={styles['value']}>견적서 발송</div>
                                </div>
                            </ButtonBase>
                        </div>
                    </div>
                </div>
                <Button
                    title={`${numberFormat(parseInt(total)+ parseInt(delivery_cost))}원 주문하기`}
                    onClick={estm ? handleOpen : onClickOrder}
                    toggle={true}
                ></Button>
                <EstmModal
                    open={open}
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                    onClick={onClickOrder}
                    isEsit={estm}
                />
            </>
        ), [allChecked, cartList, delivery_cost, estm, handleCheckChild, handleClose, handleDecrement, handleDelete, handleIncrement, handleOpen, onChangeEstm, onChangeNotEstm, onClickOrder, open, total],
    );

    return (
        <>
            {loading ? (
                <Loading open={true} />
            ) : (
                <>
                    <TitleBar title={'장바구니'} />
                    <div className={styles['container']}>
                        {cartList.length !== 0 ? (
                            renderList()
                        ) : (
                            <Message
                                src={true}
                                msg={'장바구니가 비었습니다.'}
                                isButton={true}
                                buttonName={'주문하러 가기'}
                                onClick={() => {
                                    history.replace(Paths.ajoonamu.shop);
                                }}
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default CartContainer;
