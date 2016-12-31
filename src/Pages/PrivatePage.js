import React, { PropTypes, Component } from 'react';

class AboutPage extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div>
        <h1>This is private page</h1>
        <p>Not everyone has access!</p>
      </div>
    );
  }
}

export default AboutPage;
