import React from 'react';
import renderer from 'react-test-renderer';

import Button from './Button';

describe('<Button />', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <Button>Click me</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts "xl" size prop', () => {
    const component = renderer.create(
      <Button size="xl">Click me</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts "l" size prop', () => {
    const component = renderer.create(
      <Button size="l">Click me</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts "s" size prop', () => {
    const component = renderer.create(
      <Button size="s">Click me</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('accepts "xs" size prop', () => {
    const component = renderer.create(
      <Button size="xs">Click me</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts "primary" modifier prop', () => {
    const component = renderer.create(
      <Button modifier="primary">Click me</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts "secondary" modifier prop', () => {
    const component = renderer.create(
      <Button modifier="secondary">Click me</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts "anchor" modifier prop', () => {
    const component = renderer.create(
      <Button modifier="anchor">Click me</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts "anchor-block" modifier prop', () => {
    const component = renderer.create(
      <Button modifier="anchor-block">Click me</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts "disabled" prop', () => {
    const component = renderer.create(
      <Button modifier="primary" disabled>Click me</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});