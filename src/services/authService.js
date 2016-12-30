import { browserHistory } from 'react-router';
import config from '../constants/config';
import storage from '../helpers/storage';

const storedTokenName = config.authentication.header;

const authService = apiClient => ({
  loginFromCredentials(username, password) {
    return apiClient.post('login', { data: { username, password }})
      .then(result => {
        if (result.body.token) {
          logger.info('Logged in successfully');
          storage.save(storedTokenName, result.body.token);
        }
        logger.warn(`POST to 'login' finished successfully, however token was not in the response. Got message: "${result.body.message}`, result);
        return Promise.reject(result.body.message);
      });
  },
  loginFromToken() {
    const token = storage.load(storedTokenName);
    if (!token) {
      logger.info('Cannot log in from token. No token saved in storage');
      return Promise.reject('No token saved')
    }
    apiClient.get('auth-check')
      .then(result => {
        if (result.body.token) {
          logger.info('Logged in from token');
          storage.save(storedTokenName, result.body.token);
          return result.body;
        }
        logger.warn(`Logged in from token failed. Got message: "${result.body.message}"`, result.body);
        storage.remove(storedTokenName);
        browserHistory.push('/login');
        return Promise.reject(result.body.message);
      })
      .catch(error => {
        logger.error(`Logged in from token failed with status ${err.statusCode} - "${err.res.statusText}". Got error: "${err.message}"`, err);
        storage.remove(storedTokenName);
        browserHistory.push('/login');
        return error.message;
      });
  },
  logout() {
    logger.info('Logged out');
    storage.remove(storedTokenName);
    browserHistory.push('/login');
  },
});

export default authService;
