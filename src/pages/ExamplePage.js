import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import TopLayout from 'containers/TopLayout';


export default class ExamplePage extends Component {
  render() {
    return (
      <TopLayout>
        <Header as="h1">Example page</Header>
      </TopLayout>
    );
  }
}
