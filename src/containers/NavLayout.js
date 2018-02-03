import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getT from 'mi18n-redux';
import _ from 'lodash';
import { trans } from 'constants/propTypes/basic';

import Layout from 'containers/Layout/Layout';

import routes from 'constants/routes';

import 'styles/containers/NavLayout.scss';

class NavLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    trans: trans.isRequired,
  };

  getLinks = routes => routes.map(route => {
    if (_.isEmpty(route)) {
      return route;
    }
    if (!route.icon && !route.name) {
      return null;
    }

    return {
      to: route.path,
      icon: route.icon,
      onlyActiveOnIndex: route.onlyActiveOnIndex,
      text: this.props.trans.n('layout.nav').t(route.name),
    };
  });

  render() {
    const links = this.getLinks(routes);

    const topBarLeft = <div className="NavLayout__brainhubLogoContainer">
      <div className="NavLayout__title">{this.props.trans.t('layout.title')}</div>
    </div>;

    // const topBarRight = <div className="NavLayout__status">
    //   <Icon
    //     className={classnames('NavLayout__statusIcon', { 'NavLayout__statusIcon--disconnected': !this.props.status })}
    //     name={this.props.status ? 'check-circle-o' : 'times-circle-o'}
    //   />
    //   <span className="NavLayout__statusText">{this.props.status ? 'connected' : 'disconnected'}</span>
    // </div>;

    const topBarRight = null;

    return <Layout
      topBarLeft={topBarLeft}
      topBarRight={topBarRight}
      sidebarHeader={this.props.trans.t('layout.navTitle')}
      links={links}
    >
      {this.props.children}
    </Layout>;
  }
}

export default connect(
  state => ({
    trans: getT(state.i18n),
  })
)(NavLayout);
