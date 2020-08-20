import React, { useEffect, useCallback } from 'react';
import ScrollToTop from 'components/scrollTop/ScrollToTop';
import { useDispatch } from 'react-redux';
import './App.css';
import { get_user_info } from './store/auth/auth';

import { Paths } from 'paths';
import { Signin, SignUp, SignupComplete, Recovery, RecoveryId, RecoveryPw, MyPage } from 'pages';
import { Home, Account, Address, Reserve, DetailMenu } from 'pages';
import { Cart, Order, OrderList, Coupon } from 'pages';
import { Route, Switch } from 'react-router-dom';

function App() {

  const dispatch = useDispatch();

  const existJWT = useCallback(() => {
    const token = sessionStorage.getItem("access_token");
    console.log(token === null)
    if (token !== null && token !== undefined) {
      dispatch(get_user_info(token));
    }
  }, [dispatch]);

  useEffect(() => {
    existJWT();
  }, [existJWT])

  return (
    <div className="App">
      <ScrollToTop>
        <Route exact={true} path={Paths.index} component={Home}></Route>
        <Route path={Paths.ajoonamu.signin} component={Signin}></Route>
        <Route path={Paths.ajoonamu.signup} component={SignUp}></Route>
        <Route path={`${Paths.ajoonamu.complete}`} component={SignupComplete}></Route>
        <Route path={Paths.ajoonamu.recovery} component={Recovery}></Route>
        <Route path={Paths.ajoonamu.recovery_id} component={RecoveryId}></Route>
        <Route path={Paths.ajoonamu.recovery_pw} component={RecoveryPw}></Route>
        <Route path={Paths.ajoonamu.account} component={Account}></Route>
        <Route path={Paths.ajoonamu.address} component={Address} ></Route>
        <Route path={Paths.ajoonamu.mypage} component={MyPage} ></Route>
        <Switch>
          <Route path={`${Paths.ajoonamu.shop}/:tab/:value`} exact component={DetailMenu}></Route>
          <Route path={`${Paths.ajoonamu.shop}/:tab`} component={Reserve}></Route>
        </Switch>
        <Route path={Paths.ajoonamu.cart} component={Cart}></Route>
        <Route path={Paths.ajoonamu.order} component={Order}></Route>
        <Route path={`${Paths.ajoonamu.order_list}/:tab?`} component={OrderList}></Route>
        <Route path={`${Paths.ajoonamu.coupon}/:tab?`} component={Coupon}></Route>
      </ScrollToTop>
    </div>
  );
}





export default App;
