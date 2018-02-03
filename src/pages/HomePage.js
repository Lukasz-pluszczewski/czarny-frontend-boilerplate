import React, { Component } from 'react';

import NavLayout from 'containers/NavLayout';

const text = `██████╗███████╗ █████╗ ██████╗ ███╗   ██╗██╗   ██╗
██╔════╝╚══███╔╝██╔══██╗██╔══██╗████╗  ██║╚██╗ ██╔╝
██║       ███╔╝ ███████║██████╔╝██╔██╗ ██║ ╚████╔╝
██║      ███╔╝  ██╔══██║██╔══██╗██║╚██╗██║  ╚██╔╝
╚██████╗███████╗██║  ██║██║  ██║██║ ╚████║   ██║
╚═════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   
                                                   
`;

export default class HomePage extends Component {
  render() {
    return (
      <NavLayout>
        <pre>{text}</pre>
      </NavLayout>
    );
  }
}
