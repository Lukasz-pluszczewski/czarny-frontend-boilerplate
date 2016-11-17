import React, { PropTypes, Component } from 'react';
import { Icon } from 'react-fa';

class HomePage extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div>
        <h1>Homepage</h1>
      </div>
    );
  }
}

export default HomePage;
