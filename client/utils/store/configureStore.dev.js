import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';

import rootReducer from 'modules';
import rootSaga from 'modules/sagas';

// Create saga saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create history
export const history = createBrowserHistory({
  basename: '/'
});

// Add enhancer for DevTools
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));
/* eslint-enable */

const configureStore = initialState => {
  // Create Redux Store
  const store = createStore(rootReducer, initialState, enhancers);

  if (module.hot) {
    // Enable Webpack Hot Module Replacement for reducers
    module.hot.accept('modules', () => {
      const nextReducer = require('modules').default;

      store.replaceReducer(nextReducer);
    });
  }

  // Run sagas
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
