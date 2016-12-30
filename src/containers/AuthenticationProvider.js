import React, { Component as ReactComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginFromToken } from '../actions/authActions';
import _ from 'lodash';

export default function requireAuthentication(Components) {
  class AuthenticatedComponent extends ReactComponent {
    static propTypes = {
      isAuthenticated: PropTypes.bool,
      location: PropTypes.object,
      token: PropTypes.string,
      user: PropTypes.object,
      children: PropTypes.node,
      triedToLogFromToken: PropTypes.bool,
      loginFromToken: PropTypes.func,
    };
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    componentWillMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.isAuthenticated && this.props.triedToLogFromToken) {
        this.context.router.push(`/login?next=${this.props.location.pathname}`);
      } else if (!this.props.isAuthenticated) {
        this.props.loginFromToken();
      }
    }

    render() {
      if (this.props.isAuthenticated) {
        if (_.isArray(Components)) {
          let Component = _.find(Components, { role: this.props.user.role });
          if (Component) {
            Component = Component.component;
            return <Component location={this.props.location}>{ this.props.children }</Component>;
          }
          return null;
        }
        return <Components location={this.props.location}>{ this.props.children }</Components>;
      }
      return null;
    }
  }

  return connect(
    state => ({
      token: state.auth.token,
      user: state.auth.user,
      isAuthenticated: state.auth.isAuthenticated,
      triedToLogFromToken: state.auth.triedToLogFromToken,
    }),
    {
      loginFromToken,
    }
  )(AuthenticatedComponent);
}
