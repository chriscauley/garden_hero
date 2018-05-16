import { all, fork } from 'redux-saga/effects';
import applicationSaga from 'modules/application/sagas';
import memberSaga from 'modules/members/sagas';

const sagas = [applicationSaga, memberSaga];

function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}

export default rootSaga;
