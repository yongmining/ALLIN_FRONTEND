import { createActions, handleActions } from 'redux-actions';

const initialState = {
  isLiked: false, // "좋아요" 상태를 나타내는 초기값
};

export const POST_YOUTUBENICE = 'choicecontents/POST_YOUTUBENICE';
export const GET_YOUTUBENICE = 'choicecontents/GET_YOUTUBENICE';
export const POST_EXERCISENICE = 'choicecontents/POST_EXERCISENICE';
export const GET_EXERCISENICE = 'choicecontents/GET_EXERCISENICE';
export const POST_MUSICNICE = 'choicecontents/POST_MUSICNICE';
export const GET_MUSICNICE = 'choicecontents/GET_MUSICNICE';

const actions = createActions({
  [POST_YOUTUBENICE]: () => {},
  [GET_YOUTUBENICE]: () => {},
  [POST_EXERCISENICE]: () => {},
  [GET_EXERCISENICE]: () => {},
  [POST_MUSICNICE]: () => {},
  [GET_MUSICNICE]: () => {},
});

const niceReducer = handleActions(
  {
    [POST_YOUTUBENICE]: (state) => {
      return { ...state, isLiked: !state.isLiked }; // 토글 작업을 수행하여 상태를 업데이트
    },
    [GET_YOUTUBENICE]: (state, { payload }) => {
      return payload;
    },
    [POST_EXERCISENICE]: (state) => {
      return { ...state, isLiked: !state.isLiked }; // 토글 작업을 수행하여 상태를 업데이트
    },
    [GET_EXERCISENICE]: (state, { payload }) => {
      return payload;
    },
    [POST_MUSICNICE]: (state) => {
      return { ...state, isLiked: !state.isLiked }; // 토글 작업을 수행하여 상태를 업데이트
    },
    [GET_MUSICNICE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default niceReducer;
