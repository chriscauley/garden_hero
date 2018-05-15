import { all, fork, take } from 'redux-saga/effects';

function* initialSaga() {
  while (true) {
    const action = yield take('*');

    console.log('ACTION:', action);
  }
}

const sagas = [initialSaga];

function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}

export default rootSaga;
