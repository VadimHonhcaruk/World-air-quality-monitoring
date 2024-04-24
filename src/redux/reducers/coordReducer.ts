import { CoordAction, CoordState } from "./types";

const initialState: CoordState = {
  coord: { lat: 50.450001, lng: 30.523333 },
};

const coordReducer = (
  state = initialState,
  action: CoordAction
): CoordState => {
  switch (action.type) {
    case "SET_COORD":
      return { ...state, coord: action.payload };
    default:
      return state;
  }
};

export default coordReducer;
