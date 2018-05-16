import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'components/Button/Button';
import FormField from 'components/Form/FormField';

class Form extends Component {
  static propTypes = {
    className: PropTypes.string,
    fields: PropTypes.array.isRequired,
    method: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired
  };
  static defaultProps = {
    method: 'post'
  };

  render() {
    const { className, fields, method, handleSubmit } = this.props;

    if (!fields.length) {
      return null;
    }

    return (
      <form
        className={classnames('gh-form', className)}
        method={method}
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend className="visibly-hidden">Form Fields</legend>
          {fields.map((field, i) => <FormField key={i} field={field} />)}
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

export default Form;
