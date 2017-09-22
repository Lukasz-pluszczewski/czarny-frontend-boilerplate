import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import exampleService from 'services/exampleService';

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('exampleService', () => {
  it('should return true', () => {
    expect(exampleService.giveMeTrue()).to.equal(true);
  });
  it('should return false', () => {
    expect(exampleService.giveMeFalse()).to.equal(false);
  });
  it('should return false', () => {
    expect(exampleService.giveMe(null)).to.equal(false);
  });
  it('should trigger function', () => {
    const spy = sinon.stub().returns('return');

    expect(exampleService.triggerFunction(spy, 'param')).to.equal('return');
    expect(spy).to.be.calledOnce;
    expect(spy).to.be.calledWith('param');
  });
});
