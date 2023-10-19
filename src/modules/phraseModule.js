import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_PHRASE = "phrase/GET_PHARASE";

const actions = createActions({
  [GET_PHRASE]: () => {},
});

const phraseReducer = handleActions(
  {
    [GET_PHRASE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default phraseReducer;
