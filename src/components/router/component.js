import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { store } from '../../store/store';

import { BaseWrapper } from '../base';
import { PageLoginWrapper } from '../page-login';
import { PageDashboard } from '../page-dashboard';

import { PageSampleWrapper } from '../page-sample';
import { PageSampleFormWrapper } from '../page-sample-form';

import { getCookie, clearCookie } from '../../helpers/constants';

const history = syncHistoryWithStore(browserHistory, store);

export class AppRoute extends Component {
  static isLoggedIn() {
    if (!getCookie('auth', `${process.env.REACT_APP_PROJECT}_isLoggedIn`)) {
      console.error('router - You are not logged in, please login first');
      browserHistory.push('/login');
    }
  }
  static checkLogin() {
    if (getCookie('auth', `${process.env.REACT_APP_PROJECT}_isLoggedIn`)) {
      browserHistory.push('/');
    }
  }
  static setLogout() {
    clearCookie('auth');
    clearCookie('profile');
    clearCookie('permission');
    browserHistory.push('/login');
  }
  render () {
    return (
      <Provider store={store}>
        <Router
          onUpdate={() => window.scrollTo(0, 0)}
          history={history}
        >
          <Route path="/login" component={PageLoginWrapper} onEnter={AppRoute.checkLogin} />
          <Route path="/" component={BaseWrapper} onEnter={AppRoute.isLoggedIn}>
            <IndexRoute component={PageDashboard} />
            <Route path="/beranda" component={PageDashboard} />
            <Route path="/sample/form" component={PageSampleFormWrapper} />
            <Route path="/sample/form/:id" component={PageSampleFormWrapper} />
            <Route path="/sample" component={PageSampleWrapper} />
            <Route path="/keluar" onEnter={AppRoute.setLogout} />

          </Route>
        </Router>
      </Provider>
    );
  }
}

export default AppRoute;
