import client from './client';
import config from 'constants/config';

const formatUrl = path => {
  const { protocol, host, port, apiVersion } = config.apiClient;
  let url = '';
  if (protocol) {
    url += `${protocol}://`;
  }
  if (host) {
    url += host;
  }
  if (port) {
    url += `:${port}`;
  }
  if (apiVersion) {
    url += `/v${apiVersion}`;
  }
  return `${url}/${path.replace(/^\//, '')}`;
};

const request = (method, path, { data, params } = {}) => client[method](formatUrl(path), { data, params });

const ApiClient = {
  // blog
  examplePost({ param, body }) {
    return request('post', 'examplePath', { params: { param }, data: body });
  },
};

export default ApiClient;
