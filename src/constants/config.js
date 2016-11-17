export default {
  apiClient: {
    host: 'localhost',
    port: '3030',
    protocol: 'http',
  },
  authentication: {
    header: 'jwt',
  },
  debug: {
    varboseLog: true,
    environment: process.env.NODE_ENV,
  },
};
