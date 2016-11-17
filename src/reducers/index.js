import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  example: exampleReducer,
  routing: routerReducer,
});

export default rootReducer;
