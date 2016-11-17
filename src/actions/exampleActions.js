import * as types from '../constants/actionTypes';

export function exampleAction() {
  return {
    types: [types.EXAMPLE_ACTION, types.EXAMPLE_ACTION_SUCCESS, types.EXAMPLE_ACTION_FAIL],
    promise: new Promise(resolve => resolve('someData')),
  };
}
