import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { exampleAction } from '../actions/exampleActions';

// Example of connected react component
class HomePage extends Component {
  static propTypes = {
    list: PropTypes.array, // props passed with connect() function are added to HomePage component
    add: PropTypes.func,
  };
  state = {
    input: '',
  };

  handleChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  handleSubmit() {
    this.props.add(this.state.input);
  }

  render() {
    return (
      <div>
        <div>
          <Link to="about">about</Link>
        </div>
        <h1>Homepage</h1>
        <input value={this.state.input} onChange={e => this.handleChange(e)} placeholder="Enter name" />
        <button onClick={e => this.handleSubmit()}>add</button>
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
  // second argument is a function that gets store's dispatch and returns object with props (most likely with functions)
  dispatch => ({
    add: name => dispatch(exampleAction(name)),
  })
)(HomePage);
