import React, { useState, useCallback, useEffect } from 'react';
import { Paths } from 'paths';
import { useHistory } from 'react-router';
import styles from './Detail.module.scss';
import Button from 'components/button/Button';
import AdditionalList from 'components/item/AdditionalList';
import Counter from 'components/counter/Counter';
import Test from 'components/svg/cart/test.png';
import classNames from 'classnames/bind';
import Back from 'components/svg/header/Back';
import { numberFormat } from '../../lib/formatter';
import Loading from '../../components/asset/Loading';
import {getMenuInfo} from '../../api/menu/menu';
import {addCartItem} from '../../api/cart/cart';
import {useStore} from '../../hooks/useStore';
const cx = classNames.bind(styles);

const DetailContainer = ({ item_id }) => {
    const history = useHistory();
    const user_token = useStore();
    const [menu ,setMenu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success ,setSuccess]= useState(false);
    const [error, setError] =useState(false);
    const [quanity, setQuanity] = useState(1);
    const [options, setOptions] = useState(null);
    const [option_total,setOptionTotal] = useState(0);
    const onClickBack = () => history.goBack();
    
    const onClickCart =  useCallback(async () => {
        setLoading(true);
        setSuccess(false);
        if(user_token){
            const res = await addCartItem(user_token,item_id,options,quanity);
            console.log(res);
            setSuccess(true);
        }
        setLoading(false);
        history.push(Paths.ajoonamu.cart);
    },[history,item_id,options,quanity,user_token]);

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

    const getMenu =  useCallback (async ()=>{
        setLoading(true);

        if(user_token){
            const res = await getMenuInfo(user_token,item_id)
            setMenu(res);
            setSuccess(true);
        }
        else setError(true);
        setLoading(false);

    },[item_id,user_token]);

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

    useEffect(()=>{
        getMenu();
    },[getMenu])

    useEffect(()=>{
        menu && setOptionItem();
        
    },[menu,setOptionItem])
    return (
        <>
            {loading ? (
                <Loading open={true} />
            ) : (
                <>
                    {
                        (success && !error) && 
                        <div className={styles['container']}>
                            <div className={styles['menu-img']}>
                                <img
                                    className={styles['img']}
                                    src={Test}
                                    alt={item_id}
                                />
                                <div className={styles['back']}>
                                    <Back
                                        onClick={onClickBack}
                                        stroke={'#fff'}
                                        strokeWidth={'3'}
                                    />
                                </div>
                            </div>
                            <div className={styles['detail-view']}>
                                <div className={styles['menu-info']}>
                                    <div className={styles['menu-name']}>
                                        {item_id}
                                    </div>
                                    <div className={styles['menu-explan']}>
                                        싱싱한 과일들로 구성된 알찬
                                        도시락입니다.
                                    </div>
                                    <div className={styles['cost-count']}>
                                        <div className={styles['cost']}>
                                            {numberFormat(menu.item.item_price * quanity)}원
                                            
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
                                        <AdditionalList
                                            itemList={menu.options}
                                            onClickAddItem={onClickOptionItem}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button
                                title={`${quanity}개 담기(${numberFormat(
                                    (menu.item.item_price * quanity) + option_total,
                                )}원)`}
                                onClick={onClickCart}
                                toggle={true}
                            />
                        </div>
                    }
                </>
            )}
        </>
    );
};

export default DetailContainer;
