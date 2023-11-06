import { createActions, handleActions } from "redux-actions";

const initialState = JSON.parse(localStorage.getItem("exerciseData")) || [];
export const GET_EXERCISE = "exercise/GET_EXERCISE";
export const GET_GUEST_EXERCISE = "exercise/GET_GUEST_EXERCISE";

const actions = createActions({
  [GET_EXERCISE]: () => {},
  [GET_GUEST_EXERCISE]: () => {},
});

const exerciseReducer = handleActions(
  {
    [GET_EXERCISE]: (state, { payload }) => {
      localStorage.setItem("exerciseData", JSON.stringify(payload));
      return payload;
    },
    [GET_GUEST_EXERCISE]: (state, { payload }) => {
      localStorage.setItem("guestExerciseData", JSON.stringify(payload));
      return payload;
    },
  },
  initialState
);

export default exerciseReducer;
