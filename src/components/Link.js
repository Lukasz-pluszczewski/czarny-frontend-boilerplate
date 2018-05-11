import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routeId } from 'constants/propTypes/link';
import _ from 'lodash';
import { connect } from 'react-redux';

import routes from 'constants/routes';
import { Link as RouterLink } from 'react-router-dom';

class Link extends Component {
  static propTypes = {
    id: routeId,
    to: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
  };


  render() {
    const route = _.find(routes, { id: this.props.id });
    const to = route ? route.path : this.props.to;

    return (
      <RouterLink className={this.props.className} to={to}>{this.props.children}</RouterLink>
    );
  }
}

export default connect(
  state => ({}),
  {}
)(Link);
