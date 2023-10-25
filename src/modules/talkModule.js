import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_TALK = 'talk/GET_GET_TALK';
export const GET_TALKLIST = 'talk/GET_GET_TALKLIST';
export const POST_TALK = 'talk/POST_TALK';
export const DELETE_TALK = 'talk/DELETE_TALK';

const actions = createActions({
  [GET_TALK]: () => {},
  [GET_TALKLIST]: () => {},
  [POST_TALK]: () => {},
  [DELETE_TALK]: () => {},
});

const talkReducer = handleActions(
  {
    [GET_TALK]: (state, { payload }) => {
      return payload;
    },
    [GET_TALKLIST]: (state, { payload }) => {
      return payload;
    },
    [POST_TALK]: (state, { payload }) => {
      return payload;
    },
    [DELETE_TALK]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default talkReducer;
