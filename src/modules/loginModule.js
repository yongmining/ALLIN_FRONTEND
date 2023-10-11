import { createActions, handleActions } from 'redux-actions';

const initialState = false;

export const IS_LOGIN = 'IS_SIGNUP';

const actions = createActions({
  [IS_LOGIN]: () => {},
});

const loginReducer = handleActions(
  {
    [IS_LOGIN]: () => {
      return !initialState;
    },
  },
  initialState
);

export default loginReducer;
