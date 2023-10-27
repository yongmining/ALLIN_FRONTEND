import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [
  {
    // guestNickname: '',
  },
];

/* 액션 */
export const GET_GUEST = 'guest/GET_GUEST';
export const POST_GUESTLOGIN = 'guest/POST_GUESTLOGIN';
export const PUT_GUEST = 'guest/PUT_GUEST';
export const DELETE_GUEST = 'guest/DELETE_GUEST';

const actions = createActions({
  [GET_GUEST]: () => {},
  [DELETE_GUEST]: () => {},
  [PUT_GUEST]: () => {},
  [POST_GUESTLOGIN]: () => {},
});

/* 리듀서 */
const guestReducer = handleActions(
  {
    [GET_GUEST]: (state, { payload }) => {
      return payload;
    },
    [PUT_GUEST]: (state, { payload }) => {
      return payload;
    },
    [DELETE_GUEST]: (state, { payload }) => {
      return payload;
    },
    [POST_GUESTLOGIN]: (state, { payload: { result } }) => {
      return {
        ...state,
        postLoginState: result,
      };
    },
  },
  initialState
);

export default guestReducer;
