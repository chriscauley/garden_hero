import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Home from './Home';
import * as API_CONTENT from 'apis/content/app/account';
import * as APP_API from 'apis/application';

jest.mock('react-router-dom');
jest.mock('./BillingPanel', () => {
  return require('utils/util').mockComponent(() => 'BillingPanel');
});
jest.mock('components/BANSelector/BANSelector', () => {
  return require('utils/util').mockComponent('BANSelector');
});

describe('<Home />', () => {
  const mockStore = configureStore();
  const content = Object.assign(
    {},
    API_CONTENT.pages.accountHome,
    API_CONTENT.global.actions,
    API_CONTENT.global.labels,
    API_CONTENT.common.actions,
    API_CONTENT.common.labels
  );
  const actions = {
    loadData: jest.fn(),
    redirectToUrl: jest.fn()
  };
  const userContext = APP_API.application.userContext;
  const initialState = {
    application: {
      content: API_CONTENT,
      userContext: {
        autoPayEnabled: true,
        ...userContext
      },
      common: {
        error: 'Something went wrong'
      }
    }
  };

  const store = mockStore(initialState);
  const props = {
    actions,
    content,
    loaded: {
      data: false
    },
    userContext: {
      autoPayEnabled: true
    },
    error: 'Something went wrong'
  };

  it('renders connected component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Home {...props} />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
