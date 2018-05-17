import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FormField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired, // comes from Redux-form
    field: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    index: PropTypes.string,
    className: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool
  };

  render() {
    const { input, field, index, className, meta, readOnly } = this.props;
    const { label, name, type, error, required, maxlength } = field;
    const errorClass = meta.submitFailed && meta.error ? 'is-invalid' : false;

    return (
      <div
        className={classnames('gh-form-field', className, errorClass)}
        key={index}
      >
        <label className="gh-form-field-label" htmlFor={name}>
          {label}
        </label>
        <input
          className="gh-form-field-input"
          id={name}
          type={type && type !== 'select' ? type : 'text'}
          required={required}
          maxLength={maxlength}
          readOnly={readOnly}
          {...input}
        />
        {error
          ? <span className="gh-form-field-error">
              {error.message}
            </span>
          : null}
      </div>
    );
  }
}

export default FormField;
