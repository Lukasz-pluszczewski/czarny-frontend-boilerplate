import _ from 'lodash';
import PropTypes from 'prop-types';
import routes from 'constants/routes';

export const routeId = (props, propName, componentName) => {
  if (props[propName]) {
    if (typeof value !== 'string' || !_.find(routes, { id: props[propName] })) {
      return new Error(`${propName} in ${componentName} must be a valid route id. Route with id "${props[propName]}" not found.`);
    }
  }

  // assume all ok
  return null;
};

routeId.isRequired = (props, propName, componentName) => {
  if (_.isNil(props[propName])) {
    const value = typeof props[propName] === 'undefined' ? 'undefined' : 'null';
    return new Error(`${propName} prop in ${componentName} component is required. But it's value is ${value}`);
  }

  return routeId(props, propName, componentName);
};

export default {
  routeId,
};
