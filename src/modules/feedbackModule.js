import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_FEEDBACK = 'feedback/GET_GET_FEEDBACK';
export const GET_FEEDBACKLIST = 'feedback/GET_GET_FEEDBACK';
export const POST_FEEDBACK = 'feedback/POST_FEEDBACK';
export const DELETE_FEEDBACK = 'review/DELETE_FEEDBACK';

const actions = createActions({
  [GET_FEEDBACK]: () => {},
  [GET_FEEDBACKLIST]: () => {},
  [POST_FEEDBACK]: () => {},
  [DELETE_FEEDBACK]: () => {},
});

const feedbackReducer = handleActions(
  {
    [GET_FEEDBACK]: (state, { payload }) => {
      return payload;
    },
    [GET_FEEDBACKLIST]: (state, { payload }) => {
      return payload;
    },
    [POST_FEEDBACK]: (state, { payload }) => {
      return payload;
    },
    [DELETE_FEEDBACK]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default feedbackReducer;
