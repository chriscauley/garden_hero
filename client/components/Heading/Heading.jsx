import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { buildClassName } from 'utils/util';
import { headingProps, statusProps } from 'utils/propTypeEnum';

class Heading extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    element: PropTypes.string,
    modifier: PropTypes.oneOf(headingProps.modifiers),
    status: PropTypes.oneOf(statusProps.types),
    section: PropTypes.bool,
    size: PropTypes.oneOf(headingProps.sizes)
  };

  static defaultProps = {
    element: 'span',
    size: 'l',
    section: false
  };

  render() {
    const {
      children,
      className,
      element: Element,
      modifier,
      size,
      status,
      section,
      ...props
    } = this.props;
    const mainClass = 'bcp-heading';
    const modifierClass = buildClassName(
      headingProps.modifiers,
      modifier,
      mainClass
    );
    const sizeClass = buildClassName(headingProps.sizes, size, mainClass);
    const statusClass = buildClassName(statusProps.types, status, mainClass);
    const sectionClass = section
      ? buildClassName(['section'], 'section', mainClass)
      : null;

    return (
      <Element
        className={classNames(
          mainClass,
          modifierClass,
          sizeClass,
          statusClass,
          sectionClass,
          className
        )}
        {...props}
      >
        {children}
        {section ? <span className="divider" /> : null}
      </Element>
    );
  }
}

export default Heading;
