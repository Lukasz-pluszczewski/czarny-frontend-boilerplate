import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import 'styles/containers/Section.scss';

class Section extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    return <div className={classnames('Section', this.props.className)}>
      <div className="Section__title">{this.props.title}</div>
      <div className="Section__description">{this.props.description}</div>
      <div className="Section__content">
        {this.props.children}
      </div>
    </div>;
  }
}

export default Section;
