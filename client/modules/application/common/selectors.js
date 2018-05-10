import { createSelector } from 'reselect';

const getCommonContent = state => {
  return state.application.content.common;
};

const getFlowPageState = state => {
  return state.application.common.flowPageState;
};

const getHistory = state => {
  return state.application.common.history;
};

const getLoadedState = state => {
  return state.application.common.loaded;
};

const getModalState = state => {
  return state.application.common.modal;
};

const getModalError = createSelector(getModalState, modal => {
  return modal.error;
});

const getUnsavedChangesContent = createSelector(
  [getFlowPageState, getCommonContent],
  (flowPageState, commonContent) => {
    return flowPageState.modalContent || commonContent.UnsavedChangesContent;
  }
);

const selectors = {
  getCommonContent,
  getFlowPageState,
  getHistory,
  getLoadedState,
  getModalError,
  getModalState,
  getUnsavedChangesContent
};

export default selectors;
