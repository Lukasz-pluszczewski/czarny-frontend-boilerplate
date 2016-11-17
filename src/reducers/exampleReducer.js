import _ from 'lodash';
import { EXAMPLE_ACTION, EXAMPLE_ACTION_SUCCESS, EXAMPLE_ACTION_ERROR } from '../constants/actionTypes';
import initialState from './initialState';

export default function exampleReducer(state = initialState.example, action) {
  switch (action.type) {
    case EXAMPLE_ACTION:
      logger.info('Example action started');
      return {
        ...state,
      };
    case EXAMPLE_ACTION_SUCCESS: {
      logger.info('Example action success');
      const list = _.clone(state.list);
      list.push(action.result);
      return {
        ...state,
        list,
      };
    }
    case EXAMPLE_ACTION_ERROR:
      logger.info('Example action error');
      return {
        ...state,
      };
    default:
      return state;
  }
}
