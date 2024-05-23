import { combineReducers } from "redux";
import coordReducer from "./coordReducer";
import dataReducer from "./dataReducer";
import topReducer from "./topReducer";
import countryReducer from "./countryReducer";

const rootReducer = combineReducers({
  coord: coordReducer,
  data: dataReducer,
  top: topReducer,
  country: countryReducer,
});

export default rootReducer;
