import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Form from 'components/Form/Form';

import { actions } from 'modules/application';
import { actions as memberActions } from 'modules/members';

export class Home extends Component {
  static propTypes = {
    actions: PropTypes.object,
    fields: PropTypes.array
  };

  constructor(props) {
    super(props);

    // Bind actions
    this.actions = props.actions;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.actions.getForm('registration');
  }

  handleSubmit(values) {
    console.warn('values:', values);
  }

  get renderForm() {
    const { fields } = this.props;

    if (!fields.length) {
      return null;
    }
    return (
      <Form
        inputs={fields}
        onSubmit={this.handleSubmit}
        formName="registration"
      />
    );
  }

  render() {
    return (
      <div className="gh-home">
        {this.renderForm}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formName: state.application.form.formName,
  fields: state.application.form.fields
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, actions, memberActions),
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
