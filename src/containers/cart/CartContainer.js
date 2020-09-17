import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { getCartList } from '../../api/cart/cart';
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

const cx = classNames.bind(styles);

const CartContainer = () => {
    const history = useHistory();
    const [open, setOpen] = useState(false); //모달창 오픈
    const [allChecked, setAllChecked] = useState(false); //전체선택
    const [estm, setEstm] = useState(false); //견적서 발송
    const [not_estm, setNotEstm] = useState(true); // 견적서 미발송
    const [cartList, setCartList] = useState([]); //장바구니
    const [total, setTotal] = useState(0); //총 주문금액
    const [delivery_cost, setCost] = useState(0); // 배달비
    const [loading, setLoading] = useState(false);

    const handleIncrement = useCallback((index) => {
        setCartList(
            produce(cartList,draft=>{
                draft[index].item.item_quanity++;
            })
        )
    }, [cartList],);

    const handleDecrement = useCallback((index) => {
        setCartList(
            produce(cartList,draft=>{
                const item_quanity = draft[index].item.item_quanity;
                console.log(item_quanity);
                if(item_quanity > 1){
                 draft[index].item.item_quanity--
                }
            })
        )
    },[cartList]);
    

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);
    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const onChangeEstm = (e) => {
        setEstm(true);
        setNotEstm(false);
    };

    const onChangeNotEstm = (e) => {
        setEstm(false);
        setNotEstm(true);
    };

    //마운트 될 때 만 함수 생성.
    const getCartListApi = useCallback(async () => {
        setLoading(true);
        const token = sessionStorage.getItem('access_token');
        if (token) {
            const res = await getCartList(token);
            console.log(res);
            let len = Object.keys(res).length;
            let list = [];
            for (let i = 0; i < len - 1; i++) {
                list[i] = res[i];
                list[i].isChecked = false;
            }
            console.log(list);
            setCost(res.delivery_cost);
            setCartList(list);
            setAllChecked(true); //나중에 빼야함
        }
        setLoading(false);
    }, []);

    const onChangeTotalPrice = useCallback(() => {
        setTotal(0);
        let total = 0;
        for (let i = 0; i < cartList.length; i++) {
            let { item_price, item_quanity } = cartList[i].item;
            total += item_price * item_quanity;
        }

        setTotal(total);
    }, [cartList]);

    //마운트 될때만 함수 호출.
    useEffect(() => {
        getCartListApi();
    }, [getCartListApi]);

    useEffect(() => {
        console.log(cartList);
    }, [cartList]);
    useEffect(() => {
        onChangeTotalPrice();
    }, [onChangeTotalPrice]);

    const handleCheckChild = useCallback(
        (e) => {
            const index = e.target.id;
            setCartList(
                produce(cartList, (draft) => {
                    draft[index].isChecked = !draft[index].isChecked;
                }),
            );
        },
        [cartList],
    );

    //전체 선택인지 아닌지 여부 판단
    // const handleAllChecked = () => {

    //     for (let i = 0; i < cartList.length; i++) {
    //         if (cartList[i].isChecked === false) {
    //             setAllChecked(false);
    //             return;
    //         }
    //     }
    //     setAllChecked(true);
    //     return;
    // }

    const onClickOrder = () => history.push(Paths.ajoonamu.order);

    const renderList = () => {
        console.log('리렌더');
        return (
            <>
                <div className={styles['bar']}>
                    <div className={styles['delete']}>전체삭제</div>
                </div>
                <div className={styles['cart-list']}>
                    <CartItemList
                        allChecked={allChecked}
                        carts={cartList}
                        handleCheckChild={handleCheckChild}
                        handleIncrement={handleIncrement}
                        handleDecrement={handleDecrement}
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
                                <div
                                    className={cx('check', { on: not_estm })}
                                    onClick={onChangeNotEstm}
                                >
                                    <div className={styles['check-box']}>
                                        <Check on={not_estm} />
                                    </div>
                                    <div className={styles['value']}>
                                        견적서 미발송
                                    </div>
                                </div>
                            </ButtonBase>
                            <ButtonBase>
                                <div
                                    className={cx('check', { on: estm })}
                                    onClick={onChangeEstm}
                                >
                                    <div className={styles['check-box']}>
                                        <Check on={estm} />
                                    </div>
                                    <div className={styles['value']}>
                                        견적서 발송
                                    </div>
                                </div>
                            </ButtonBase>
                        </div>
                    </div>
                </div>
                <Button
                    title={`${numberFormat(total)}원 주문하기`}
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
        );
    };

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
