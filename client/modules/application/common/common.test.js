import React from 'react';
import reducer, {
  actions,
  types,
  initialState
} from 'modules/application/common';

describe('common reducer', () => {
  // Environment config
  process.env.config.APP_NAME = 'account';

  const hydratedInitialState = {
    ...initialState,
    hydrated: true
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(hydratedInitialState);
  });

  it('should handle an undefined action', () => {
    expect(reducer(undefined, undefined)).toEqual(hydratedInitialState);
  });

  it('should create an action to submit a Redux Form', () => {
    expect(actions.submitForm('exampleForm')).toEqual({
      type: '@@redux-form/SUBMIT',
      meta: {
        form: 'exampleForm'
      }
    });
  });

  it('should create NORMALIZE_DATA action', () => {
    const action = actions.normalizeData({ key: 'reports' }, { newData: true });

    expect(action).toEqual({
      type: types.NORMALIZE_DATA,
      meta: {
        key: 'reports'
      },
      payload: {
        newData: true
      }
    });
  });

  it('should handle SET_DATA action', () => {
    const action = actions.setData({ newValue: true });

    expect(reducer({}, action)).toMatchObject({
      newValue: true
    });
  });

  it('should handle SET_ERROR action', () => {
    const action = actions.setError('An error occurred');

    expect(reducer({}, action)).toMatchObject({
      error: 'An error occurred'
    });
  });

  it('should handle SET_PAGE_ERRORS action', () => {
    const pageErrors = ['Bad data'];
    const action = actions.setPageErrors(pageErrors);

    expect(reducer({}, action)).toMatchObject({
      pageErrors
    });
  });

  it('should handle SHOW_GLOBAL_SPINNER action', () => {
    const action = actions.showGlobalSpinner();

    expect(reducer({}, action)).toMatchObject({
      spinner: {
        show: true
      }
    });
  });

  it('should handle HIDE_GLOBAL_SPINNER action', () => {
    const action = actions.hideGlobalSpinner();

    expect(reducer({}, action)).toMatchObject({
      spinner: {
        show: false
      }
    });
  });

  it('should handle MODAL_SHOW action', () => {
    const modal = {
      title: 'Example Modal',
      component: <p>Modal body goes here</p>
    };
    const action = actions.showModal(modal);

    expect(reducer({}, action)).toMatchObject({
      modal: {
        show: true,
        ...modal
      }
    });
  });

  it('should handle MODAL_HIDE action', () => {
    const modal = {
      title: 'Example Modal',
      component: <p>Modal body goes here</p>
    };
    const modalState = {
      modal: {
        show: true,
        ...modal
      }
    };
    const action = actions.hideModal();

    expect(reducer(modalState, action)).toMatchObject({
      modal: {
        show: false,
        title: '',
        component: null
      }
    });
  });

  it('should handle MODAL_SHOW_ERROR action', () => {
    const modal = {
      show: true,
      title: 'Example Modal',
      component: <p>Modal body goes here</p>,
      error: {
        message: '',
        show: false
      }
    };
    const modalState = {
      modal
    };
    const action = actions.showModalError('Please try again');

    expect(reducer(modalState, action)).toMatchObject({
      modal: {
        ...modal,
        error: {
          message: 'Please try again',
          show: true
        }
      }
    });
  });

  it('should handle MODAL_HIDE_ERROR action', () => {
    const modal = {
      show: true,
      title: 'Example Modal',
      component: <p>Modal body goes here</p>,
      error: {
        message: 'An error occurred',
        show: false
      }
    };
    const modalState = {
      modal
    };
    const action = actions.hideModalError();

    expect(reducer(modalState, action)).toMatchObject({
      modal: {
        ...modal,
        error: {
          message: '',
          show: false
        }
      }
    });
  });

  it('should handle TOAST_SHOW action', () => {
    const message = 'Your Changes is updated successfully.';
    const action = actions.showToast(message);

    expect(reducer({}, action)).toMatchObject({
      toast: {
        show: true,
        message: 'Your Changes is updated successfully.'
      }
    });
  });

  it('should handle TOAST_HIDE action', () => {
    const action = actions.hideToast();

    expect(reducer({}, action)).toMatchObject({
      toast: {
        show: false
      }
    });
  });

  it('should handle TOAST_CLEAR action', () => {
    const action = actions.clearToast();

    expect(reducer({}, action)).toMatchObject({
      toast: {
        message: null
      }
    });
  });

  it('should handle FLOW_CANCEL action', () => {
    const action = actions.cancelFlow();

    expect(action).toMatchObject({
      type: types.FLOW_CANCEL
    });
  });

  it('should handle FLOW_SET_CUSTOM action', () => {
    const actionMock = 'appName/module/ACTION_NAME';
    const payload = {
      modifier: types.FLOW_SET_CUSTOM,
      action: actionMock
    };
    const action = actions.setFlowCustomAction(actionMock);
    const newState = Object.assign({}, hydratedInitialState, {
      flowPageState: payload
    });

    // Action Shape
    expect(action).toMatchObject({
      type: types.FLOW_SET_CUSTOM,
      payload
    });

    // Reducer Shape
    expect(reducer(hydratedInitialState, action)).toMatchObject(newState);
  });

  it('should handle FLOW_SET_GO_BACK action', () => {
    const payload = {
      modifier: types.FLOW_SET_GO_BACK
    };
    const action = actions.setFlowToGoBack();
    const newState = Object.assign({}, hydratedInitialState, {
      flowPageState: payload
    });

    // Action Shape
    expect(action).toMatchObject({
      type: types.FLOW_SET_GO_BACK,
      payload
    });

    // Reducer Shape
    expect(reducer(hydratedInitialState, action)).toMatchObject(newState);
  });

  it('should handle FLOW_SET_LOADED action', () => {
    const action = actions.setFlowLoaded(true);

    expect(reducer({}, action)).toMatchObject({
      flowPageState: {
        loaded: true
      }
    });
  });

  it('should handle FLOW_SET_URL action', () => {
    const url = '';
    const payload = {
      modifier: types.FLOW_SET_URL,
      url
    };
    const action = actions.setFlowGoToUrl(url);
    const newState = Object.assign({}, hydratedInitialState, {
      flowPageState: payload
    });

    expect(action).toMatchObject({
      type: types.FLOW_SET_URL,
      payload
    });

    expect(reducer(hydratedInitialState, action)).toMatchObject(newState);
  });

  it('should handle FLOW_SET_UNSAVED action', () => {
    const actionMock = 'appName/module/ACTION_NAME';
    const payload = {
      modifier: types.FLOW_SET_UNSAVED,
      action: actionMock
    };
    const action = actions.setFlowHasUnsavedChanges(actionMock);
    const newState = Object.assign({}, hydratedInitialState, {
      flowPageState: payload
    });

    // Action Shape
    expect(action).toMatchObject({
      type: types.FLOW_SET_UNSAVED,
      payload
    });

    // Reducer Shape
    expect(reducer({}, action)).toMatchObject(newState);
  });

  it('should handle FLOW_UPDATE action', () => {
    const action = actions.updateFlow({ testing: true });

    expect(reducer({}, action)).toMatchObject({
      flowPageState: {
        testing: true
      }
    });
  });

  it('should handle REDIRECT_BACK action', () => {
    const action = actions.redirectBack();

    expect(action).toMatchObject({
      type: types.REDIRECT_BACK
    });
  });

  it('should handle REDIRECT_TO_URL action', () => {
    const url = '';
    const action = actions.redirectToUrl(url);

    expect(action).toMatchObject({
      type: types.REDIRECT_TO_URL,
      payload: {
        url
      }
    });
  });

  it('should handle SET_HISTORY action', () => {
    const action = actions.setHistory(true);

    expect(reducer({}, action)).toMatchObject({
      history: true
    });
  });

  it('should handle SET_LOADED_LANDING action', () => {
    const action = actions.setLandingPage();

    // Action Shape
    expect(action).toMatchObject({
      type: types.SET_LOADED_LANDING,
      meta: {
        loaded: {
          landing: true
        }
      }
    });

    // Reducer Shape
    expect(reducer({ hydratedInitialState }, action)).toMatchObject({
      ...hydratedInitialState,
      loaded: Object.assign({}, hydratedInitialState.loaded, action.meta.loaded)
    });
  });

  // SET_LOADED_LANDING
  // SET_MODAL_CONTENT
});
