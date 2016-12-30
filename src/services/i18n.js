import _ from 'lodash';
import config from 'constants/config';
import defaultTranslations from 'constants/translations';

/**
 * Creates translator and sets given translations
 * @param {object} translations
 * @return {object} translator
 */
export const createTranslator = translations => ({
  translations: translations || defaultTranslations, // change default translations here or by using setTranslations method

  /**
   * Sets translations object
   * @param {object} source
   * @return {void}
   */
  setTranslations(source) {
    this.translations = source;
  },

  /**
   * Returns part of the translations from given namespacePath
   * @param {string} namespacePath
   * @return {object} part of translations from given namespacePath
   */
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

  /**
   * Returns new instance of translator with part of the translations from given namespacePath
   * @param {string} namespacePath
   * @return {object} translator
   */
  namespace(namespacePath) {
    return createTranslator(this.getNamespacedTranslations(namespacePath));
  },

  /**
   * Translates given path
   * @param {array<string>} paths all params should be non empty string - other types will be ignored
   * @return {string|function} translated text or path when not found or namespaced translate function if there is an object in given path
   */
  translate(...paths) {
    const filteredPath = _.filter(paths, path => _.isString(path) && path);
    if (!filteredPath.length) {
      throw new Error(config.errors.i18n.PathNotProvided);
    }
    const joinedPath = filteredPath.join('.');
    const result = _.get(this.translations, joinedPath, false);
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

export default createTranslator(defaultTranslations);
