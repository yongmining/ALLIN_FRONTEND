import { createActions, handleActions } from "redux-actions";

const initialState = JSON.parse(localStorage.getItem("musicData")) || [];
export const GET_MUSIC = "music/GET_MUSIC";

const actions = createActions({
  [GET_MUSIC]: () => {},
});

const musicReducer = handleActions(
  {
    [GET_MUSIC]: (state, { payload }) => {
      localStorage.setItem("musicData", JSON.stringify(payload));
      return payload;
    },
  },
  initialState
);

export default musicReducer;
