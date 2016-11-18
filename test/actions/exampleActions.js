import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { exampleAction } from 'actions/exampleActions';
import {
  EXAMPLE_ACTION,
  EXAMPLE_ACTION_SUCCESS,
  EXAMPLE_ACTION_ERROR,
} from 'constants/actionTypes';

chai.use(chaiAsPromised);

describe('ExampleAction creator', () => {
  it('should create example action', done => {
    const name = 'testName';
    const actionTypes = [
      EXAMPLE_ACTION,
      EXAMPLE_ACTION_SUCCESS,
      EXAMPLE_ACTION_ERROR,
    ];
    const action = exampleAction(name);

    expect(action.types).to.deep.equal(actionTypes);
    expect(action.promise).to.be.a('function');
    expect(action.promise(name)).to.be.eventually.equal(name).notify(done);
  });
});
