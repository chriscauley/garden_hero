import React, { Component } from 'react';
import HomePage from 'containers/Home/Home';

class HomeView extends Component {
  render() {
    return <HomePage {...this.props} />;
  }
}

export default HomeView;
