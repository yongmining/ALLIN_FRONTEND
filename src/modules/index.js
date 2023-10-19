import { combineReducers } from "redux";
import modalsReducer from "./modalModule";
import loginReducer from "./loginModule";
import memberReducer from "./memberModule";
import feedbackReducer from "./feedbackModule";
import phraseReducer from "./phraseModule";

const rootReducer = combineReducers({
  modalsReducer,
  loginReducer,
  memberReducer,
  feedbackReducer,
  phraseReducer,
});

export default rootReducer;
