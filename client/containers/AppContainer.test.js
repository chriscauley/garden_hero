import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import ConnectedAppContainer, { AppContainer } from './AppContainer';
import * as API_CONTENT from 'apis/content/app/account';

jest.mock('react-router-dom');
jest.mock('components/Modal/Modal', () => 'mock-modal');
jest.mock('components/Toast/Toast', () => 'mock-toast');
jest.mock('components/Sprite/Sprite', () => 'mock-sprite');

describe('<AppContainer />', () => {
  document.getElementById = jest.fn(() => ({
    scrollIntoView: jest.fn(),
    focus: jest.fn()
  }));
  window.resetPageView = jest.fn();
  window.localStorage = {
    setItem: jest.fn(),
    getItem: jest.fn()
  };
  const contract = {
    loaded: {
      initial: true
    },
    data: {
      accepted: [],
      termCodes: {}
    }
  };
  const history = {
    listen: jest.fn()
  };
  const mockStore = configureStore();
  const initialState = {
    application: {
      common: {
        loaded: {
          data: true
        },
        history,
        flowPageState: {
          loaded: false
        },
        modal: {
          show: false,
          title: '',
          component: null
        },
        toast: {
          show: false,
          message: null
        }
      },
      content: {
        loaded: {
          data: true
        },
        ...API_CONTENT
      },
      userContext: {
        acceptedContracts: []
      }
    },
    account: {
      contract: {
        loaded: {
          initial: true
        },
        data: {
          accepted: [],
          termCodes: {}
        }
      },
      users: {
        loaded: { data: true },
        data: {}
      }
    }
  };
  const store = mockStore(initialState);
  const actions = {
    authorizeUser: jest.fn(),
    loadData: jest.fn(),
    setHistory: jest.fn(),
    trackRoute: jest.fn(),
    logoutListener: jest.fn(),
    setFlowLogout: jest.fn(),
    getInitialTerms: jest.fn(),
    checkTermAccepted: jest.fn(),
    checkPortalTerms: jest.fn()
  };
  const props = {
    actions,
    common: {
      history,
      flowPageState: {
        loaded: false
      }
    },
    content: {
      loaded: {
        data: true
      }
    },
    location: {
      pathname: '/'
    },
    history,
    contract,
    users: {
      loaded: { data: true },
      data: {}
    }
  };

  it('renders correctly', () => {
    const component = renderer.create(<AppContainer {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders connected component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <ConnectedAppContainer {...props} />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('does not render routes when content is not loaded', () => {
    const component = renderer.create(
      <AppContainer {...props} content={{ loaded: false }} />
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('resets page view on update', () => {
    const component = shallow(<AppContainer {...props} />);
    const prevProps = {
      location: {
        pathname: '/'
      },
      content: {
        loaded: { data: false }
      }
    };
    const nextProps = {
      location: {
        pathname: '/dashboard'
      },
      content: {
        loaded: { data: true }
      }
    };

    expect(component.instance().props.location).toEqual({ pathname: '/' });
    component.instance().componentDidUpdate(prevProps);
    component.instance().componentDidUpdate(nextProps);
  });

  it('handles renderRoute method', () => {
    const component = shallow(<AppContainer {...props} />);

    expect(component.instance().renderRoutes).toBeDefined();

    const RootRoute = component.find('Route').first();

    expect(RootRoute.props().path).toEqual('/');
    expect(RootRoute.props().render).toBeDefined();
  });

  it('runs historyUnlisten method on unmount', () => {
    const wrapper = mount(<AppContainer {...props} />);
    const component = wrapper.instance();

    component.historyUnlisten = jest.fn();
    wrapper.unmount();
    expect(component.historyUnlisten).toHaveBeenCalled();
  });
});
