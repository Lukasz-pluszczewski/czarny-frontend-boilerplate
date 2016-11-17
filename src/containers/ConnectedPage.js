import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { exampleAction } from '../actions/exampleActions';

class ConnectedPage extends Component {
  static propTypes = {
    something: PropTypes.string,
    action: PropTypes.func,
  };

  render() {
    return (
      <div>this is connected</div>
    );
  }
}

export default connect(
  state => ({ something: state.something }),
  dispatch => ({ action: arg => dispatch(exampleAction(arg)) })
)(ConnectedPage);
