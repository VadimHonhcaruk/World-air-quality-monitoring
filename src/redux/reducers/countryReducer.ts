import { SET_COUNTRY_SHORT_NAME } from "../actions/countryActions";

interface CountryState {
  shortName: string | null;
}

const initialState: CountryState = {
  shortName: null,
};

const countryReducer = (state = initialState, action: any): CountryState => {
  switch (action.type) {
    case SET_COUNTRY_SHORT_NAME:
      return {
        ...state,
        shortName: action.payload,
      };
    default:
      return state;
  }
};

export default countryReducer;
