import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'components/Icon';
import { sidebarLinks } from 'constants/propTypes/basic';
import Sidebar from 'containers/Layout/Sidebar';

import 'styles/containers/Layout.scss';

class Layout extends Component {
  static propTypes = {
    topBarLeft: PropTypes.node,
    topBarCenter: PropTypes.node,
    topBarRight: PropTypes.node,
    hideTopBar: PropTypes.bool,
    links: sidebarLinks,
    sidebarHeader: PropTypes.node,
    children: PropTypes.node,
    onlyActiveOnIndex: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      openedDrawer: false,
    };
  }

  clickHandler() {
    this.toggleDrawer(false)();
  }

  toggleDrawer(open = null) {
    return () => this.setState({ openedDrawer: open === null ? !this.state.openedDrawer : open });
  }

  render() {
    const drawerToggle = (
      <div className="Layout__drawerToggle" onClick={this.toggleDrawer()}>
        <Icon name="bars" size="2x" />
      </div>
    );

    const showSideBar = this.props.links && this.props.links.length;

    const topBar = <div className="Layout__topbar">
      <div className="Layout__topbarLeft">
        {showSideBar ? drawerToggle : null}
        {this.props.topBarLeft}
      </div>
      <div className="Layout__topbarCenter">
        {this.props.topBarCenter}
      </div>
      <div className="Layout_topbarRight">
        {this.props.topBarRight}
      </div>
      <div className="Layout__overlay" onClick={this.toggleDrawer(false)}/>
    </div>;

    return <div className={classnames('Layout__container', { visible: this.state.openedDrawer })}>
      {this.props.hideTopBar ? null : topBar}
      <div className="Layout__bottom">
        {
          showSideBar
            ? (
              <Sidebar
                header={this.props.sidebarHeader}
                links={this.props.links}
                onClick={this.clickHandler}
                onlyActiveOnIndex={this.props.onlyActiveOnIndex}
              />
            )
            : null
        }
        <div className={classnames('Layout__content', { 'Layout__content--noSidebar': !showSideBar })}>
          {
            this.props.hideTopBar && showSideBar
              ? <div className="Layout_contentDrawerToggle">{drawerToggle}</div>
              : null
          }
          {this.props.children}
          <div className="Layout__overlay" onClick={this.toggleDrawer(false)}/>
        </div>
      </div>
    </div>;
  }
}

export default Layout;
