import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from 'modules/application';

export class Home extends Component {
  static propTypes = {
    actions: PropTypes.object
  };

  constructor(props) {
    super(props);

    // Bind actions
    this.actions = props.actions;
  }

  componentDidMount() {
    this.actions.loadData();
  }

  render() {
    return (
      <div className="gh-home">
        <h1>Homepage</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  application: state.application
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
