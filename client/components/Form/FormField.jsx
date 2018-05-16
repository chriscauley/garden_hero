import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FormField extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    index: PropTypes.string
  };

  render() {
    const { index, label, name, type, required, error } = this.props.field;
    const id = index ? `gh-${name}-${index}` : `gh-${name}`;

    return (
      <div
        className={classnames('gh-form-field', { 'is-invalid': error })}
        key={index}
      >
        <label className="gh-form-field-label" htmlFor={id}>
          {label}
        </label>
        <input
          className="gh-form-field-input"
          id={id}
          name={name}
          type={type}
          required={required}
        />
        <span className="gh-form-field-error">
          {error ? error.message : 'This field is required.'}
        </span>
      </div>
    );
  }
}

export default FormField;
