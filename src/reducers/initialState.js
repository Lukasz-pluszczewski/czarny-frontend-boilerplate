export default {
  example: {},
  auth: {
    loggingIn: false,
    loginError: null,
    token: null,
    user: null,
    isAuthenticated: false,
    loggingInFromToken: false,
    loggingInFromTokenError: null,
    refreshingToken: false,
    refreshingTokenError: null,
    triedToLogFromToken: false,
    lastActionTimestamp: Date.now(),
  },
};
