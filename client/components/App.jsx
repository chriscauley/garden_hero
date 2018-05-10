import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import AppContainer from 'containers/AppContainer';

console.warn('inside App.jsx');

class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <Route component={AppContainer} />;
  }
}

export default App;
