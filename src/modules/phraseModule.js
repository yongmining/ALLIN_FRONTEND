import { createActions, handleActions } from "redux-actions";

const initialState = [];
export const GET_PHRASE = "phrase/GET_PHRASE";

const actions = createActions({
  [GET_PHRASE]: () => {},
});

const phraseReducer = handleActions(
  {
    [GET_PHRASE]: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
  initialState
);

export default phraseReducer;
