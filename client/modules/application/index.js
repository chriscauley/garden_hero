import commonReducer from 'modules/application/common';
import contentReducer from 'modules/application/content';
import { buildActionNames } from 'utils/util';

const moduleName = 'application';

// Action Types
export const types = buildActionNames(moduleName, [
  'AUTHORIZE_USER',
  'AUTHORIZE_USER_SUCCESS',
  'LOGOUT_LISTENER',
  'REQUEST_START',
  'TRACK_PAGE',
  'TRACK_ROUTE',
  'LOGOUT_USER',
  'LOAD_DATA_SUCCESS',
  'LOAD_DATA',
  'LOAD_USER_DATA'
]);

// Action Creators
const authorizeUser = () => ({
  type: types.AUTHORIZE_USER
});

const authorizeUserSuccess = token => ({
  type: types.AUTHORIZE_USER_SUCCESS,
  payload: {
    cimaAuthToken: token
  }
});

const startRequest = payload => ({
  type: types.REQUEST_START,
  payload
});

const trackPage = pageName => ({
  type: types.TRACK_PAGE,
  payload: {
    pageName
  }
});

const trackRoute = payload => ({
  type: types.TRACK_ROUTE,
  payload
});

const logoutListener = payload => ({
  type: types.LOGOUT_LISTENER,
  payload
});

const loadUserData = () => ({
  type: types.LOAD_USER_DATA
});

const logoutUser = () => {
  return {
    type: types.LOGOUT_USER
  };
};

export const actions = {
  authorizeUser,
  authorizeUserSuccess,
  startRequest,
  trackPage,
  trackRoute,
  logoutListener,
  loadUserData,
  logoutUser
};

const initialState = {
  cimaAuthUrl: '',
  cimaAuthToken: '',
  dataApiBaseUrl: ''
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.AUTHORIZE_USER_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case types.UPDATE_USER_CONTEXT:
      return {
        ...state,
        userContext: {
          ...state.userContext,
          ...action.payload
        }
      };
    default:
      return {
        ...state,
        common: commonReducer(state.common, action),
        content: contentReducer(state.content, action)
      };
  }
};

export default reducer;
