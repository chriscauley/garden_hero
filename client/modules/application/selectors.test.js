import selectors from './selectors';

import * as API_APP from 'apis/application';
import * as API_CONTENT from 'apis/content/app/account';

describe('application selectors', () => {
  const application = API_APP.application;
  const content = API_CONTENT;
  const state = {
    application: {
      ...application,
      content
    }
  };

  it('gets app settings', () => {
    expect(selectors.getAppSettings(state)).toEqual({
      appId: 'Orion',
      loggingEndpoint: {
        url: state.application.dataApi.loggingBaseUrl,
        method: 'POST',
        baseURL: ''
      }
    });
  });

  it('gets authorization credentials', () => {
    expect(selectors.getAuthCredentials(state)).toEqual({
      endpoint: {
        method: 'POST',
        baseUrl: '',
        url: state.application.cimaAuthUrl
      },
      token: state.application.cimaAuthToken
    });
  });

  it('gets authorization', () => {
    expect(selectors.getAuthorization(state)).toBe(true);
  });

  it('gets base API URL', () => {
    expect(selectors.getBaseApiUrl(state, 'payment')).toEqual(
      state.application.dataApi.paymentBaseUrl
    );

    // Change to contentBaseUrl if key is content
    expect(selectors.getBaseApiUrl(state, 'content')).toEqual(
      state.application.contentApiBaseUrl
    );

    // Returns entire dataApi Object if no key is passed
    expect(selectors.getBaseApiUrl(state, '')).toEqual(
      state.application.dataApi
    );
  });

  it('gets the session timeout', () => {
    expect(selectors.getSessionTimeout(state)).toEqual(1200000);
  });

  it('gets userContext', () => {
    const userContext = state.application.userContext;

    expect(selectors.getUserContext(state)).toEqual(userContext);
  });

  it('gets userAuthGuid', () => {
    const authId = state.application.userContext.currentAccountAuthGuid;

    expect(selectors.getUserAuthGuid(state)).toEqual(authId);
  });

  it('gets user credentials', () => {
    const userContext = state.application.userContext;

    expect(selectors.getUserCredentials(state)).toEqual({
      authGuid: userContext.currentAccountAuthGuid,
      guid: userContext.customerGuid,
      loginEmail: userContext.loginEmail,
      sessionId: userContext.visitorSessionId,
      userToken: null,
      acceptedContracts: userContext.acceptedContracts
    });
  });

  it('gets currentArrangementId', () => {
    expect(selectors.getCurrentArrangementId(state)).toEqual('333333344');
  });

  it('gets billingArrangements', () => {
    const billingArrangements =
      state.application.userContext.billingArrangements;

    expect(selectors.getBillingArrangements(state)).toEqual(
      billingArrangements
    );
  });

  it('gets initial TermCodes', () => {
    const termCodes = state.application.contractTermCodes;

    expect(selectors.initialTermCodes(state)).toEqual(termCodes);
  });

  it('gets initial Accepted Terms', () => {
    const accepted = state.application.userContext.acceptedContracts;

    expect(selectors.initialAcceptedTerms(state)).toEqual(accepted);
  });

  it('gets userToken', () => {
    const token = state.application.userToken;

    expect(selectors.getUserToken(state)).toEqual(token);
  });

  it('gets content', () => {
    const allContent = state.application.content;

    expect(selectors.getContent(state)).toEqual(allContent);
  });

  it('gets global content', () => {
    const allContent = state.application.content.global;

    expect(selectors.getGlobalContent(state)).toEqual(allContent);
  });

  it('gets common content', () => {
    const allContent = state.application.content.common;

    expect(selectors.getCommonContent(state)).toEqual(allContent);
  });
});
