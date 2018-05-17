import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Heading from 'components/Heading/Heading';

class Nav extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
  };

  render() {
    const { children, className, ...props } = this.props;
    const mainClass = 'gh-main-nav';

    return (
      <div className={classNames(mainClass, className)} {...props}>
        <div className="container">
          <Heading className="gh-logo" element="h3" size="l">
            Garden Hero
          </Heading>
          {children}
        </div>
      </div>
    );
  }
}

export default Nav;
