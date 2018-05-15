import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { buildClassName } from 'utils/util';
import { bodyCopyProps } from 'utils/propTypeEnum';

class BodyCopy extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    element: PropTypes.string,
    modifier: PropTypes.oneOf(bodyCopyProps.modifiers),
    size: PropTypes.oneOf(bodyCopyProps.sizes)
  };

  static defaultProps = {
    element: 'span'
  };

  render() {
    const {
      children,
      className,
      element: Element,
      modifier,
      size,
      ...props
    } = this.props;
    const mainClass = 'bcp-body-copy';
    const modifierClass = buildClassName(
      bodyCopyProps.modifiers,
      modifier,
      mainClass
    );
    const sizeClass = buildClassName(bodyCopyProps.sizes, size, mainClass);

    return (
      <Element
        className={classNames(mainClass, modifierClass, sizeClass, className)}
        {...props}
      >
        {children}
      </Element>
    );
  }
}

export default BodyCopy;
