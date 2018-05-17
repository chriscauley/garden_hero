import { all, call, takeLatest, put } from 'redux-saga/effects';

import endpoints from 'modules/endpoints';
import { actions, types } from 'modules/members';

import loader from 'utils/loader/loader';

function* loadDataWorker() {
  const endpoint = endpoints.members;

  try {
    const response = yield call(loader.request, endpoint);

    // Check actual response model
    if (!response) {
      throw new Error('Could not load member data.');
    } else {
      yield put(actions.loadDataSuccess({ form: response }));
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

function* signupWorker({ payload }) {
  const endpoint = endpoints.signup;
  const options = {
    data: {
      ...payload
    }
  };

  console.warn('payload:', payload);

  try {
    const response = yield call(loader.request, endpoint, options);

    // Check actual response model
    if (!response) {
      throw new Error('Could not submit member data.');
    } else {
      yield put(actions.memberSignupSuccess(response));
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

export const workers = { loadDataWorker, signupWorker };

// Watchers
function* loadDataWatch() {
  yield takeLatest(types.LOAD_DATA, loadDataWorker);
}

function* signupWatch() {
  yield takeLatest(types.MEMBER_SIGNUP, signupWorker);
}

export const watchers = {
  loadDataWatch,
  signupWatch
};

export default function* saga() {
  yield all([loadDataWatch(), signupWatch()]);
}
