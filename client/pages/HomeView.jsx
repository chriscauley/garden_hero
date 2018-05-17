import React, { Component, Fragment } from 'react';
import HomePage from 'containers/Home/Home';
import Nav from 'components/Nav/Nav';

class HomeView extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <div className="container">
          <HomePage {...this.props} />
        </div>
      </Fragment>
    );
  }
}

export default HomeView;
