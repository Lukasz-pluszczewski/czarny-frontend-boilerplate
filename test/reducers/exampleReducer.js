import { expect } from 'chai';
import exampleReducer from 'reducers/exampleReducer';
import { EXAMPLE_ACTION, EXAMPLE_ACTION_SUCCESS, EXAMPLE_ACTION_ERROR } from 'constants/actionTypes';
import initialState from 'reducers/initialState';

describe('exampleReducer', () => {
  it('should return initial state', () => {
    expect(exampleReducer(undefined, {})).to.be.deep.equal(initialState.example);
  });
  it('should add element to list', () => {
    const name = 'testName';
    const action = {
      type: EXAMPLE_ACTION_SUCCESS,
      result: name,
    };
    const expectedState = {
      list: [
        name,
      ],
    };
    expect(exampleReducer(initialState.example, action)).to.be.deep.equal(expectedState);
  });
});
