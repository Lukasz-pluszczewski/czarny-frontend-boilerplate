import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SidebarButton from 'containers/Layout/SidebarButton';
import { sidebarLinks } from 'constants/propTypes/basic';

class Sidebar extends Component {
  static propTypes = {
    // sidebar
    header: PropTypes.node,
    links: sidebarLinks,

    // actions
    onClick: PropTypes.func,

    // settings
    onlyActiveOnIndex: PropTypes.bool,
  };

  render() {
    const sideBar = _.map(this.props.links, (link, index) => {
      if (_.isEmpty(link)) {
        return <div className="Sidebar__separator" key={index}/>;
      }
      return <SidebarButton
        key={link.to}
        to={link.to}
        icon={link.icon}
        text={link.text}
        onClick={this.props.onClick}
        onlyActiveOnIndex={link.onlyActiveOnIndex || this.props.onlyActiveOnIndex}
      />;
    });

    return (<div className="Sidebar__container">
      {this.props.header ? <div className="Sidebar__header">{this.props.header}</div> : null}
      <div className="Sidebar__links">
        {sideBar}
      </div>
    </div>);
  }
}

export default Sidebar;
