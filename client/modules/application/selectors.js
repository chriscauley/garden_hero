import { createSelector } from 'reselect';

const getAppSettings = state => ({
  appId: 'Orion',
  loggingEndpoint: {
    url: state.application.dataApi.loggingBaseUrl,
    method: 'POST',
    baseURL: ''
  }
});

const initialAcceptedTerms = state => {
  return state.application.userContext.acceptedContracts;
};

const initialTermCodes = state => {
  return state.application.contractTermCodes;
};

const getAuthCredentials = state => ({
  endpoint: {
    url: state.application.cimaAuthUrl,
    method: 'POST',
    baseUrl: ''
  },
  token: state.application.cimaAuthToken
});

const getAuthorization = state => {
  const token = state.application.cimaAuthToken;

  return Boolean(token && token.length);
};

const getBaseApiUrl = (state, key) => {
  // Enhance this to accept only from a list of keys
  const keyName = key ? `${key}BaseUrl` : null;
  const baseUrl =
    keyName && key !== 'content'
      ? state.application.dataApi[keyName]
      : state.application.dataApi;

  if (key === 'content') {
    return state.application.contentApiBaseUrl;
  }

  return baseUrl;
};

const getSessionTimeout = state => {
  return state.application.sessionTimeout * 1000;
};

const getUserContext = state => {
  return state.application.userContext;
};

const getCurrentArrangementId = state => {
  return state.application.userContext.currentBillingArrangementId;
};

const getBillingArrangements = state => {
  return state.application.userContext.billingArrangements;
};

const getUserAuthGuid = state => {
  return state.application.userContext.currentAccountAuthGuid;
};

const getUserToken = state => {
  return state.application.userToken;
};

// selector for grabbing content at different addresses.
const getContent = (state, location = '') => {
  return state.application.content[location] || state.application.content;
};

const getAccountUsersContent = createSelector(getContent, content => {
  return content.components.users;
});

const getGlobalContent = state => {
  return state.application.content.global || {};
};

const getCommonContent = state => {
  return state.application.content.common;
};

// This combines the "global" and "common" content objects.
// "global" refers to content shared across all BCP applications.
// "Common" is widely shared within the scope of the current application.
// Thus, this selector combines the two, with the understanding that
// the application reserves the ability to overwrite identically-named properties
// found in "global". i.e.: custom errorMessages per application.
const getGlobalCommonContent = createSelector(
  [getGlobalContent, getCommonContent],
  (global, common) =>
    Object.assign(
      {},
      global.actions,
      global.labels,
      common.actions,
      common.labels
    )
);

const getUserCredentials = createSelector(
  [getUserContext, getUserToken],
  (userCredentials, userToken) => ({
    authGuid: userCredentials.currentAccountAuthGuid,
    guid: userCredentials.customerGuid,
    loginEmail: userCredentials.loginEmail,
    sessionId: userCredentials.visitorSessionId,
    userToken: userToken ? userToken : null,
    acceptedContracts: userCredentials.acceptedContracts
  })
);

const selectors = {
  getAppSettings,
  getAuthCredentials,
  getAuthorization,
  getBaseApiUrl,
  getBillingArrangements,
  getCurrentArrangementId,
  getCommonContent,
  getContent,
  getAccountUsersContent,
  getGlobalCommonContent,
  getGlobalContent,
  getSessionTimeout,
  getUserAuthGuid,
  getUserContext,
  getUserCredentials,
  getUserToken,
  initialAcceptedTerms,
  initialTermCodes
};

export default selectors;
