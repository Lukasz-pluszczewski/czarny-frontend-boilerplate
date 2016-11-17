import React, { PropTypes, Component } from 'react';

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
