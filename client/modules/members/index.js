import { buildActionNames } from 'utils/util';
const moduleName = 'members';

// Action Types
export const types = buildActionNames(moduleName, [
  'LOAD_DATA',
  'LOAD_DATA_SUCCESS'
]);

// Action Creators
const loadData = () => ({
  type: types.LOAD_DATA
});

const loadDataSuccess = payload => ({
  type: types.LOAD_DATA_SUCCESS,
  payload
});

export const actions = { loadData, loadDataSuccess };

const initialState = {
  loaded: {
    data: true
  },
  list: [
    {
      id: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      uuid: ''
    }
  ],
  profile: {}
};

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
