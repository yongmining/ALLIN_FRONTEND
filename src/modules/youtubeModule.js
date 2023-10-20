import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_YOUTUBE = "youtube/GET_YOUTUBE";

const actions = createActions({
  [GET_YOUTUBE]: () => {},
});

const youtubeReducer = handleActions(
  {
    [GET_YOUTUBE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default youtubeReducer;
