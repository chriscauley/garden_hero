import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Signup from 'containers/Auth/Signup';
import Login from 'containers/Auth/Login';
import Nav from 'components/Nav/Nav';

import { appPaths } from 'routes';

class SignupView extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired
  };

  render() {
    return (
      <Fragment>
        <Nav />
        <div className="container">
          {this.props.path === appPaths.signup
            ? <Signup {...this.props} />
            : <Login {...this.props} />}
        </div>
      </Fragment>
    );
  }
}

export default SignupView;
