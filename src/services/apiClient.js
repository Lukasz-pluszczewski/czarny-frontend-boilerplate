import superagent from 'superagent';
import storage from '../helpers/storage';
import config from '../constants/config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  return `${config.apiClient.protocol}://${config.apiClient.host}:${config.apiClient.port}/${path.trim('/')}`;
}

class ApiClient {
  constructor() {
    methods.forEach(method =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        request.timeout(5000);

        if (params) {
          request.query(params);
        }
        if (data) {
          request.send(data);
        }

        request.set(config.authentication.header, storage.load(config.authentication.header));

        request.end((err, res) => {
          const loggedData = {
            requestParams: params,
            requestData: data,
            requestHeaders: request._header,
            responseStatus: res && res.statusCode ? `${res.statusCode} - ${res.statusText}` : 'No response',
            responseBody: res ? res.body : 'No response',
            response: res || 'No response',
            request,
          };

          if (res.ok) {
            logger.apiSuccess(`${method} request to "${request.url}" succeeded`, loggedData);
            return resolve({ statusCode: res.statusCode, message: res.body ? res.body.message : null, body: res.body, res });
          }
          logger.apiError(`${method} request to "${request.url}" failed with${res ? '' : ' no'} code ${loggedData.responseStatus}`, loggedData);
          return reject({ statusCode: res.statusCode, message: res.body ? res.body.message : null, res });
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
  empty() {}
}

const client = new ApiClient();

export default client;
