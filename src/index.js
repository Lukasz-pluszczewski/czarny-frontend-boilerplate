/* eslint-disable import/first */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// routes
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import routes from './constants/routes';
import App from 'containers/App';

import configureStore from './store/configureStore';

import './favicon.ico';
import './styles/styles.scss';

const store = configureStore();

// translations
import { setLanguage } from 'mi18n-redux';
import en from 'constants/translations/en';
store.dispatch(setLanguage('en', en));

render(
  <Provider store={store}>
    <ConnectedRouter history={createHistory()}>
      <App>
        <Switch>
          {routes.map(route => {
            if (route && route.path && route.component) {
              return (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              );
            }
            return null;
          })}
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
