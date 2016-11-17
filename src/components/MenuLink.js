import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';

class MenuLink extends Component {
  static propTypes = {
    children: PropTypes.element,
    index: PropTypes.bool,
    to: PropTypes.string,
  };

  render() {
    return (
      <div className="menu-link">
        {this.props.index
          ? <IndexLink to={this.props.to}>{this.props.children}</IndexLink>
          : <Link to={this.props.to}>{this.props.children}</Link>}
      </div>
    );
  }
}

export default MenuLink;
