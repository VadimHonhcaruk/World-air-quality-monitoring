import { combineReducers } from "redux";
import coordReducer from "./coordReducer";

const rootReducer = combineReducers({
  coord: coordReducer,
});

export default rootReducer;
