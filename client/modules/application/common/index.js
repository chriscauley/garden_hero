import { submit } from 'redux-form';
import { actions as applicationActions } from 'modules/application';
import { buildActionNames } from 'utils/util';

const moduleName = 'common';

// Action Types
export const types = buildActionNames(moduleName, [
  'FLOW_CANCEL',
  'FLOW_SET_CUSTOM',
  'FLOW_SET_GO_BACK',
  'FLOW_SET_LOADED',
  'FLOW_SET_UNSAVED',
  'FLOW_SET_URL',
  'FLOW_SET_LOGOUT',
  'FLOW_UPDATE',
  'MODAL_ERROR_HIDE',
  'MODAL_ERROR_SHOW',
  'MODAL_HIDE',
  'MODAL_SHOW',
  'NORMALIZE_DATA',
  'REDIRECT_BACK',
  'REDIRECT_TO_URL',
  'SET_DATA',
  'SET_ERROR',
  'SET_HISTORY',
  'SET_LOADED_LANDING',
  'SET_MODAL_CONTENT',
  'SET_PAGE_ERRORS',
  'TOAST_CLEAR',
  'TOAST_HIDE',
  'TOAST_SHOW',
  'TOGGLE_SPINNER',
  'LOG_ERROR'
]);

// Action Creators
const normalizeData = (meta, payload) => ({
  type: types.NORMALIZE_DATA,
  meta: {
    ...meta,
    key: meta.key
  },
  payload
});

const showModal = data => ({
  type: types.MODAL_SHOW,
  payload: {
    show: true,
    ...data
  }
});

const hideModal = () => ({
  type: types.MODAL_HIDE,
  payload: {
    show: false,
    title: '',
    component: null
  }
});

const showModalError = message => ({
  type: types.MODAL_ERROR_SHOW,
  payload: {
    error: {
      message,
      show: true
    }
  }
});

const hideModalError = () => ({
  type: types.MODAL_ERROR_HIDE,
  payload: {
    error: {
      message: '',
      show: false
    }
  }
});

const showToast = message => ({
  type: types.TOAST_SHOW,
  payload: {
    show: true,
    message
  }
});

const hideToast = () => ({
  type: types.TOAST_HIDE,
  payload: {
    show: false
  }
});

const clearToast = () => ({
  type: types.TOAST_CLEAR,
  payload: {
    message: null
  }
});

const submitForm = formName => {
  // Submit Redux Form
  return submit(formName);
};

const setData = payload => ({
  type: types.SET_DATA,
  payload
});

const logError = payload => ({
  type: types.LOG_ERROR,
  payload
});

const setError = error => ({
  type: types.SET_ERROR,
  payload: {
    error
  }
});

const setPageErrors = pageErrors => ({
  type: types.SET_PAGE_ERRORS,
  payload: {
    pageErrors
  }
});

const showGlobalSpinner = () => ({
  type: types.TOGGLE_SPINNER,
  payload: {
    spinner: {
      show: true
    }
  }
});

const hideGlobalSpinner = () => ({
  type: types.TOGGLE_SPINNER,
  payload: {
    spinner: {
      show: false
    }
  }
});

const updateFlow = payload => ({
  type: types.FLOW_UPDATE,
  payload
});

const cancelFlow = () => ({
  type: types.FLOW_CANCEL
});

const setHistory = history => ({
  type: types.SET_HISTORY,
  payload: {
    history
  }
});

const setFlowToGoBack = () => ({
  type: types.FLOW_SET_GO_BACK,
  payload: {
    modifier: types.FLOW_SET_GO_BACK
  }
});

const setFlowLogout = () => ({
  type: types.FLOW_SET_LOGOUT,
  payload: {
    modifier: types.FLOW_SET_LOGOUT
  }
});

const setFlowCustomAction = payload => ({
  type: types.FLOW_SET_CUSTOM,
  payload: {
    modifier: types.FLOW_SET_CUSTOM,
    action: payload
  }
});

const setFlowGoToUrl = (payload, type = 'relative') => ({
  type: types.FLOW_SET_URL,
  payload: {
    modifier: types.FLOW_SET_URL,
    url: payload,
    type
  }
});

const setFlowLoaded = payload => ({
  type: types.FLOW_SET_LOADED,
  payload: {
    loaded: payload
  }
});

const setFlowHasUnsavedChanges = payload => ({
  type: types.FLOW_SET_UNSAVED,
  payload: {
    modifier: types.FLOW_SET_UNSAVED,
    action: payload
  }
});

// Accepts types 'relative' and 'replace'. Default: 'relative'
// Type 'replace' ignores app basename and uses window.location.assign()
// Useful for routing between Single Page Apps.
const redirectToUrl = (url, type = 'relative') => ({
  type: types.REDIRECT_TO_URL,
  payload: {
    url,
    type
  }
});

const redirectBack = () => ({
  type: types.REDIRECT_BACK
});

const setModalContent = payload => ({
  type: types.SET_MODAL_CONTENT,
  payload: {
    modalContent: payload
  }
});

const setLandingPage = () => ({
  type: types.SET_LOADED_LANDING,
  meta: {
    loaded: {
      landing: true
    }
  }
});

// Export application actions and common actions
export const actions = {
  ...applicationActions,
  normalizeData,
  showModal,
  hideModal,
  showModalError,
  hideModalError,
  setData,
  logError,
  setError,
  setPageErrors,
  showGlobalSpinner,
  hideGlobalSpinner,
  submitForm,
  showToast,
  hideToast,
  clearToast,
  updateFlow,
  cancelFlow,
  setHistory,
  setFlowLoaded,
  setFlowToGoBack,
  setFlowCustomAction,
  setFlowGoToUrl,
  setFlowLogout,
  setFlowHasUnsavedChanges,
  redirectToUrl,
  redirectBack,
  setModalContent,
  setLandingPage
};

// Initial state
export const initialState = {
  flowPageState: {
    url: '',
    modifier: types.FLOW_SET_GO_BACK,
    action: null,
    modalContent: null,
    loaded: false
  },
  history: null,
  hydrated: false,
  loaded: {
    data: false,
    landing: false
  },
  pageErrors: [],
  modal: {
    show: false,
    title: '',
    component: null,
    error: {
      message: '',
      show: false
    }
  },
  toast: {
    show: false,
    message: null
  }
};

// Reducers
const flowPageReducer = (state, action) => {
  switch (action.type) {
    case types.FLOW_SET_GO_BACK:
    case types.FLOW_SET_CUSTOM:
    case types.FLOW_SET_URL:
    case types.FLOW_SET_UNSAVED:
    case types.FLOW_UPDATE:
    case types.FLOW_SET_LOADED:
    case types.FLOW_SET_LOGOUT:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

const toastReducer = (state, action) => {
  return {
    ...state,
    ...action.payload
  };
};

const modalReducer = (state, action) => {
  return {
    ...state,
    ...action.payload
  };
};

const reducer = (state = initialState, action = {}) => {
  if (!state.hydrated) {
    // Merge initial state with preloaded state
    state = {
      ...initialState,
      ...state,
      hydrated: true
    };
  }

  switch (action.type) {
    case types.SET_LOADED_LANDING:
      return {
        ...state,
        loaded: Object.assign({}, state.loaded, action.meta.loaded)
      };
    case types.FLOW_SET_GO_BACK:
    case types.FLOW_SET_CUSTOM:
    case types.FLOW_SET_URL:
    case types.FLOW_SET_UNSAVED:
    case types.FLOW_SET_LOADED:
    case types.FLOW_UPDATE:
    case types.FLOW_SET_LOGOUT:
      return {
        ...state,
        flowPageState: flowPageReducer(state.flowPageState, action)
      };
    case types.MODAL_SHOW:
    case types.MODAL_HIDE:
    case types.MODAL_ERROR_SHOW:
    case types.MODAL_ERROR_HIDE:
      return {
        ...state,
        modal: modalReducer(state.modal, action)
      };
    case types.TOAST_SHOW:
    case types.TOAST_HIDE:
    case types.TOAST_CLEAR:
      return {
        ...state,
        toast: toastReducer(state.toast, action)
      };
    case types.TOGGLE_SPINNER:
    case types.SET_DATA:
    case types.SET_ERROR:
    case types.SET_HISTORY:
    case types.SET_PAGE_ERRORS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default reducer;
