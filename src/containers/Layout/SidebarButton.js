import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { NavLink as RouterLink } from 'react-router-dom';
import Icon from 'components/Icon';

class SidebarButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    to: PropTypes.string,
    children: PropTypes.element,
    text: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    onlyActiveOnIndex: PropTypes.bool,
  };

  render() {
    return (<RouterLink
      className="SidebarButton__container"
      to={this.props.to}
      activeClassName="SidebarButton--active"
      exact={this.props.onlyActiveOnIndex}
      onClick={this.props.onClick}
    >
      <div className="SidebarButton__icon">
        {_.isString(this.props.icon) ? <Icon name={this.props.icon} /> : this.props.icon}
      </div>
      <div className="SidebarButton__text">
        {this.props.children || this.props.text}
      </div>
    </RouterLink>);
  }
}

export default SidebarButton;
