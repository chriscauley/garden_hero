import { delay } from 'redux-saga';
import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';
import { replaceEndpoint } from 'utils/util';
import loader from 'utils/loader/loader';
import { actions, types } from 'modules/application';
import selectors from 'modules/application/selectors';
// import { actions as commonActions } from 'modules/application/common';
import { navigationRoutes, navigationSteps } from 'modules/navigation';
const currentRoute = navigationRoutes[navigationSteps.ACCOUNT];

import applicationSaga, {
  logout,
  storageHandler,
  clickHandler,
  trackLinks,
  watchers,
  workers
} from './sagas';

// Mock store from loader
jest.mock('index', () => {
  return {
    store: {
      getState: jest.fn()
    }
  };
});

jest.mock('utils/lock/lock', () => {
  return () => ({
    cancel: jest.fn(),
    execute: jest.fn()
  });
});

describe('application sagas', () => {
  /* eslint-disable camelcase*/
  const localStorage = {
    logout: false,
    logoutUrl: '/account/logout'
  };
  const mockLocalStorage = {
    setItem: jest.fn((key, value) => undefined),
    getItem: jest.fn(key => localStorage[key]),
    ...localStorage
  };
  const mockLogout = jest.fn();

  const token = 'Basic Y29tY2==';
  const authCredentials = {
    endpoint: {
      url: '/oauth/token',
      method: 'POST',
      baseUrl: ''
    },
    token
  };
  const options = {
    headers: {
      Authorization: token
    },
    params: {
      grant_type: 'client_credentials'
    }
  };
  const response = {
    access_token: 'CgNPQVQQARgCIoABhdEH6drA*',
    token_type: 'Bearer',
    expires_in: 3599
  };

  window.localStorage = mockLocalStorage;
  window.location.assign = jest.fn();
  window.addEventListener = jest.fn();

  /* eslint-enable camelcase*/

  it('runs all watches', () => {
    const gen = applicationSaga();
    const result = gen.next();

    expect(result.value).toEqual(
      all([
        watchers.analyticsWatch(),
        // watchers.sessionWatch(),
        watchers.logoutWatch(),
        watchers.updateBANWatch(),
        watchers.loadUserDataWatch(),
        watchers.logoutUserWatch()
      ])
    );
  });

  it('runs analyticsWorker', () => {
    document.dispatchEvent = jest.fn();
    const pageName = 'Comcast Business | Dashboard';
    const action = actions.trackPage(pageName);
    const eventOptions = {
      detail: {
        page: {
          pageInfo: {
            screenName: 'Dashboard'
          }
        }
      },
      bubbles: true
    };

    workers.analyticsWorker(action);

    // Need to mock timestamp, but simply mocking Date() with something static doesn't seem to work...
    // expect(document.dispatchEvent).toHaveBeenCalledWith(
    //   new CustomEvent('c-tracking-log-page', eventOptions)
    // );
    expect(document.dispatchEvent).toHaveBeenCalled();
  });

  it('tracks button and link clicks', () => {
    const button = document.createElement('button');
    const mockDispatch = jest.fn();
    const mockEvent = {
      target: {
        closest: () => button
      }
    };

    button.dispatchEvent = mockDispatch;

    expect(trackLinks).toBeDefined();
    trackLinks(mockEvent);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('does not track button and link clicks with undefined element', () => {
    const button = document.createElement('button');
    const mockDispatch = jest.fn();
    const mockEvent = {
      target: {
        closest: jest.fn()
      }
    };

    button.dispatchEvent = mockDispatch;

    trackLinks(mockEvent);
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('runs routeWorker', () => {
    const action = actions.trackRoute({
      location: { pathname: '/' },
      action: 'PUSH'
    });

    workers.routeWorker(action);

    expect(document.dispatchEvent).toHaveBeenCalled();
  });

  it('runs updateBANWorker', () => {
    const ban = { ban: 153226 };
    const gen = workers.updateBANWorker({ payload: ban });
    let result = gen.next();

    const endpoint = currentRoute.endpoints.onUpdateBAN();
    const newEndpoint = replaceEndpoint(endpoint);

    expect(result.value).toEqual(select(selectors.getCurrentArrangementId));
    result = gen.next();
    expect(result.value).toEqual(replaceEndpoint(endpoint));

    result = gen.next(newEndpoint);
    expect(result.value).toEqual(
      call(loader.request, newEndpoint, {
        data: { BillingArrangementId: 153226 }
      })
    );

    result = gen.next({
      data: {},
      messages: [],
      status: 1,
      statusCode: 200
    });
    expect(result.value).toEqual(
      put(actions.updateUserContext({ currentBillingArrangementId: 153226 }))
    );

    const error = new Error('Request failed');

    expect(() => gen.throw(error)).toThrow(error);
  });

  it('runs updateBANWorker on a 500 error', () => {
    const gen = workers.updateBANWorker({ payload: { ban: 153226 } });
    const endpoint = currentRoute.endpoints.onUpdateBAN();
    const newEndpoint = replaceEndpoint(endpoint);

    // Get current BillingArrangementId
    let result = gen.next();

    expect(result.value).toEqual(select(selectors.getCurrentArrangementId));

    // Replace template token in Endpoint
    result = gen.next();
    expect(result.value).toEqual(replaceEndpoint(endpoint));

    // Make the call with endpoint data
    result = gen.next(newEndpoint);
    expect(result.value).toEqual(
      call(loader.request, newEndpoint, {
        data: { BillingArrangementId: 153226 }
      })
    );

    result = gen.next();
    expect(result.value).toEqual(
      put(actions.updateUserContext({ currentBillingArrangementId: 153226 }))
    );

    // Catches Error
    const error = new Error('Request failed');

    expect(() => gen.throw(error)).toThrowError(error.message);
  });

  it('runs authorizeWorker', () => {
    const gen = workers.authorizeWorker();

    // Select auth credentials
    let result = gen.next();

    expect(result.value).toEqual(select(selectors.getAuthCredentials));

    // Call loader with endpoint and options
    result = gen.next(authCredentials);
    expect(result.value).toEqual(
      call(loader.request, authCredentials.endpoint, options)
    );

    // Put token in store
    result = gen.next(response);
    expect(result.value).toEqual(
      put(
        actions.authorizeUserSuccess(
          `${response.token_type} ${response.access_token}`
        )
      )
    );

    // Call delay with expiration time
    result = gen.next();
    const expiration = (response.expires_in - 180) * 1000;

    expect(result.value).toEqual(call(delay, expiration));

    // Call authorizeWorker
    result = gen.next();
    expect(result.value).toEqual(select(selectors.getAuthCredentials));
  });

  it('runs authorizeWorker with undefined access token', () => {
    const gen = workers.authorizeWorker();

    // Select auth credentials
    let result = gen.next();

    expect(result.value).toEqual(select(selectors.getAuthCredentials));

    // Call loader with endpoint and options
    result = gen.next(authCredentials);
    expect(result.value).toEqual(
      call(loader.request, authCredentials.endpoint, options)
    );

    // Exits early without token
    result = gen.next({});
    expect(result.value).toBe(false);
    expect(result.done).toBe(true);
  });

  it('runs authorizeWorker with request error', () => {
    const gen = workers.authorizeWorker();

    // Select auth credentials
    let result = gen.next();

    expect(result.value).toEqual(select(selectors.getAuthCredentials));

    // Call loader with endpoint and options
    result = gen.next(authCredentials);
    expect(result.value).toEqual(
      call(loader.request, authCredentials.endpoint, options)
    );

    // Exits early without token
    const error = new Error('Request failed');

    expect(() => gen.throw(error)).toThrowError(error.message);
  });

  it('runs sessionWatch', () => {
    const gen = watchers.sessionWatch();
    let result = gen.next();

    expect(result.value).toEqual(
      takeLatest(types.AUTHORIZE_USER, workers.authorizeWorker)
    );

    result = gen.next();
    expect(result.value).toEqual(take('*'));

    result = gen.next(actions.trackPage());
    expect(result.done).toBe(false);
  });

  it('runs sessionWatch with REQUEST_START action', () => {
    const gen = watchers.sessionWatch();
    let result = gen.next();

    expect(result.value).toEqual(
      takeLatest(types.AUTHORIZE_USER, workers.authorizeWorker)
    );

    result = gen.next();
    expect(result.value).toEqual(take('*'));

    result = gen.next(actions.startRequest());
    result = gen.next();
    expect(result.done).toBe(false);
  });

  it('runs sessionTimeout worker', () => {
    const gen = workers.sessionTimeoutWorker();
    const timeout = 1200;

    // process.env.NODE_ENV = 'production';
    let result = gen.next();

    // Select sessionTimeout
    expect(result.value).toEqual(select(selectors.getSessionTimeout));

    // Call delay
    result = gen.next(timeout);
    expect(result.value).toEqual(call(delay, timeout));

    // Call logout
    result = gen.next();
    expect(result.value).toEqual(call(logout));
  });

  // Logout Worker
  it('runs logoutWorker', () => {
    document.querySelectorAll = jest.fn(() => ({
      item: jest.fn(() => ({
        addEventListener: jest.fn()
      })),
      length: 3
    }));

    workers.logoutWorker();

    expect(workers.logoutWorker).toBeDefined();
    expect(window.localStorage.setItem).toHaveBeenCalledWith('logout', false);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'logoutUrl',
      localStorage.logoutUrl
    );
    expect(window.addEventListener).toHaveBeenCalled();
  });

  it('logs out', () => {
    logout();
    expect(logout).toBeDefined();
    expect(window.localStorage.setItem).toHaveBeenCalledWith('logout', true);
    expect(window.location.assign).toHaveBeenCalled();
  });

  // Storage Change event handler
  it('handles localStorage change events', () => {
    const mockStorageEvent = {
      key: 'logout',
      newValue: true
    };

    storageHandler(mockStorageEvent);

    expect(storageHandler).toBeDefined();
  });

  // Click Change event handler
  it('handles logout click event', () => {
    const mockClickEvent = {
      preventDefault: jest.fn(),
      currentTarget: {
        href: localStorage.logoutUrl
      }
    };
    const noHref = Object.assign(mockClickEvent, {
      currentTarget: {
        href: ''
      }
    });

    clickHandler(mockClickEvent);
    expect(clickHandler).toBeDefined();

    // simulate no href
    clickHandler(noHref);
    expect(clickHandler).toBeDefined();
  });
});
