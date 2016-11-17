import { createStore, compose, applyMiddleware } from 'redux';
import reduxPromiseMiddleware from './middleware/reduxPromise';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middlewares = [
    reduxPromiseMiddleware,
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
}
