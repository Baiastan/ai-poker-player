export const REQUEST_GPT = 'REQUEST_GPT';
export const REQUEST_GPT_SUCCEEDED = 'REQUEST_GPT_SUCCEEDED';
export const REQUEST_GPT_FAILED = 'REQUEST_GPT_FAILED';
export const SET_SUGGESTION = 'SET_SUGGESTION';

export const requestGpt = () => ({
  type: REQUEST_GPT,
});

export const requestSucceeded = (payload) => ({
  type: REQUEST_GPT_SUCCEEDED,
  payload,
});

export const requestFailed = (errorMessage) => ({
  type: REQUEST_GPT_FAILED,
  errorMessage,
});

export const setSuggestion = (suggestion) => {
  return {
    type: SET_SUGGESTION,
    suggestion,
  };
};
