import { createActions, handleActions } from "redux-actions";

const initialState = [];
export const GET_PHRASE = "phrase/GET_PHRASE";
export const GET_EMOTIONPHRASE = "phrase/GET_EMOTIONPHRASE";

const actions = createActions({
  [GET_PHRASE]: () => {},
  [GET_EMOTIONPHRASE]: () => {}, // GET_EMOTIONPHRASE 액션 생성자 추가
});

const phraseReducer = handleActions(
  {
    [GET_PHRASE]: (state, { payload }) => {
      return { ...state, ...payload };
    },
    [GET_EMOTIONPHRASE]: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
  initialState
);

export default phraseReducer;
