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

export const workers = {
  loadDataWorker
};

// Watchers
function* loadDataWatch() {
  yield takeLatest(types.LOAD_DATA, loadDataWorker);
}

export const watchers = {
  loadDataWatch
};

export default function* saga() {
  yield all([loadDataWatch()]);
}
