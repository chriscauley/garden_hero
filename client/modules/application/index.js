import { buildActionNames } from 'utils/util';
const moduleName = 'application';

// Action Types
export const types = buildActionNames(moduleName, [
  'REQUEST_START',
  'LOAD_DATA',
  'LOAD_DATA_SUCCESS',
  'GET_FORM',
  'GET_FORM_SUCCESS'
]);

// Action Creators
const startRequest = payload => ({
  type: types.REQUEST_START,
  payload
});

const getForm = payload => ({
  type: types.GET_FORM,
  payload
});

const getFormSuccess = payload => ({
  type: types.GET_FORM_SUCCESS,
  payload
});

const loadData = () => ({
  type: types.LOAD_DATA
});

const loadDataSuccess = payload => ({
  type: types.LOAD_DATA_SUCCESS,
  meta: {
    loaded: {
      data: true
    }
  },
  payload
});

export const actions = {
  startRequest,
  loadData,
  loadDataSuccess,
  getForm,
  getFormSuccess
};

const initialState = {
  loaded: {
    data: false
  }
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...action.meta,
        ...action.payload
      };
    case types.GET_FORM_SUCCESS:
      return {
        ...state,
        ...action.meta,
        forms: {
          [action.payload.formName]: action.payload.fields
        }
      };
    default:
      return {
        ...state
      };
  }
};

export default reducer;
