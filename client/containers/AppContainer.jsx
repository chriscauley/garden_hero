import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import routes from 'routes';

export class AppContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.actions = props.actions;
  }

  renderRoutes() {
    return (
      <Switch>
        {routes.map((route, index) => {
          const { exact, path } = route;
          const RenderComponent = route.component;

          return (
            <Route
              key={index}
              path={path}
              exact={exact}
              render={props => {
                return (
                  <RenderComponent
                    {...props}
                    component={route.component}
                    path={path}
                  />
                );
              }}
            />
          );
        })}
      </Switch>
    );
  }

  render() {
    return (
      <div className="gh-main-content min-content-height" id="main" role="main">
        {this.renderRoutes(this.context)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  application: state.application
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
