import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from 'containers/Layout/Layout';

class EmptyLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return <Layout>
      {this.props.children}
    </Layout>;
  }
}

export default EmptyLayout;
