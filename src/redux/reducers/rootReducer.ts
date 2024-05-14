import { combineReducers } from "redux";
import coordReducer from "./coordReducer";
import dataReducer from "./dataReducer";
import topReducer from "./topReducer";

const rootReducer = combineReducers({
  coord: coordReducer,
  data: dataReducer,
  top: topReducer,
});

export default rootReducer;
