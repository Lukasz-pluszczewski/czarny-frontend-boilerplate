import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  exampleReducer,
  routing: routerReducer,
});

export default rootReducer;
