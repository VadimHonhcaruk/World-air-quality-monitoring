export const SET_COUNTRY_SHORT_NAME = "SET_COUNTRY_SHORT_NAME";

export const setCountryShortName = (shortName: string | null) => ({
  type: SET_COUNTRY_SHORT_NAME,
  payload: shortName,
});
