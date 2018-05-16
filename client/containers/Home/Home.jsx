import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Nav from 'components/Nav/Nav';
import { actions } from 'modules/application';
import { actions as memberActions } from 'modules/members';

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
    this.actions.getForm('registration');
  }

  render() {
    return (
      <div className="gh-home">
        <Nav />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  application: state.application
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, actions, memberActions),
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
