import { expect } from 'chai';
import nock from 'nock';
import sinon from 'sinon';
import config from 'constants/config';
import apiClient from 'services/apiClient';
import storage from 'helpers/storage';

const url = `${config.apiClient.protocol}://${config.apiClient.host}:${config.apiClient.port}/v1/`;
const pathOk = '/testPath';
const pathWrong = '/testPathWrong';

const body = {
  testField: 'testValue',
};
const params = {
  testParam: 'testParamValue',
};

const headers = {
  'test-header': 'test-value',
};
const responseHeaders = {
  'response-header': 'test-value',
};

const responseOk = {
  responseField: 'responseOkValue',
};
const responseWrong = {
  message: 'responseWrongMessage',
};

// mocked http endpoints
nock(url)
  .defaultReplyHeaders(responseHeaders)

  .get(pathOk)
  .query(params)
  .reply(200, responseOk)

  .post(pathOk, body)
  .query(params)
  .reply(201, responseOk)

  .put(pathOk, body)
  .query(params)
  .reply(200, responseOk)

  .delete(pathOk)
  .query(params)
  .reply(200, responseOk)

  .get(pathOk)
  .matchHeader('test-header', headers['test-header'])
  .reply(200, responseOk)

  .get(pathWrong)
  .reply(404, responseWrong);

describe('Api client', () => {
  sinon.stub(storage, 'load').callsFake(() => {}); // eslint-disable-line no-empty-function
  it('should send GET request with params and return a response', done => {
    apiClient.get(pathOk, { params }).then(result => {
      expect(result.statusCode).to.be.equal(200);
      expect(result.body).to.be.deep.equal(responseOk);
      expect(result).to.have.property('title');
      expect(result).to.have.property('res');
      expect(result.res).to.be.an('object');
      expect(result.res.headers).to.be.an('object');
      expect(result.res.headers['response-header']).to.be.equal(responseHeaders['response-header']);
      done();
    }).catch(err => {
      done(new Error(err.message));
    });
  });
  it('should send POST request with params and body and return a response', done => {
    apiClient.post(pathOk, { params, data: body }).then(result => {
      expect(result.statusCode).to.be.equal(201);
      expect(result.body).to.be.deep.equal(responseOk);
      expect(result).to.have.property('title');
      expect(result).to.have.property('res');
      expect(result.res).to.be.an('object');
      expect(result.res.headers).to.be.an('object');
      expect(result.res.headers['response-header']).to.be.equal(responseHeaders['response-header']);
      done();
    }).catch(err => {
      done(new Error(err.message));
    });
  });
  it('should send PUT request with params and return a response', done => {
    apiClient.put(pathOk, { params, data: body }).then(result => {
      expect(result.statusCode).to.be.equal(200);
      expect(result.body).to.be.deep.equal(responseOk);
      expect(result).to.have.property('title');
      expect(result).to.have.property('res');
      expect(result.res).to.be.an('object');
      expect(result.res.headers).to.be.an('object');
      expect(result.res.headers['response-header']).to.be.equal(responseHeaders['response-header']);
      done();
    }).catch(err => {
      done(new Error(err.message));
    });
  });

  it('should send DELETE request with params and return a response', done => {
    apiClient.del(pathOk, { params }).then(result => {
      expect(result.statusCode).to.be.equal(200);
      expect(result.body).to.be.deep.equal(responseOk);
      expect(result).to.have.property('title');
      expect(result).to.have.property('res');
      expect(result.res).to.be.an('object');
      expect(result.res.headers).to.be.an('object');
      expect(result.res.headers['response-header']).to.be.equal(responseHeaders['response-header']);
      done();
    }).catch(err => {
      done(new Error(err.message));
    });
  });

  it('should send headers with GET request and return a response', done => {
    apiClient.get(pathOk, { headers }).then(result => {
      expect(result.statusCode).to.be.equal(200);
      expect(result.body).to.be.deep.equal(responseOk);
      expect(result).to.have.property('title');
      expect(result).to.have.property('res');
      expect(result.res).to.be.an('object');
      expect(result.res.headers).to.be.an('object');
      expect(result.res.headers['response-header']).to.be.equal(responseHeaders['response-header']);
      done();
    }).catch(err => {
      done(new Error(err.message));
    });
  });

  it('should send GET request to wrong path and return error', done => {
    apiClient.get(pathWrong).then(() => {
      done(new Error('Wrong request has been resolved but should have been rejected'));
    }, result => {
      expect(result.statusCode).to.be.equal(404);
      expect(result.message).to.be.deep.equal(responseWrong.message);
      expect(result).to.have.property('title');
      expect(result).to.have.property('res');
      expect(result.res).to.be.an('object');
      done();
    });
  });

  it('should send GET request to path that does not work and return service unavailable 503 error', done => {
    apiClient.get('non-existing-path').then(() => {
      done(new Error('Wrong request has been resolved but should have been rejected'));
    }, result => {
      expect(result.statusCode).to.be.equal(503);
      expect(result.message).to.be.equal('Service unavailable');
      expect(result).to.have.property('title');
      expect(result).to.not.have.property('body');
      expect(result).to.not.have.property('res');
      done();
    });
  });
});
