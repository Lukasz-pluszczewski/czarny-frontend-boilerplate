import {
  EXAMPLE_ACTION,
  EXAMPLE_ACTION_SUCCESS,
  EXAMPLE_ACTION_ERROR
} from '../constants/actionTypes';

export function exampleAction(name) {
  return {
    types: [EXAMPLE_ACTION, EXAMPLE_ACTION_SUCCESS, EXAMPLE_ACTION_ERROR],
    promise: () => new Promise(resolve => resolve(name)),
  };
}
