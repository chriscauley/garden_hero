import { combineReducers } from 'redux';
import application from 'modules/application';
import members from 'modules/members';

// Root reducer
const rootReducer = combineReducers({
  application,
  members
});

export default rootReducer;
