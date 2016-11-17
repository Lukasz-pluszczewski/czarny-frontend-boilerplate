import { EXAMPLE_ACTION } from '../constants/actionTypes';
import initialState from './initialState';

export default function exampleReducer(state = initialState.example, action) {
  switch (action.type) {
    case EXAMPLE_ACTION:
      return {
        ...state,
      };
    default:
      return state;
  }
}
