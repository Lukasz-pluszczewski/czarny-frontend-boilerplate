import { combineReducers } from 'services/reduxBreeze';
import { routerReducer } from 'react-router-redux';
import { reducer as mi18nReducer } from 'mi18n-redux';

const rootReducer = combineReducers({
  router: routerReducer,
  i18n: mi18nReducer,
});

export default rootReducer;
