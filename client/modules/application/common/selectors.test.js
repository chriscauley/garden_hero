import selectors from './selectors';
import { initialState } from 'modules/application/common';
import * as API_CONTENT from 'apis/content/app/account';

describe('common selectors', () => {
  const state = {
    application: {
      common: initialState,
      content: API_CONTENT
    }
  };

  it('gets flowPageState', () => {
    expect(selectors.getFlowPageState(state)).toEqual(
      state.application.common.flowPageState
    );
  });

  it('gets history', () => {
    expect(selectors.getHistory(state)).toEqual(
      state.application.common.history
    );
  });

  it('gets modalError', () => {
    expect(selectors.getModalError(state)).toEqual({
      message: '',
      show: false
    });
  });
});
