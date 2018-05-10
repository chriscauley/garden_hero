import reducer from 'modules/application';
import commonReducer from 'modules/application/common';
import contentReducer from 'modules/application/content';
import { actions, types } from './index';

describe('application reducer', () => {
  const initialState = {
    cimaAuthUrl: '',
    cimaAuthToken: '',
    dataApiBaseUrl: ''
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ...initialState,
      common: commonReducer(undefined, {}),
      content: contentReducer(undefined, {})
    });
  });

  it('should handle an undefined action', () => {
    expect(reducer(undefined, undefined)).toEqual({
      ...initialState,
      common: commonReducer(undefined, {}),
      content: contentReducer(undefined, {})
    });
  });

  it('handles AUTHORIZE_USER action', () => {
    const action = actions.authorizeUser();

    expect(action).toEqual({
      type: types.AUTHORIZE_USER
    });
  });

  it('should handle AUTHORIZE_USER_SUCCESS action', () => {
    const token = '12345';
    const action = actions.authorizeUserSuccess(token);

    expect(action).toEqual({
      type: types.AUTHORIZE_USER_SUCCESS,
      payload: {
        cimaAuthToken: token
      }
    });
  });

  it('handles TRACK_PAGE action', () => {
    const pageName = 'Comcast Business';
    const action = actions.trackPage(pageName);

    expect(action).toEqual({
      type: types.TRACK_PAGE,
      payload: {
        pageName
      }
    });
  });

  it('handles REQUEST_START action', () => {
    const payload = {};
    const action = actions.startRequest(payload);

    expect(action).toEqual({
      type: types.REQUEST_START,
      payload
    });
  });

  it('handles TRACK_ROUTE action', () => {
    const payload = {};
    const action = actions.trackRoute(payload);

    expect(action).toEqual({
      type: types.TRACK_ROUTE,
      payload
    });
  });

  it('handles LOGOUT_LISTENER action', () => {
    const payload = {};
    const action = actions.logoutListener(payload);

    expect(action).toEqual({
      type: types.LOGOUT_LISTENER,
      payload
    });
  });
});
