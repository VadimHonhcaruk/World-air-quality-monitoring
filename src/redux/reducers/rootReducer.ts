import { combineReducers } from "redux";
import coordReducer from "./coordReducer";
import dataReducer from "./dataReducer";

const rootReducer = combineReducers({
  coord: coordReducer,
  data: dataReducer,
});

export default rootReducer;
