import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import TopLayout from 'containers/TopLayout';

const text = ` ██████╗███████╗ █████╗ ██████╗ ███╗   ██╗██╗   ██╗
██╔════╝╚══███╔╝██╔══██╗██╔══██╗████╗  ██║╚██╗ ██╔╝
██║       ███╔╝ ███████║██████╔╝██╔██╗ ██║ ╚████╔╝
██║      ███╔╝  ██╔══██║██╔══██╗██║╚██╗██║  ╚██╔╝
╚██████╗███████╗██║  ██║██║  ██║██║ ╚████║   ██║
 ╚═════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   
                                                   
`;

export default class HomePage extends Component {
  render() {
    return (
      <TopLayout>
        <Header as="h1">Frontend boilerplate</Header>
        <pre>{text}</pre>
      </TopLayout>
    );
  }
}
