import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import authReducer from './authReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  example: exampleReducer,
  auth: authReducer,
  routing: routerReducer,
});

export default rootReducer;
