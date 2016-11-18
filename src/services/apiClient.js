import _ from 'lodash';
import superagent from 'superagent';
import { service, dependencies } from 'dinja';
import config from '../constants/config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  return `${config.apiClient.protocol}://${config.apiClient.host}:${config.apiClient.port}/${path.replace(/^\//, '')}`;
}

@dependencies(['Storage'])
@service('ApiClient')
export default class ApiClient {
  constructor(Storage) {
    this.storage = Storage;
    methods.forEach(method =>
      this[method] = (path, { params, data, headers } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        request.timeout(5000);

        if (params) {
          request.query(params);
        }
        if (data) {
          request.send(data);
        }

        if (config.authentication && config.authentication.header) {
          request.set(config.authentication.header, this.storage.load(config.authentication.header));
        }

        if (_.isPlainObject(headers)) {
          _.forEach(headers, (headerValue, headerName) => {
            request.set(headerName, headerValue);
          });
        }

        request.end((err, res) => {
          if (res) {
            const loggedData = {
              requestParams: params,
              requestData: data,
              requestHeaders: request._header,
              responseStatus: res.statusCode ? `${res.statusCode} - ${res.statusText}` : 'No status code',
              responseBody: res.body,
              response: res,
              request,
            };

            if (res.ok) {
              logger.apiSuccess(`${method} request to "${request.url}" succeeded`, loggedData);
              return resolve({
                statusCode: res.statusCode,
                body: res.body,
                res,
              });
            }
            logger.apiError(
              `${method} request to "${request.url}" failed with code ${loggedData.responseStatus}`,
              loggedData
            );
            return reject({
              statusCode: res.statusCode,
              message: res.body ? res.body.message : null,
              res,
            });
          }
          logger.apiError(`${method} request to "${request.url}" failed with no response`);
          return reject({
            statusCode: 503,
            message: 'Service unavailable',
          });
        });
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {} // eslint-disable-line no-empty-function
}
