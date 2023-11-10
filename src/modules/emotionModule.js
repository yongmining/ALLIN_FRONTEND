import { createActions, handleActions } from 'redux-actions';

const initialState = [];
export const GET_MEMBER_EMOTION = 'emotion/GET_MEMBER_EMOTION';

const actions = createActions({
  [GET_MEMBER_EMOTION]: () => {},
});

const memberEmotionReducer = handleActions(
  {
    [GET_MEMBER_EMOTION]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default memberEmotionReducer;
