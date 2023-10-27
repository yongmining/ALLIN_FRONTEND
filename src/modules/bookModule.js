import { createActions, handleActions } from "redux-actions";
// actions 변수를 제거합니다.
const initialState = [];
export const GET_BOOK = "book/GET_BOOK";

const actions = createActions({
  [GET_BOOK]: () => {},
});

const bookReducer = handleActions(
  {
    [GET_BOOK]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default bookReducer;
