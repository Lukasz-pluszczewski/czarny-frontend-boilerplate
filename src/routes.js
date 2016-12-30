import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import requireAuthentication from 'containers/AuthenticationProvider';
import NavPanel from 'containers/NavPanel';
import HomePage from 'Pages/HomePage';
import AboutPage from 'Pages/AboutPage.js';
import PrivatePage from 'Pages/PrivatePage.js';
import LoginPage from 'Pages/LoginPage';
import NotFoundPage from 'Pages/NotFoundPage.js';

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
