import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { login, loginFromToken } from 'actions/authActions';
import { getQueryObject } from 'helpers/utils';

class Login extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    location: PropTypes.object,
    user: PropTypes.object,
    loginError: PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    triedToLogFromToken: PropTypes.bool,
    login: PropTypes.func,
    loginFromToken: PropTypes.func,
    muiTheme: PropTypes.object,
  };
  static contextTypes = {
    router: PropTypes.object.isRequired,
    muiTheme: PropTypes.object,
  };
  state = {
    login: '',
    password: '',
  };
  componentWillMount() {
    this.checkAuth();
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  checkAuth() {
    if (!this.props.isAuthenticated && !this.props.triedToLogFromToken) {
      this.props.loginFromToken();
    } else if (this.props.isAuthenticated) {
      this.context.router.push(getQueryObject(this.props.location.search).next || '/');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    return this.props.login(this.state.login, this.state.password);
  }

  handleChangeLogin(e) {
    this.setState({ login: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    let errorCard = null;
    let errorContent = null;
    if (this.props.loginError) {
      errorContent = this.props.loginError.message;
    } else if (this.state.error) {
      errorContent = this.state.error;
    }
    if (errorContent) {
      errorCard = (<div>{errorContent}</div>);
    }

    return (<form onSubmit={e => this.handleSubmit(e)}>
      {errorCard}
      <input
        value={this.state.login}
        onChange={e => this.handleChangeLogin(e)}
        placeholder="Enter login"
      />
      <input
        value={this.state.password}
        onChange={e => this.handleChangePassword(e)}
        placeholder="Enter password"
        type="password"
      />
      <button type="submit">Submit</button>
    </form>);
  }
}

export default connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    loginError: state.auth.loginError,
    triedToLogFromToken: state.auth.triedToLogFromToken,
  }),
  {
    login,
    loginFromToken,
  }
)(Login);
