import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FormField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired, // comes from Redux-form
    field: PropTypes.object.isRequired,
    index: PropTypes.string,
    className: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool
  };

  render() {
    const { input, field, index, className, readOnly } = this.props;
    const { label, name, type, error, required } = field;
    const id = index ? `gh-${name}-${index}` : `gh-${name}`;

    return (
      <div
        className={classnames('gh-form-field', className, {
          'is-invalid': error
        })}
        key={index}
      >
        <label className="gh-form-field-label" htmlFor={id}>
          {label}
        </label>
        <input
          className="gh-form-field-input"
          id={name}
          type={type}
          required={required}
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
