import { combineReducers } from 'redux';

// Initial reducer
const application = (state = {}, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Root reducer
const rootReducer = combineReducers({
  application
});

export default rootReducer;
