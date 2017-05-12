import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from 'actions/authActions';
import { Link, IndexLink } from 'react-router';

class NavPanel extends Component {
  static propTypes = {
    children: PropTypes.element,
    user: PropTypes.object,
    logout: PropTypes.func,
  };

  render() {
    return (
      <div>
        <div>
          <IndexLink to="/">Home</IndexLink>
          <span style={{ padding: '0 5px' }}>|</span>
          <Link to="about">about</Link>
          <span style={{ padding: '0 5px' }}>|</span>
          <Link to="private">private page</Link>
          {this.props.user ? <span>
            <span style={{ padding: '0 50px' }}></span>
            <span onClick={e => this.props.logout()} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
              Logout {this.props.user.name} ({this.props.user.role})
            </span>
          </span> : null}
        </div>
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.auth.user,
  }),
  {
    logout,
  }
)(NavPanel);
