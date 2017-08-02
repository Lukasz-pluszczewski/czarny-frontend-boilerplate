import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import reduxPromiseMiddleware from './middleware/reduxPromise';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middlewares = [
    reduxPromiseMiddleware,
    routerMiddleware(browserHistory),
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
}
