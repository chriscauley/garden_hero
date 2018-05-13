import { buildActionNames } from 'utils/util';
const moduleName = 'application';

// Action Types
export const types = buildActionNames(moduleName, [
  ('REQUEST_START', 'LOAD_DATA', 'LOAD_DATA_SUCCESS')
]);

console.warn('types', types);

// Action Creators
const startRequest = payload => ({
  type: types.REQUEST_START,
  payload
});

const loadData = () => ({
  type: types.LOAD_DATA
});

const loadDataSuccess = () => {
  return { type: types.LOAD_DATA_SUCCESS };
};

export const actions = { startRequest, loadData, loadDataSuccess };
console.warn('types', types);

const initialState = {};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default reducer;
