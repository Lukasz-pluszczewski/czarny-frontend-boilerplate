import _ from 'lodash';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGIN_FROM_TOKEN,
  LOGIN_FROM_TOKEN_SUCCESS,
  LOGIN_FROM_TOKEN_ERROR,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
} from '../constants/actionTypes';
import initialState from './initialState';

const excludedActions = [
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGIN_FROM_TOKEN,
  LOGIN_FROM_TOKEN_SUCCESS,
  LOGIN_FROM_TOKEN_ERROR,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
];

export default function auth(state = initialState.auth, action) {
  let newState;
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        token: action.result.Token,
        user: action.result.user,
        isAuthenticated: true,
        loggingInFromTokenError: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    case LOGIN_FROM_TOKEN:
      return {
        ...state,
        loggingInFromToken: true,
      };
    case LOGIN_FROM_TOKEN_SUCCESS:
      return {
        ...state,
        loggingInFromToken: false,
        token: action.result.Token,
        user: action.result.user,
        isAuthenticated: true,
        loggingInFromTokenError: null,
        triedToLogFromToken: true,
      };
    case LOGIN_FROM_TOKEN_ERROR:
      return {
        ...state,
        loggingInFromToken: false,
        token: null,
        user: null,
        isAuthenticated: false,
        loggingInFromTokenError: action.error,
        triedToLogFromToken: true,
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        refreshingToken: true,
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        refreshingToken: false,
        refreshingTokenError: null,
        token: action.result.Token,
      };
    case REFRESH_TOKEN_ERROR:
      return {
        ...state,
        refreshingToken: false,
        refreshingTokenError: action.error,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      newState = _.clone(state);
      if (!~excludedActions.indexOf(action.type)) {
        newState = {
          ...newState,
          lastActionTimestamp: Date.now(),
        };
      }
      if (action.error && action.error.statusCode === 401) {
        return {
          ...newState,
          token: null,
          user: null,
          isAuthenticated: false,
        };
      }
      return newState;
  }
}
