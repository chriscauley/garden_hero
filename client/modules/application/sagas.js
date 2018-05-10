import { delay } from 'redux-saga';
import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  take,
  select
} from 'redux-saga/effects';

import { actions, types } from 'modules/application';
import selectors from 'modules/application/selectors';
import Lock from 'utils/lock/lock';
import loader from 'utils/loader/loader';
import { navigationRoutes, navigationSteps } from 'modules/navigation';
import { replaceEndpoint } from 'utils/util';

import { workers as userWorkers } from 'modules/account/users/sagas';

const currentRoute = navigationRoutes[navigationSteps.ACCOUNT];

// Workers
function analyticsWorker({ payload }) {
  const title = payload.pageName || document.title;
  const dividerIndex = title.indexOf('|');
  const screenName =
    dividerIndex !== -1 ? title.slice(dividerIndex + 1).trim() : title.trim();

  const options = {
    detail: {
      page: {
        pageInfo: {
          screenName
        }
      }
    },
    bubbles: true
  };

  // Dispatch page tracking event
  document.dispatchEvent(new CustomEvent('c-tracking-log-page', options));
}

function* authorizeWorker() {
  const { endpoint, token } = yield select(selectors.getAuthCredentials);

  try {
    /* eslint-disable camelcase*/
    const response = yield call(loader.request, endpoint, {
      headers: {
        Authorization: token
      },
      params: {
        grant_type: 'client_credentials'
      }
    });

    if (!response.access_token) {
      // No token found
      return false;
    }

    const { access_token, expires_in, token_type } = response;
    const expiration = (expires_in - 180) * 1000;
    const sessionToken = `${token_type} ${access_token}`;
    /* eslint-enable camelcase */

    yield put(actions.authorizeUserSuccess(sessionToken));
    // Call authorizeWorker after expiration delay
    yield call(delay, expiration);
    yield* authorizeWorker();
  } catch (error) {
    throw new Error(error.message);
  }

  yield;
}

function routeWorker() {
  document.dispatchEvent(
    new CustomEvent('c-tracking-log-page-start', {
      bubbles: true
    })
  );
}

export function logout() {
  const logoutUrl = window.localStorage.getItem('logoutUrl');

  window.localStorage.setItem('logout', true);
  window.location.assign(logoutUrl);
}

export function clickHandler(ev) {
  const logoutUrl =
    ev.currentTarget.href || window.localStorage.getItem('logoutUrl');

  if (logoutUrl.includes('logout')) {
    ev.preventDefault();
    logout();
  }
}

export function storageHandler(ev) {
  const { key, newValue } = ev;

  if (key === 'logout' && Boolean(newValue) === true) {
    logout();
  }
}

function logoutWorker() {
  const logoutUrl = '/account/logout';
  // This is very specific to the logout button in the Global nav.
  const navLinks =
    document.querySelectorAll('a.bsp-profile-lob-link') ||
    document.querySelectorAll('.bcp-btn--logout');
  const logoutBtn = navLinks ? navLinks.item(navLinks.length - 1) : null;

  // Set Default Logout State.
  window.localStorage.setItem('logout', false);
  window.localStorage.setItem('logoutUrl', logoutUrl);

  // Register Event Listeners
  if (logoutBtn) {
    logoutBtn.addEventListener('click', clickHandler, false);
  }
  window.addEventListener('storage', storageHandler, false);
}

function* sessionTimeoutWorker() {
  const sessionTimeout = yield select(selectors.getSessionTimeout);

  try {
    // Disables timeout in Dev environment
    yield call(delay, sessionTimeout);
    yield call(logout);
  } catch (e) {
    // Catch errors
    throw new Error(e.message);
  }
}

function* updateBANWorker({ payload }) {
  const { ban } = payload;
  const currentID = yield select(selectors.getCurrentArrangementId);

  const endpoint = currentRoute.endpoints.onUpdateBAN();
  const newEndpoint = yield replaceEndpoint(endpoint);

  // Cut down on unnecessary calls
  // Exit early if the selected ID is the same as the currently loaded one.
  if (currentID === ban) {
    return;
  }

  try {
    yield call(loader.request, newEndpoint, {
      data: { BillingArrangementId: ban }
    });

    // This will trigger an app re-render, which will also trigger a call to
    // /billing/details to refresh billing content with the new arrangement details without a page refresh
    yield put(actions.updateUserContext({ currentBillingArrangementId: ban }));
  } catch (e) {
    throw new Error(e.message);
  }
}

// In this app, we need user data to be pre-emptively loaded
function* loadUserDataWorker() {
  try {
    yield call(userWorkers.loadDataWorker);
  } catch (e) {
    throw new Error(e.message);
  }
}

function* logoutUserWorker() {
  yield logout();
}

export const workers = {
  analyticsWorker,
  authorizeWorker,
  routeWorker,
  sessionTimeoutWorker,
  logoutWorker,
  updateBANWorker,
  loadUserDataWorker,
  logoutUserWorker
};

export function trackLinks(ev) {
  const element = ev.target.closest(
    'a:not([data-tracking]), button:not([data-tracking])'
  );

  if (element) {
    const event = new CustomEvent('c-tracking-log-dom', {
      bubbles: true
    });

    element.dispatchEvent(event);
  }
}

// Watchers
function* analyticsWatch() {
  // Track links and buttons
  document.addEventListener('click', trackLinks, false);

  yield all([
    takeEvery(types.TRACK_PAGE, analyticsWorker),
    takeEvery(types.TRACK_ROUTE, routeWorker)
  ]);
}

function* sessionWatch() {
  const timeoutLock = new Lock(sessionTimeoutWorker);

  yield takeLatest(types.AUTHORIZE_USER, authorizeWorker);

  /* eslint-disable no-constant-condition */
  while (true) {
    const action = yield take('*');

    if (!action) {
      return;
    }

    if (action.type === types.REQUEST_START) {
      // Cancel timeout with request action
      yield timeoutLock.cancel();
    }

    // Execute session timeout
    yield timeoutLock.execute();
  }
}

function* logoutWatch() {
  yield takeLatest(types.LOGOUT_LISTENER, logoutWorker);
}

function* updateBANWatch() {
  yield takeLatest(types.UPDATE_BILLING_ACCOUNT_NUMBER, updateBANWorker);
}

function* logoutUserWatch() {
  yield takeLatest(types.LOGOUT_USER, logoutUserWorker);
}

function* loadUserDataWatch() {
  yield takeLatest(types.LOAD_USER_DATA, loadUserDataWorker);
}

export const watchers = {
  analyticsWatch,
  sessionWatch,
  logoutWatch,
  updateBANWatch,
  loadUserDataWatch,
  logoutUserWatch
};

// Sagas
export default function* saga() {
  yield all([
    analyticsWatch(),
    // sessionWatch(),
    logoutWatch(),
    updateBANWatch(),
    loadUserDataWatch(),
    logoutUserWatch()
  ]);
}
