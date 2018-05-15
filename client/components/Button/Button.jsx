import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { buildClassName } from 'utils/util';
import { buttonProps } from 'utils/propTypeEnum';

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    modifier: PropTypes.oneOf(buttonProps.modifiers),
    reference: PropTypes.func,
    size: PropTypes.oneOf(buttonProps.sizes),
    type: PropTypes.oneOf(buttonProps.types)
  };

  static defaultProps = {
    disabled: false,
    fullWidth: false,
    type: 'button'
  };

  render() {
    const {
      children,
      className,
      disabled,
      fullWidth,
      modifier,
      reference,
      size,
      type,
      ...props
    } = this.props;
    const mainClass = 'bcp-btn';
    const modifierClass = buildClassName(
      buttonProps.modifiers,
      modifier,
      mainClass
    );
    const disabledClass = disabled ? 'bcp-btn--disabled' : false;
    const sizeClass = buildClassName(buttonProps.sizes, size, mainClass);

    return (
      <button
        className={classNames(
          mainClass,
          modifierClass,
          disabledClass,
          sizeClass,
          { 'bcp-btn--full-width': fullWidth },
          className
        )}
        ref={reference}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }
}

export default Button;
