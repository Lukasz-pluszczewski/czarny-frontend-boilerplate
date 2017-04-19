import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { exampleAction } from '../actions/exampleActions';

// Example of connected react component
class HomePage extends Component {
  static propTypes = {
    list: PropTypes.array, // props passed with connect() function are added to HomePage component
    exampleAction: PropTypes.func,
  };
  state = {
    input: '',
  };

  handleChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.exampleAction(this.state.input);
  }

  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input value={this.state.input} onChange={e => this.handleChange(e)} placeholder="Enter name" />
          <button type="submit">add</button>
        </form>
        <ul>
          {this.props.list.map((element, key) => <li key={key}>{element}</li>)}
        </ul>
      </div>
    );
  }
}

// we export connected HomePage component
export default connect(
  // first argument is a function that gets state and returns an object with props
  state => ({
    list: state.example.list,
  }),
  // second argument is an object with actionCreators that will be mapped to dispatching functions added to props
  {
    exampleAction,
  }
)(HomePage);
