import _ from 'lodash';
import config from 'constants/config';
import defaultTranslations from 'constants/translations';

export const createTranslator = translations => ({
  translations: translations || defaultTranslations, // change default translations here or by using setTranslations method
  setTranslations(source) {
    this.translations = source;
  },
  getNamespacedTranslations(namespacePath) {
    let namespace = this.translations;
    if (_.isString(namespacePath) && namespacePath) {
      namespace = _.get(this.translations, namespacePath, false);
      if (!namespace) {
        namespace = {};
        logger.warn(config.errors.i18n.NamespaceNotFound, namespacePath);
      }
    }
    return namespace;
  },
  namespace(namespacePath) {
    return createTranslator(this.getNamespacedTranslations(namespacePath));
  },
  translate(...paths) {
    const filteredPath = _.filter(paths, path => _.isString(path) && path);
    if (!filteredPath.length) {
      throw new Error(config.errors.i18n.PathNotProvided);
    }
    const joinedPath = filteredPath.join('.');
    let result = _.get(this.translations, joinedPath, false);
    if (result === false) {
      logger.warn(config.errors.i18n.TranslationNotFound, joinedPath);
      return joinedPath;
    }
    if (_.isObject(result)) {
      return (...path) => this.translate(joinedPath, ...path);
    }
    if (!_.isString(result)) {
      throw new Error(config.errors.i18n.corruptedTranslations);
    }
    return result;
  },
});

export const translator = createTranslator();
