import { buildActionNames } from 'utils/util';
const moduleName = 'members';

// Action Types
export const types = buildActionNames(moduleName, [
  'LOAD_DATA',
  'LOAD_DATA_SUCCESS',
  'MEMBER_SIGNUP',
  'MEMBER_SIGNUP_SUCCESS',
  'GET_PROFILE',
  'GET_PROFILE_SUCCESS'
]);

// Action Creators
const loadData = () => ({
  type: types.LOAD_DATA
});

const loadDataSuccess = payload => ({
  type: types.LOAD_DATA_SUCCESS,
  payload
});

const memberSignup = payload => ({
  type: types.MEMBER_SIGNUP,
  payload
});

const memberSignupSuccess = payload => ({
  type: types.MEMBER_SIGNUP_SUCCESS,
  payload
});

const getProfile = payload => ({
  type: types.GET_PROFILE,
  payload
});

const getProfileSuccess = payload => ({
  type: types.GET_PROFILE_SUCCESS,
  payload
});

export const actions = {
  loadData,
  loadDataSuccess,
  memberSignup,
  memberSignupSuccess,
  getProfile,
  getProfileSuccess
};

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
    case types.MEMBER_SIGNUP_SUCCESS:
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
