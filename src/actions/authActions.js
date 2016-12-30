import authService from '../services/authService';
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

export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_ERROR],
    promise: ({ client }) => authService(client).loginFromCredentials(username, password),
  };
}

export function loginFromToken() {
  return {
    types: [LOGIN_FROM_TOKEN, LOGIN_FROM_TOKEN_SUCCESS, LOGIN_FROM_TOKEN_ERROR],
    promise: ({ client }) => authService(client).loginFromToken(),
  };
}

export function refreshToken() {
  return {
    types: [REFRESH_TOKEN, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_ERROR],
    promise: ({ client }) => authService(client).refreshToken(),
  };
}

export function logout() {
  return {
    type: LOGOUT,
    promise: ({ client }) => Promise.resolve(authService(client).logout()),
  };
}
