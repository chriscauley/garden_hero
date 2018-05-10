import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from 'components/App';
import configureStore, { history } from 'utils/store/configureStore';
// import './index.scss';

if (process.env.NODE_ENV !== 'production') {
  // Enable Hot Module Replacement
  if (module.hot) {
    module.hot.accept();
  }
}

/* eslint-disable no-underscore-dangle */
// Grab state from global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
// Allow the passed state to be garbage-collected

delete window.__PRELOADED_STATE__;

// Create store
export const store = configureStore(preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
