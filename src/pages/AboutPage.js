import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AboutPage extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div>
        <h1>About page</h1>
      </div>
    );
  }
}

export default AboutPage;
