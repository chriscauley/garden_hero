import React from 'react';
import renderer from 'react-test-renderer';

import BodyCopy from './BodyCopy';

describe('<BodyCopy />', () => {
  it('renders correctly', () => {
    const component = renderer.create(<BodyCopy>Body copy text</BodyCopy>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts className prop', () => {
    const component = renderer.create(
      <BodyCopy className="gh-margin-top">Body copy text</BodyCopy>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts modifier prop', () => {
    const component = renderer.create(
      <BodyCopy modifier="bold">Body copy text</BodyCopy>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders small text', () => {
    const component = renderer.create(
      <BodyCopy size="s">Body copy text</BodyCopy>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
