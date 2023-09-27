import { createActions, handleActions } from 'redux-actions';

const initialState = {
  unloginModal: false,
};

export const OPEN_MODAL = 'modal/OPEN_MODAL';
export const CLOSE_MODAL = 'modal/CLOSE_MODAL';

const actions = createActions({
  [OPEN_MODAL]: () => {},
  [CLOSE_MODAL]: () => {},
});

const modalsReducer = handleActions(
  {
    [OPEN_MODAL]: (state, { payload }) => ({ ...state, [payload]: true }),
    [CLOSE_MODAL]: (state, { payload }) => ({ ...initialState }),
  },
  initialState
);

export default modalsReducer;
