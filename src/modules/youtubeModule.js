import { createActions, handleActions } from "redux-actions";

const initialState = JSON.parse(localStorage.getItem("youtubeData")) || [];
export const GET_YOUTUBE = "youtube/GET_YOUTUBE";

const actions = createActions({
  [GET_YOUTUBE]: () => {},
});

const youtubeReducer = handleActions(
  {
    [GET_YOUTUBE]: (state, { payload }) => {
      // 새 데이터를 받으면 localStorage에도 저장
      localStorage.setItem("youtubeData", JSON.stringify(payload));
      return payload;
    },
  },
  initialState
);

export default youtubeReducer;
