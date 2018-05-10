import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  select
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { actions, types } from 'modules/application/common';

import loader from 'utils/loader/loader';
import selectors from './selectors';
import appSelectors from 'modules/application/selectors';

// Workers

function* toastWorker() {
  yield call(delay, 3000);
  yield put(actions.hideToast());
  yield call(delay, 500);
  yield put(actions.clearToast());
}

function* flowCancelWorker() {
  const history = yield select(selectors.getHistory);
  const flowPageState = yield select(selectors.getFlowPageState);
  const newBaseUrl = `${window.location.origin}${flowPageState.url}`;

  switch (flowPageState.modifier) {
    case types.FLOW_SET_CUSTOM:
      yield call(flowPageState.action);
      break;
    case types.FLOW_SET_URL: {
      return flowPageState.type !== 'replace'
        ? yield call(history.push, flowPageState.url)
        : window.location.assign(newBaseUrl);
    }
    case types.FLOW_SET_LOGOUT:
      yield put(actions.logoutUser());
      break;
    case types.FLOW_SET_GO_BACK:
    default:
      yield call(history.goBack);
  }
}

function* modalWorker() {
  // Clear modal errors
  yield put(actions.hideModalError());
}

function* redirectUrlWorker({ payload }) {
  const history = yield select(selectors.getHistory);
  const modalState = yield select(selectors.getModalState);
  const newBaseUrl = `${window.location.origin}${payload.url}`;

  if (modalState && modalState.show) {
    yield put(actions.hideModal());
  }

  return payload.type !== 'replace'
    ? yield call(history.push, payload.url)
    : window.location.assign(newBaseUrl);
}

function* redirectBackWorker() {
  const history = yield select(selectors.getHistory);
  const modalState = yield select(selectors.getModalState);

  if (modalState && modalState.show) {
    yield put(actions.hideModal());
  }

  return yield call(history.goBack);
}

function* logErrorWorker({ payload }) {
  const { loggingEndpoint } = yield select(appSelectors.getAppSettings);
  const endpoint = {
    url: payload.url,
    baseURL: loggingEndpoint.url,
    key: 'error',
    status: payload.status
  };
  const options = { error: payload };

  try {
    yield call(loader.request, endpoint, options);
  } catch (error) {
    throw new Error(error.message);
  }
}

export const workers = {
  flowCancelWorker,
  modalWorker,
  redirectUrlWorker,
  redirectBackWorker,
  toastWorker,
  logErrorWorker
};

// Watchers
function* redirectWatch() {
  yield all([
    takeEvery(types.REDIRECT_TO_URL, redirectUrlWorker),
    takeEvery(types.REDIRECT_BACK, redirectBackWorker)
  ]);
}

function* modalWatch() {
  yield takeLatest(types.MODAL_HIDE, modalWorker);
}

function* toastWatch() {
  yield takeLatest(types.TOAST_SHOW, toastWorker);
}

function* flowCancelWatch() {
  yield takeLatest(types.FLOW_CANCEL, flowCancelWorker);
}

function* logErrorWatch() {
  yield takeLatest(types.LOG_ERROR, logErrorWorker);
}

export const watchers = {
  flowCancelWatch,
  modalWatch,
  toastWatch,
  redirectWatch,
  logErrorWatch
};

// Sagas
export default function* saga() {
  yield all([
    redirectWatch(),
    toastWatch(),
    flowCancelWatch(),
    modalWatch(),
    logErrorWatch()
  ]);
}
