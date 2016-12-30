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
  errors: {
    authentication: {
      noTokenSaved: {
        code: 0,
        message: 'No token saved'
      },
    },
    i18n: {
      TranslationNotFound: {
        code: 0,
        message: 'Translation not found',
      },
      PathNotProvided: {
        code: 0,
        message: 'Path for translator not provided',
      },
      NamespaceNotFound: {
        code: 0,
        message: 'Namespace not found',
      },
      AsyncError: {
        code: 0,
        message: 'Async translation failed',
      },
      CorruptedTranslations: {
        code: 0,
        message: 'Corrupted translations',
      },
    }
  }
};
