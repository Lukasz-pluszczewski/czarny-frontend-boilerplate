export default {
  example: {
    isLoading: false,
    error: null,
    list: [],
  },
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
