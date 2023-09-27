import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import { legacy_createStore as createStore } from 'redux';

import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default store;
