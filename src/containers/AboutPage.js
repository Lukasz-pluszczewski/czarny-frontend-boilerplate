import React, { PropTypes, Component } from 'react';
import { IndexLink } from 'react-router';

class AboutPage extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div>
        <IndexLink to="/">back</IndexLink>
        <h1>About page</h1>
      </div>
    );
  }
}

export default AboutPage;
