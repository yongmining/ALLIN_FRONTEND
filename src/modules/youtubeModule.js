import { createActions, handleActions } from "redux-actions";

const initialState = JSON.parse(localStorage.getItem("youtubeData")) || [];
export const GET_YOUTUBE = "youtube/GET_YOUTUBE";
export const GET_GUEST_YOUTUBE = "youtube/GET_GUEST_YOUTUBE";

const actions = createActions({
  [GET_YOUTUBE]: () => {},
  [GET_GUEST_YOUTUBE]: () => {},
});

const youtubeReducer = handleActions(
  {
    [GET_YOUTUBE]: (state, { payload }) => {
      // 새 데이터를 받으면 localStorage에도 저장
      localStorage.setItem("youtubeData", JSON.stringify(payload));
      return payload;
    },
    [GET_GUEST_YOUTUBE]: (state, { payload }) => {
      // 새 데이터를 받으면 localStorage에도 저장
      localStorage.setItem("guestYoutubeData", JSON.stringify(payload));
      return payload;
    },
  },
  initialState
);

export default youtubeReducer;
