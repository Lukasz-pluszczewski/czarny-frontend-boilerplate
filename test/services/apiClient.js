import { expect } from 'chai';
import React from 'react';
import nock from 'nock';
import config from 'constants/config';
import apiClient from 'services/apiClient';

const url = `${config.apiClient.protocol}://${config.apiClient.host}:${config.apiClient.port}/`;
const pathOk = 'testPath';
const pathWrong = 'testPathWrong';

const data = {
  testField: 'testValue',
};
const params = {
  testParam: 'testParamValue',
};
const responseOk = {};
const responseWrong = {};

// mocked http endpoints
nock(url)
  .get(pathOk)
  .query(params)
  .reply(200, responseOk);

describe('Api client', () => {
  it('should send GET request with params and return a response', /* () => {
    return expect(apiClient.get(path, {params})).to.eventually.equal();
  }*/);
});
