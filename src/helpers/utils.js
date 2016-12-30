import _ from 'lodash';

/**
 * Transforms query string to object
 * @param {string} queryString - e.g. "?foo=bar&sth=baz"
 * @return {object} - {"foo": "bar", "sth": "baz"}
 */
export function getQueryObject(queryString) {
  const regexp = '[\\?|&]?(\\w+)=([^?&\\s]*)';
  const matches = queryString.match(new RegExp(regexp, 'g'));
  const queryObject = {};
  if (_.isArray(matches)) {
    matches.forEach(val => {
      const matched = val.match(regexp);
      queryObject[matched[1]] = matched[2];
    });
  }
  return queryObject;
}
