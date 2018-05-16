import React from 'react';
import renderer from 'react-test-renderer';

import Heading from './Heading';

describe('<Heading />', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Heading>Welcome</Heading>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders child elements', () => {
    const component = renderer.create(
      <Heading>
        Welcome <i />
      </Heading>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('accepts className prop', () => {
    const component = renderer.create(
      <Heading className="gh-margin-top">Welcome</Heading>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('accepts modifier prop', () => {
    const component = renderer.create(
      <Heading modifier="inline">Welcome</Heading>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('accepts size prop', () => {
    const component = renderer.create(<Heading size="l">Welcome</Heading>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('accepts status prop', () => {
    const component = renderer.create(
      <Heading status="success">Welcome</Heading>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders section heading', () => {
    const component = renderer.create(
      <Heading size="l" section>
        Welcome
      </Heading>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
