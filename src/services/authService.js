import { browserHistory } from 'react-router';
import config from '../constants/config';
import storage from '../helpers/storage';

const storedTokenName = config.authentication.header;

const authService = apiClient => ({
  loginFromCredentials(username, password) {
    return apiClient.post('authenticate', { data: { username, password } })
      .then(result => {
        if (result.body.Token) {
          logger.info('logged in');
          storage.save(storedTokenName, result.body.Token);
          return Promise.resolve(result.body);
        }
        logger.warn(`POST to 'authenticate' finished successfully, however token was not in the response. Got message: "${result.message}"`, result);
        return Promise.reject(result.message);
      }, err => {
        logger.error(`Logging in failed with status ${err.statusCode} - "${err.res.statusText}". Got error "${err.message}"`);
        return Promise.reject(err.message);
      });
  },
  loginFromToken() {
    return new Promise((resolve, reject) => {
      const token = storage.load(storedTokenName);
      if (!token) {
        logger.info(`Cannot log in from token. No token saved locally`);
        return reject('No token saved');
      }
      apiClient.get('auth-check')
        .then(result => {
          if (result.body.Token) {
            logger.info('Logged in from token');
            storage.save(storedTokenName, result.body.Token);
            return resolve(result.body);
          }
          logger.warn(`Logged in from token failed. Got message: "${result.message}"`, result.body);
          reject(result.message);
          storage.remove(storedTokenName);
          browserHistory.push('/login');
        }, err => {
          logger.error(`Logged in from token failed with status ${err.statusCode} - "${err.res.statusText}". Got error: "${err.message}"`, err);
          storage.remove(storedTokenName);
          browserHistory.push('/login');
          reject(err.message);
        });
    });
  },
  refreshToken() {
    return new Promise((resolve, reject) => {
      const token = storage.load(storedTokenName);
      if (!token) {
        logger.info(`Cannot refresh token. No token saved locally`);
        return reject('No token saved');
      }
      apiClient.get('refreshtoken')
        .then(result => {
          if (result.body.Token) {
            logger.info(`Refreshed token for user: ${result.body.user.name}`);
            storage.save(storedTokenName, result.body.Token);
            resolve(result.body);
          } else {
            logger.info(`Refreshing token failed. Got message: "${result.message}"`, result.body);
            storage.remove(storedTokenName);
            browserHistory.push('/login');
            reject(result.message);
          }
        }, err => {
          logger.error(`Refreshing token failed with status ${err.statusCode} - "${err.res.statusText}". Got error: "${err.message}"`);
          storage.remove(storedTokenName);
          browserHistory.push('/login');
          reject(err.message);
        });
    });
  },
  logout() {
    logger.info('Logged out');
    storage.remove(storedTokenName);
    browserHistory.push('/login');
  },
});

export default authService;
