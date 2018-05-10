import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import routes from 'routes';

// import { actions as commonActions } from 'modules/application/common';
// import { actions as contentActions } from 'modules/application/content';
// import { actions as contractActions } from 'modules/account/contract';
// import { actions } from 'modules/application';

// import { resetPageView } from 'utils/util';

export class AppContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    contract: PropTypes.object,
    common: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    termCodes: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    users: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.actions = props.actions;
  }

  componentWillMount() {
    const { history } = this.props;

    this.actions.loadData();
    this.actions.setHistory(history);
    this.actions.logoutListener();
    this.actions.getInitialTerms();
  }

  renderRoutes() {
    return (
      <Switch>
        {routes.map((route, index) => {
          const { exact, path, layout, sidebar, theme, closeBtn } = route;
          const Layout = layout;
          const contentKey = route.contentKey;

          return (
            <Route
              key={index}
              path={path}
              exact={exact}
              render={props => {
                return (
                  <Layout
                    component={route.component}
                    {...props}
                    contentKey={contentKey}
                    path={path}
                    sidebar={sidebar ? sidebar : null}
                    theme={theme ? theme : null}
                    closeBtn={closeBtn ? closeBtn : null}
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
      <div
        className="bcp-main-content min-content-height"
        id="main"
        role="main"
      >
        Hello
      </div>
    );
  }
}

const mapStateToProps = state => ({
  common: state.application.common,
  content: state.application.content,
  contract: state.account.contract.data,
  termCodes: state.account.contract.data.termCodes,
  users: state.account.users
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
