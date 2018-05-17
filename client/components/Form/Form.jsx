import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { reduxForm, Field } from 'redux-form';

import Button from 'components/Button/Button';
import FormField from 'components/Form/FormField';

class Form extends Component {
  static propTypes = {
    className: PropTypes.string,
    inputs: PropTypes.array.isRequired,
    formName: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const { className, inputs, handleSubmit } = this.props;

    if (!inputs.length) {
      return null;
    }

    return (
      <form
        className={classnames('gh-form', className)}
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend className="visibly-hidden">Form Fields</legend>
          <div className="grid-x grid-margin-x">
            {inputs.map((field, i) =>
              <Field
                key={i}
                name={field.name}
                component={FormField}
                field={field}
                className="cell"
              />
            )}
          </div>
        </fieldset>

        <div className="gh-form-actions">
          <Button type="submit" modifier="primary">
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { form: props.formName };
};

export default compose(connect(mapStateToProps), reduxForm())(Form);
