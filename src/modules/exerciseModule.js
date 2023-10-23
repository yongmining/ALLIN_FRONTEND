import { createActions, handleActions } from "redux-actions";

const initialState = JSON.parse(localStorage.getItem("exerciseData")) || [];
export const GET_EXERCISE = "exercise/GET_EXERCISE";

const actions = createActions({
  [GET_EXERCISE]: () => {},
});

const exerciseReducer = handleActions(
  {
    [GET_EXERCISE]: (state, { payload }) => {
      localStorage.setItem("exerciseData", JSON.stringify(payload));
      return payload;
    },
  },
  initialState
);

export default exerciseReducer;
