import { delay } from 'redux-saga';
import { all, call, put, select } from 'redux-saga/effects';

import { actions, types } from 'modules/application/common';
import selectors from 'modules/application/common/selectors';
import appSelectors from 'modules/application/selectors';
import loader from 'utils/loader/loader';

import commonSaga, { watchers, workers } from './sagas';

// Mock store from loader
jest.mock('index', () => {
  return {
    store: {
      getState: jest.fn()
    }
  };
});

const mockHistory = {
  goBack: jest.fn(),
  push: jest.fn(url => url)
};

// Overriding Jest's implementation of window.location
Object.defineProperty(window.location, 'assign', {
  value: jest.fn(),
  writable: true
});

describe('common sagas', () => {
  it('runs all watches', () => {
    const gen = commonSaga();
    const result = gen.next();

    expect(result.value).toEqual(
      all([
        watchers.redirectWatch(),
        watchers.toastWatch(),
        watchers.flowCancelWatch(),
        watchers.modalWatch(),
        watchers.logErrorWatch()
      ])
    );
  });

  it('runs toastWorker', () => {
    const gen = workers.toastWorker();

    // Delays 3 seconds
    let result = gen.next();

    expect(result.value).toEqual(call(delay, 3000));

    // Dispatches hideToast action
    result = gen.next();
    expect(result.value).toEqual(put(actions.hideToast()));

    // Delays 0.5 seconds
    result = gen.next();
    expect(result.value).toEqual(call(delay, 500));

    // Dispatches clearToast action
    result = gen.next();
    expect(result.value).toEqual(put(actions.clearToast()));
  });

  it('runs flowCancelWorker', () => {
    const gen = workers.flowCancelWorker();
    const result = gen.next();

    // Selects history state
    expect(result.value).toEqual(select(selectors.getHistory));
  });

  it('runs flowCancelWorker when landing has not loaded', () => {
    const gen = workers.flowCancelWorker();
    const result = gen.next();

    // Selects history state
    expect(result.value).toEqual(select(selectors.getHistory));
  });

  it('runs flowCancelWorker with custom action', () => {
    const gen = workers.flowCancelWorker();
    let result = gen.next();
    const flowPageState = {
      modifier: types.FLOW_SET_CUSTOM,
      action: jest.fn()
    };

    // Selects history state
    expect(result.value).toEqual(select(selectors.getHistory));

    // Select flowPage state
    result = gen.next({ landing: true });
    expect(result.value).toEqual(select(selectors.getFlowPageState));

    // Call flowPage action
    result = gen.next(flowPageState);
    expect(result.value).toEqual(call(flowPageState.action));

    // Resolve worker
    result = gen.next();
    expect(result.done).toBe(true);
  });

  it('runs flowCancelWorker with URL', () => {
    const gen = workers.flowCancelWorker();
    let result = gen.next();
    const flowPageState = {
      modifier: types.FLOW_SET_URL,
      url: '/dashboard',
      type: ''
    };

    // Selects history state
    expect(result.value).toEqual(select(selectors.getHistory));

    // Select flowPage state
    result = gen.next(mockHistory);
    expect(result.value).toEqual(select(selectors.getFlowPageState));

    // Call history.push
    result = gen.next(flowPageState);
    expect(result.value).toEqual(call(mockHistory.push, flowPageState.url));

    // Resolve worker
    result = gen.next();
    expect(result.done).toBe(true);
  });

  it('runs flowCancelWorker with replacement URL', () => {
    const gen = workers.flowCancelWorker();
    const flowPageState = {
      modifier: types.FLOW_SET_URL,
      url: '/dashboard',
      type: 'replace'
    };
    const newBaseUrl = `${window.location.origin}${flowPageState.url}`;

    let result = gen.next();
    // Selects history state

    expect(result.value).toEqual(select(selectors.getHistory));

    // Select flowPage state
    result = gen.next(mockHistory);
    expect(result.value).toEqual(select(selectors.getFlowPageState));

    result = gen.next(flowPageState);
    expect(window.location.assign).toBeCalledWith(newBaseUrl);

    // Resolve worker
    result = gen.next();
    expect(result.done).toBe(true);
  });

  it('runs flowCancelWorker with Logout', () => {
    const gen = workers.flowCancelWorker();
    let result = gen.next();
    const flowPageState = {
      modifier: types.FLOW_SET_LOGOUT
    };

    // Selects history state
    expect(result.value).toEqual(select(selectors.getHistory));

    // Select flowPage state
    result = gen.next(mockHistory);
    expect(result.value).toEqual(select(selectors.getFlowPageState));

    result = gen.next(flowPageState);
    expect(result.value).toEqual(put(actions.logoutUser()));

    // Resolve worker
    result = gen.next();
    expect(result.done).toBe(true);
  });

  it('runs flowCancelWorker with go back', () => {
    const gen = workers.flowCancelWorker();
    const flowPageState = {
      modifier: types.FLOW_SET_GO_BACK
    };

    let result = gen.next(flowPageState);

    // Selects history state
    expect(result.value).toEqual(select(selectors.getHistory));

    // Select flowPage state
    result = gen.next(mockHistory);
    expect(result.value).toEqual(select(selectors.getFlowPageState));

    result = gen.next(flowPageState);
    expect(result.value).toEqual(call(mockHistory.goBack));
  });

  it('runs modalWorker', () => {
    const gen = workers.modalWorker();
    const result = gen.next();

    expect(result.value).toEqual(put(actions.hideModalError()));
  });

  it('runs redirectUrlWorker', () => {
    const action = actions.redirectToUrl('/site-details');
    const gen = workers.redirectUrlWorker(action);
    let result = gen.next();

    // Select history
    expect(result.value).toEqual(select(selectors.getHistory));

    // Select modal state
    result = gen.next(mockHistory);
    expect(result.value).toEqual(select(selectors.getModalState));

    // Call history.push
    result = gen.next();
    expect(result.value).toEqual(call(mockHistory.push, action.payload.url));
  });

  it('runs redirectUrlWorker with Replace option', () => {
    const action = actions.redirectToUrl('/site-details', 'replace');
    const gen = workers.redirectUrlWorker(action);
    const newBaseUrl = `${window.location.origin}${action.payload.url}`;
    let result = gen.next();

    // Select history
    expect(result.value).toEqual(select(selectors.getHistory));

    // Select modal state
    result = gen.next(mockHistory);
    expect(result.value).toEqual(select(selectors.getModalState));

    // Call history.push
    result = gen.next();
    expect(window.location.assign).toBeCalledWith(newBaseUrl);

    // Resolve worker
    result = gen.next();
    expect(result.done).toBe(true);
  });

  it('runs redirectUrlWorker with open modal', () => {
    const action = actions.redirectToUrl('/site-details');
    const gen = workers.redirectUrlWorker(action);
    let result = gen.next();
    const modalState = { show: true };

    // Select history
    expect(result.value).toEqual(select(selectors.getHistory));

    // Select modal state
    result = gen.next(mockHistory);
    expect(result.value).toEqual(select(selectors.getModalState));

    // Put hideModal action
    result = gen.next(modalState);
    expect(result.value).toEqual(put(actions.hideModal()));

    // Call history.push
    result = gen.next();
    expect(result.value).toEqual(call(mockHistory.push, action.payload.url));
  });

  it('runs redirectBackWorker', () => {
    const gen = workers.redirectBackWorker();
    let result = gen.next();

    // Select history
    expect(result.value).toEqual(select(selectors.getHistory));

    // Select modal state
    result = gen.next(mockHistory);
    expect(result.value).toEqual(select(selectors.getModalState));

    // Call history.goBack
    result = gen.next();
    expect(result.value).toEqual(call(mockHistory.goBack));
  });

  it('runs redirectBackWorker with open modal', () => {
    const gen = workers.redirectBackWorker();
    let result = gen.next();
    const modalState = { show: true };

    // Select history
    expect(result.value).toEqual(select(selectors.getHistory));

    // Select modal state
    result = gen.next(mockHistory);
    expect(result.value).toEqual(select(selectors.getModalState));

    // Put hideModal action
    result = gen.next(modalState);
    expect(result.value).toEqual(put(actions.hideModal()));

    // Call history.goBack
    result = gen.next();
    expect(result.value).toEqual(call(mockHistory.goBack));
  });

  it('runs logErrorWorker', () => {
    const payload = {
      url: '/payment'
    };
    const gen = workers.logErrorWorker({ payload });
    const appSettings = {
      loggingEndpoint: {
        url: 'https://business.comcast.com'
      }
    };
    const endpoint = {
      url: payload.url,
      baseURL: appSettings.loggingEndpoint.url,
      key: 'error'
    };
    const options = { error: payload };

    let result = gen.next(payload);

    // Selects AppSettings
    expect(result.value).toEqual(select(appSelectors.getAppSettings));

    result = gen.next(appSettings);
    expect(result.value).toEqual(call(loader.request, endpoint, options));

    const error = new Error('Oops');

    expect(() => gen.throw(error)).toThrow(new Error(error.message));
  });
});
