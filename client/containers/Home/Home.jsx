import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const actions = {};

export class Home extends Component {
  static propTypes = {
    actions: PropTypes.object
  };

  constructor(props) {
    super(props);

    // Bind actions
    this.actions = props.actions;
  }

  render() {
    return <div className="gh-home">Home</div>;
  }
}

const mapStateToProps = state => ({
  application: state.application
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
