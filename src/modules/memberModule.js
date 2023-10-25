import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [
  {
    memberNickname: '',
  },
];

/* 액션 */
export const GET_MEMBER = 'member/GET_MEMBER';
export const POST_LOGIN = 'member/POST_LOGIN';
export const POST_REGISTER = 'member/POST_REGISTER';
export const PUT_MEMBER = 'member/PUT_MEMBER';
export const DELETE_MEMBER = 'member/DELETE_MEMBER';

const actions = createActions({
  [GET_MEMBER]: () => {},
  [DELETE_MEMBER]: () => {},
  [PUT_MEMBER]: () => {},
  [POST_LOGIN]: () => {},
  [POST_REGISTER]: () => {},
});

/* 리듀서 */
const memberReducer = handleActions(
  {
    [GET_MEMBER]: (state, { payload }) => {
      return payload;
    },
    [PUT_MEMBER]: (state, { payload }) => {
      return payload;
    },
    [DELETE_MEMBER]: (state, { payload }) => {
      return payload;
    },
    [POST_LOGIN]: (state, { payload: { result } }) => {
      return {
        ...state,
        postLoginState: result,
      };
    },
    [POST_REGISTER]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default memberReducer;
