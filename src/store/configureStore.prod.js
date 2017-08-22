import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import reduxBetterPromise from 'redux-better-promise';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middlewares = [
    reduxBetterPromise(),
    routerMiddleware(browserHistory),
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
}
