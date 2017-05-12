import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import requireAuthentication from 'containers/AuthenticationProvider';
import NavPanel from 'containers/NavPanel';
import HomePage from 'pages/HomePage';
import AboutPage from 'pages/AboutPage.js';
import PrivatePage from 'pages/PrivatePage.js';
import LoginPage from 'pages/LoginPage';
import NotFoundPage from 'pages/NotFoundPage.js';

const privateRoute = requireAuthentication([
  {
    component: NotFoundPage,
    role: 'user',
  },
  {
    component: PrivatePage,
    role: 'admin',
  },
]);

export default (
  <Route path="/" component={App}>
    <Route component={NavPanel}>
      <IndexRoute component={HomePage}/>
      <Route path="about" component={AboutPage}/>
      <Route path="private" component={privateRoute}/>
    </Route>
    <Route path="login" component={LoginPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
