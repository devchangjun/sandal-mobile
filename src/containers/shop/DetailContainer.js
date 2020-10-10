import React, { useState, useCallback, useEffect } from 'react';
import { Paths } from 'paths';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import styles from './Detail.module.scss';
import Button from 'components/button/Button';
import AdditionalList from 'components/item/AdditionalList';
import Counter from 'components/counter/Counter';
import Test from 'components/svg/cart/test.png';
import classNames from 'classnames/bind';
import Back from 'components/svg/header/Back';
import { numberFormat } from '../../lib/formatter';
import Loading from '../../components/asset/Loading';
import { getMenuInfo } from '../../api/menu/menu';
import { addCartItem } from '../../api/cart/cart';
import { useStore } from '../../hooks/useStore';
import { useModal } from '../../hooks/useModal';
import { noAuthAddCart } from '../../api/noAuth/cart';
import { IconButton } from '@material-ui/core';

const cx = classNames.bind(styles);

const DetailContainer = ({ item_id }) => {
    const history = useHistory();

    const openModal = useModal();
    const { addr1, addr2, lat, lng } = useSelector((state) => state.address);
    const user_token = useStore(false);
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quanity, setQuanity] = useState(1);
    const [options, setOptions] = useState(null);
    const [option_total, setOptionTotal] = useState(0);
    const onClickBack = () => history.goBack();

    //옵션 아이템 선택
    const setOptionItem =useCallback(()=>{
        const add_option = menu.options.filter(option => option.check).map((option =>option.option_id));
        setOptions(add_option);
    },[menu]);

    const onDecrement = useCallback(() => {
        if (quanity > 1) setQuanity(quanity - 1);
    }, [quanity]);

    const onIncrement = useCallback(() => {
        setQuanity(quanity + 1);
    }, [quanity]);

    const getMenu = async () => {
        setLoading(true);

        try {
            const res = await getMenuInfo(item_id);
            setMenu(res);
        } catch (e) {}

        setLoading(false);
    };

    const onClickOptionItem = (id) => {
        const newOptionItem = menu.options.map((item) => {
            if (item.option_id === id) {
                item.check = !item.check;
                let option_price = item.option_price;
                let new_total = option_total;
                new_total += (item.check) ? option_price : (option_price)*-1;
                setOptionTotal(new_total);
            }
            return item;
        });
        setMenu(
            {...menu},
            {options : newOptionItem}
         );
    };

    //장바구니 담기
    const onClickCart = useCallback(async () => {
        if (user_token) {
            try {
                const res = await addCartItem(
                    user_token,
                    item_id,
                    options,
                    quanity,
                );
                if (res.data.msg === '성공') {
                    openModal(
                        '장바구니에 담았습니다.',
                        '장바구니로 이동하시겠습니까?',
                        () => {
                            history.push(Paths.ajoonamu.cart);
                        },
                        true,
                    );
                }
            } catch (e) {
                alert('Error!');
            }
        } else {
            try {
                //주소가 존재할 때
                if (addr1) {
                    try {
                        const res = await noAuthAddCart(
                            item_id,
                            options,
                            quanity,
                            lat,
                            lng,
                        );
                        const noAuthCartId = JSON.parse(
                            localStorage.getItem('noAuthCartId'),
                        );

                        if (res.data.msg === '성공') {
                            //이미 담은 cart_id가 존재할 경우
                            if (noAuthCartId) {
                                //기존 list에서 push
                                noAuthCartId.push(res.data.query);
                                //그리고 다시 저장
                                localStorage.setItem(
                                    'noAuthCartId',
                                    JSON.stringify(noAuthCartId),
                                );
                            } else {
                                // cart_id가 존재하지 않을 경우 배열의 형태로 push
                                localStorage.setItem(
                                    'noAuthCartId',
                                    JSON.stringify([res.data.query]),
                                );
                            }
                            openModal('장바구니에 담았습니다.', '장바구니로 이동하시겠습니까?',
                                () => {
                                    history.push(Paths.ajoonamu.cart);
                                },
                                true,
                            );
                        }
                    } catch (e) {
                        
                    }
                } else {
                    openModal('배달지 주소가 설정되지 않았습니다.', '배달지 주소를 설정하시려면 예를 눌러주세요',
                        () => {
                            history.push(Paths.ajoonamu.address);
                        },
                        true,
                    );
                }
            } catch (e) {
                alert('Error!');
            }
        }
    }, [history, item_id, options, quanity, user_token, addr1, lat, lng]);

    useEffect(()=>{
        getMenu();
    },[])

    useEffect(()=>{
        menu && setOptionItem();
        
    },[menu,setOptionItem])
    return (
        <>
            {loading ? (
                <Loading open={true} />
            ) : (
                <>
                        <div className={styles['container']}>
                            <div className={styles['menu-img']}>
                                <img
                                    className={styles['img']}
                                    src={Test}
                                    alt={item_id}
                                />
                                <IconButton className={styles['back']}>
                                    <Back
                                        onClick={onClickBack}
                                        stroke={'#fff'}
                                        strokeWidth={'3'}
                                    />
                                </IconButton>
                            </div>
                            <div className={styles['detail-view']}>
                                <div className={styles['menu-info']}>
                                    <div className={styles['menu-name']}>
                                        {menu && menu.item.item_name}
                                    </div>
                                    <div className={styles['menu-explan']}>
                                       {menu && menu.item.item_sub}
                                    </div>
                                    <div className={styles['cost-count']}>
                                        <div className={styles['cost']}>
                                            {menu && numberFormat(menu.item.item_price)}원
                                            
                                        </div>
                                        <div className={styles['count']}>
                                            <Counter
                                                value={quanity}
                                                onDecrement={onDecrement}
                                                onIncrement={onIncrement}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('title')}>추가 선택</div>
                                <div className={styles['menu-info']}>
                                    <div className={styles['item-text']}>
                                        {menu && menu.options &&
                                            <AdditionalList
                                                itemList={menu && menu.options}
                                                onClickAddItem={onClickOptionItem}
                                            />
                                        }
                            
                                    </div>
                                </div>
                            </div>
                            <Button
                                title={`${quanity}개 담기(${numberFormat(
                                    (menu &&  menu.item.item_price * quanity) + (option_total * quanity),
                                )}원)`}
                                onClick={onClickCart}
                                toggle={true}
                            />
                        </div>
                </>
            )}
        </>
    );
};

export default DetailContainer;
