import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import noop from 'lodash/noop';
import pick from 'lodash/pick';

import { actions } from 'modules/application';

export const defaults = {
  baseURL: '/',
  url: '',
  method: 'GET',
  data: undefined,
  timeout: 150000,
  useGlobalSpinner: false,
  hideContentWhileLoading: false,
  clearPageErrors: false,
  showPageLevelError: true,
  throwErrors: false,
  preLoad: noop,
  postLoad: noop,
  enableLogging: true
};

export const requestConfigKeys = [
  'baseURL',
  'url',
  'method',
  'data',
  'error',
  'params',
  'timeout',
  'headers',
  'withCredentials'
];

export function* preLoad(config) {
  if (config.useGlobalSpinner) {
    yield put(actions.showGlobalSpinner());
  }

  if (config.clearPageErrors) {
    yield put(actions.setPageErrors([]));
  }

  yield call(config.preLoad);
}

export function* postLoad(config) {
  if (config.useGlobalSpinner) {
    yield put(actions.hideGlobalSpinner());
  }

  yield call(config.postLoad);
}

class Loader {
  *request(endpoint, options) {
    defaults.baseURL = 'http://localhost:8000'; // local api server
    const config = Object.assign({}, defaults, options, endpoint);
    const requestConfig = Object.assign({}, pick(config, requestConfigKeys));

    let response;

    // Trigger preLoad method
    yield call(preLoad, config);
    yield put(actions.startRequest(requestConfig));

    try {
      response = yield call(axios, requestConfig);
    } catch (error) {
      if (config.throwErrors) {
        yield call(postLoad, config);
        throw new Error(error.message);
      }
    }

    const data = response ? response : {};

    // Trigger postLoad method
    yield call(postLoad, config);

    // Return response
    return data;
  }
}

// Export singleton
const instance = new Loader();

export default instance;
