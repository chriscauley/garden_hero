import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import application from 'modules/application';
import members from 'modules/members';

// Root reducer
const rootReducer = combineReducers({
  application,
  members,
  form
});

export default rootReducer;
