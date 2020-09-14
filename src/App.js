import React, {useEffect, useCallback } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import './App.css';
import './styles/global.scss';
import { get_user_info } from './store/auth/auth';
import { Paths } from 'paths';
import {
    Signin, SignUp, SignupComplete, Recovery, RecoveryId, RecoveryPw, MyPage,
    FindEmail, FindPassword, Home, Account, Address, Reserve, DetailMenu,
    Cart, Order, OrderList, OrderComplete, OrderDetail, Coupon,
    Support, Notice, Event , UpdateName,UpdatePassword,UpdatePhone,ErrorPage
} from 'pages';
import { Route,Switch } from 'react-router-dom';

function App() {

  const {user} = useSelector((state)=>state.auth);

  const dispatch = useDispatch();

  const existJWT = useCallback(() => {
    const token = sessionStorage.getItem("access_token");
    if (token && !user) {
      dispatch(get_user_info(token));
    }
  }, [dispatch]);

  useEffect(() => {
    existJWT();
  }, [existJWT])
  
  return (
    <div className="App">
      <Switch>
        <Route exact={true} path={Paths.index} component={Home}></Route>
        <Route path={Paths.ajoonamu.signin} component={Signin}></Route>
        <Route path={Paths.ajoonamu.signup} component={SignUp}></Route>
        <Route path={Paths.ajoonamu.complete} component={SignupComplete}></Route>
        <Route path={Paths.ajoonamu.recovery} component={Recovery}></Route>
        <Route path={Paths.ajoonamu.recovery_id} component={RecoveryId}></Route>
        <Route path={Paths.ajoonamu.recovery_pw} component={RecoveryPw}></Route>
        <Route path={Paths.ajoonamu.account} component={Account}></Route>
        <Route path={Paths.ajoonamu.address} component={Address} ></Route>
        <Route path={Paths.ajoonamu.mypage} component={MyPage} ></Route>
        <Route path={Paths.ajoonamu.product} exact component={DetailMenu}></Route>
        <Route path={Paths.ajoonamu.shop} component={Reserve}></Route>
        <Route path={Paths.ajoonamu.cart} component={Cart}></Route>
        <Route path={Paths.ajoonamu.order} component={Order}></Route>
        <Route path={Paths.ajoonamu.order_list} component={OrderList}></Route>
        <Route path={Paths.ajoonamu.order_complete} component={OrderComplete}></Route>
        <Route path={Paths.ajoonamu.order_detail} component={OrderDetail}></Route>
        <Route path={Paths.ajoonamu.coupon} component={Coupon}></Route>
        <Route path={Paths.ajoonamu.find_email} component={FindEmail}></Route>
        <Route path={Paths.ajoonamu.find_password} component={FindPassword}></Route>
        <Route path={`${Paths.ajoonamu.event}/:post?`} component={Event}></Route>
        <Route path={Paths.ajoonamu.notice} component={Notice}></Route>
        <Route path={`${Paths.ajoonamu.support}/:tab?`} component={Support}></Route>
        <Route path={Paths.ajoonamu.update_name} component={UpdateName}></Route>
        <Route path={Paths.ajoonamu.update_password} component={UpdatePassword}></Route>
        <Route path={Paths.ajoonamu.update_phone} component={UpdatePhone}></Route>
        <Route component={ErrorPage}/>
        </Switch>
    </div>
  );
}

export default App;
