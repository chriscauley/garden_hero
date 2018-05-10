import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

/* eslint-disable no-underscore-dangle */
const devToolsExtension =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable */

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(sagaMiddleware), devToolsExtension)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
