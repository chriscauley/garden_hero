import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

const preloadedState = {
  application: 'Garden Hero'
};

const store = configureStore(preloadedState);

// Render application to DOM
ReactDOM.render(
  <Provider store={store}>
    <h1>Garden Hero, Hola</h1>
  </Provider>,
  document.getElementById('root')
);
