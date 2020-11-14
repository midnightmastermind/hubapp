import { combineReducers } from "redux";
import authReducer from "./authReducer";
import blockReducer from "./blockReducer";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";
export default combineReducers({
  auth: authReducer,
  blocks: blockReducer,
  events: eventReducer,
  errors: errorReducer
});
