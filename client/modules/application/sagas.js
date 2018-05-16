import { all, call, takeLatest, put } from 'redux-saga/effects';

import endpoints from 'modules/endpoints';
import { actions, types } from 'modules/application';

// import * as MOCK_FORM from 'apis/forms/registrationForm';

import loader from 'utils/loader/loader';

// Calls endpoint to get form schema
function* getFormWorker({ payload }) {
  const endpoint = endpoints.form[payload];

  try {
    const response = yield call(loader.request, endpoint);
    // const response = MOCK_FORM;

    // Check actual response model
    if (!response) {
      throw new Error('Could not load form data.');
    } else {
      yield put(
        actions.getFormSuccess({ formName: payload, fields: response })
      );
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

export const workers = {
  getFormWorker
};

// Watchers
function* getFormWatch() {
  yield takeLatest(types.GET_FORM, getFormWorker);
}

export const watchers = {
  getFormWatch
};

export default function* saga() {
  yield all([getFormWatch()]);
}
