/* eslint-disable no-console */
import _ from 'lodash';
import config from '../constants/config';

const { environment, verboseLog } = config.debug;

const css = {
  log: 'color: green',
  info: 'color: lightgrey',
  warn: 'color: #9c9cff',
  error: 'color: red',
  apiSuccess: 'color: darkgrey',
  apiError: 'color: #ffa4a4',
  form: 'color: blue',
  debug: 'background-color: black; color: white; font-weight: bold',
};
const logTypes = {
  log: 'log',
  warn: 'warn',
  error: 'error',
  info: 'info',
};

const logger = (...args) => logger.debug(...args);
logger.logstyled = (logtype, style, addBacktrace, ...argums) => {
  let args = argums;
  if (environment !== 'development') {
 return;
}
  const groupArgs = [];
  if (verboseLog) {
    groupArgs.push('%c' + _.head(args));
    groupArgs.push(_.isUndefined(css[style]) ? style : css[style]);
    args = _.tail(args);
    const createGroup = (_.size(args) || addBacktrace) && typeof console.groupCollapsed !== 'undefined';
    if (createGroup) {
      console.groupCollapsed(...groupArgs);
    } else {
      console[logtype](...groupArgs);
    }
    _.forEach(args, arg => {
      if (_.isObject(arg) && _.size(arg) < 15) {
        _.forEach(arg, (el, key) => {
          console[logtype]('%c' + key, 'font-weight: bold', el);
        });
      } else {
        console[logtype](arg);
      }
    });
    if (addBacktrace) {
      console.trace();
    }
    if (createGroup) {
      console.groupEnd();
    }
  } else {
    args = _.reduce(args, (accu, arg) => {
      if (_.isString(arg)) {
        accu.push('%c' + arg);
        accu.push(_.isUndefined(css[style]) ? style : css[style]);
      }
      return accu;
    }, []);
    console[logtype](...args);
  }
};
logger.log = (...args) => logger.logstyled(logTypes.log, 'log', false, ...args);
logger.info = (...args) => logger.logstyled(logTypes.info, 'info', false, ...args);
logger.warn = (...args) => logger.logstyled(logTypes.warn, 'warn', false, ...args);
logger.error = (...args) => logger.logstyled(logTypes.log, 'error', true, ...args);
logger.apiSuccess = (...args) => logger.logstyled(logTypes.log, 'apiSuccess', false, ...args);
logger.apiError = (...args) => logger.logstyled(logTypes.log, 'apiError', true, ...args);
logger.form = (...args) => logger.logstyled(logTypes.log, 'form', false, ...args);
logger.debug = (...args) => logger.logstyled(logTypes.log, 'debug', false, ...args);
logger.debugTrace = (...args) => logger.logstyled(logTypes.log, 'debug', true, ...args);
logger.timeTracks = [];
logger.time = name => {
  if (_.includes(logger.timeTracks, name)) {
    return logger.timeEnd(name);
  }
  logger.timeTracks.push(name);
  return console.time(name);
};
logger.timeEnd = name => {
  _.remove(logger.timeTracks, val => val === name);
  return console.timeEnd(name);
};

export function addLoggerToGlobals() {
  if (typeof window !== 'undefined') {
    window.logger = logger;
  } else {
    global.logger = logger;
  }
  if (environment === 'development') {
    console.info('App initialized in development environment');
  }
}

export default logger;
