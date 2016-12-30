import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';

class NavPanel extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div>
        <div>
          <IndexLink to="/">Home</IndexLink>
          <span style={ { padding: '0 5px' } }>|</span>
          <Link to="about">about</Link>
          <span style={ { padding: '0 5px' } }>|</span>
          <Link to="private">private page</Link>
        </div>
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default NavPanel;
