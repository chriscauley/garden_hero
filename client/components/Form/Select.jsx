import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Select extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    error: PropTypes.string,
    input: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
    inputProps: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object.isRequired,
    noError: PropTypes.bool,
    noLabel: PropTypes.bool
  };

  static defaultProps = {
    noError: false,
    noLabel: false
  };

  renderSelect() {
    const { className, children, input, inputProps } = this.props;
    const mainClass = 'gh-select';

    return (
      <div className={classnames(mainClass, className)}>
        <select
          className="gh-select-element"
          id={input.name}
          {...input}
          {...inputProps}
        >
          {children}
        </select>
      </div>
    );
  }

  render() {
    const {
      className,
      error,
      field,
      input,
      meta,
      noError,
      noLabel
    } = this.props;
    const { label } = field;
    const errorClass = meta.submitFailed && meta.error ? 'is-invalid' : false;

    return noLabel
      ? this.renderSelect()
      : <div className={classnames('gh-form-field', className, errorClass)}>
          <label className="gh-form-field-label" htmlFor={input.name}>
            {label}
          </label>
          {this.renderSelect()}
          {!noError
            ? <span className="gh-form-field-message" role="alert">
                {error}
              </span>
            : null}
        </div>;
  }
}

export default Select;
