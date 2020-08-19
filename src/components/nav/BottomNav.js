import React, { useState } from 'react';
import styles from './BottomNav.module.scss';
import classNames from 'classnames/bind';
import { Link, useHistory } from 'react-router-dom';
import { Paths } from 'paths';

import homeImageActive from '../svg/bottom-nav/home-active.svg';
import couponImage from '../svg/bottom-nav/coupon.svg';
import deliveryImage from '../svg/bottom-nav/delivery.svg';
import deliveryCloseImage from '../svg/bottom-nav/delivery-close.svg';
import orderlistImage from '../svg/bottom-nav/orderlist.svg';

import MyPageImage from '../svg/bottom-nav/BottomNavMypage';

const cx = classNames.bind(styles);




const BottomNav = () => {


    const history = useHistory();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const goToHome = () => {
        history.push(Paths.index);
    }
    const goToCoupon = () => {
        history.push(`${Paths.ajoonamu.coupon}/mycoupon`)
    }
    const goToOrderList = () => {
        history.push(`${Paths.ajoonamu.order_list}/order`)
    }
    const goToMyPage = () => {
        history.push(`${Paths.ajoonamu.mypage}`);
    }


    return (
        <>
            <div className={styles['bottom-nav']}>
                <div className={styles['pd-box']}>

                    <div className={styles['nav-list']}>
                        <div className={styles['nav-item']} onClick={goToHome}>
                            <div className={styles['icon']}>
                                <img src={homeImageActive} alt="bottom-nav-home" />
                            </div>
                            <div className={styles['menu-name']}>홈</div>
                        </div>

                        <div className={styles['nav-item']} onClick={goToCoupon}>
                            <div className={styles['icon']}>
                                <img src={couponImage} alt="bottom-nav-coupon" />
                            </div>
                            <div className={styles['menu-name']}>쿠폰</div>
                        </div>

                        <div className={cx('nav-item', 'order')}>
                            <input type="checkbox"className={styles["menu-open"]} checked={open} />
                            <div className={styles["menu-open-button"]} onClick={handleOpen}>
                                <div className={cx('menu', { visible: !open })}>
                                    <img src={deliveryImage} alt="bottom-nav-delivery" />
                                </div>
                                <div className={cx('menu', { visible: open })}>
                                    <img src={deliveryCloseImage} alt="bottom-nav-delivery" />
                                </div>
                            </div>
                            <Link to="#" className={styles["menu-item"]}>예약주문</Link>
                            <Link to="#" className={styles["menu-item"]}>택배배송</Link>
                        </div>
                        <div className={styles['nav-item']} onClick={goToOrderList}>
                            <div className={styles['icon']}>
                                <img src={orderlistImage} alt="bottom-nav-orderlist" />
                            </div>
                            <div className={styles['menu-name']}>주문내역</div>
                        </div>
                        <div className={styles['nav-item']} onClick={goToMyPage}>
                            <div className={styles['icon']}>
                                <MyPageImage />
                            </div>
                            <div className={styles['menu-name']}>마이페이지</div>
                        </div>
                    </div>
                </div>
            </div>

            {open &&
                <div className={styles['dim']} onClick={handleClose}>

                </div>
            }
        </>
    )
}

export default BottomNav;







// import React  from 'react';
// import styles from './BottomNav.module.scss';
// import classNames  from 'classnames/bind';
// // import {NavLink,Link} from 'react-router-dom';
// import { useHistory} from 'react-router-dom';
// // import styled from 'styled-components';
// import { Paths } from 'paths';

// import { AiOutlineHome } from 'react-icons/ai';
// import { RiCouponLine } from 'react-icons/ri';
// import { RiFileList2Line } from 'react-icons/ri';
// import { AiOutlineUser } from 'react-icons/ai';

// const cx = classNames.bind(styles);

// // const TabLink = styled(NavLink)`
// //     text-decoration:none;
// //     color:black;
// //     text-align: center;
// //     display : flex;
// //     flex-direction:column;
// //     justify-content:center;
// //     align-items:center;
// //     width: 60px;
// //         height: 45px;

// // `;
// // const LinkBtn = styled(Link)`
// //     text-decoration:none;
// //     color:black;
// //     display: table-cell; /* 핵심! */
// //     vertical-align: middle; 
// //     text-align: center;
// // `;

// const BottomNav = () => {
//     return (
//         <div className={styles['bottom-nav']}>
//             <div className={styles['pd-box']}>
//                 <NavList />
//             </div>
//         </div>
//     )
// }
// const NavList = () => {

//     const history =useHistory();
//     // const location = useLocation();
//     // const [path,setPath] = useState('');

//     // const activeStyle = {
//     //     height: '100%',
//     //     textDecoration: 'none',
//     //     color: 'black',
//     //     borderBottom: '3px solid #000'
//     // };

//     const goToHome =()=>{
//         history.push(Paths.index);
//     }
//     const goToCoupon =()=>{
//         history.push(`${Paths.ajoonamu.coupon}/mycoupon`)
//     }
//     const goToOrderList =()=>{
//        history.push(`${Paths.ajoonamu.order_list}/order`)
//     }
//     const goToMyPage =()=>{
//         history.push(`${Paths.ajoonamu.mypage}`);
//     }

//     return (
//         <div className={styles['nav-list']}>
//             <div className={styles['nav-item']} onClick={goToHome}>
//                 <div className={styles['icon']}><AiOutlineHome /></div>
//                 <div className={styles['menu']}>홈</div>
//             </div>
            // <div className={styles['nav-item']} onClick={goToCoupon}>
            //     <div className={styles['icon']}><RiCouponLine /></div>
            //     <div className={styles['menu']}>쿠폰</div>
            // </div>

//             <div className={cx('nav-item','order')}>
//                 <div className={styles['menu']}>주문</div>
//             </div>
//             <div className={styles['nav-item']} onClick={goToOrderList}>
//                 <div className={styles['icon']}><RiFileList2Line /></div>
//                 <div className={styles['menu']}>주문내역</div>
//             </div>
//             <div className={styles['nav-item']} onClick={goToMyPage}>
//                 <div className={styles['icon']}><AiOutlineUser/></div>
//                 <div className={styles['menu']}>마이페이지</div>
//             </div>
//         </div>
//     )
// }



// export default BottomNav;
