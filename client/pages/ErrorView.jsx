import React, { Component } from 'react';
import Error from 'containers/Error/Error';

class ErrorView extends Component {
  render() {
    return <Error {...this.props} />;
  }
}

export default ErrorView;
