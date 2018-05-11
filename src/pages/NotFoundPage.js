import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import TopLayout from 'containers/TopLayout';

export default class NotFoundPage extends Component {
  render() {
    return (
      <TopLayout>
        <Header as="h1">Page not found</Header>
        <RouterLink to="/"><Icon name="long arrow left"/> Back to home page</RouterLink>
      </TopLayout>
    );
  }
}
