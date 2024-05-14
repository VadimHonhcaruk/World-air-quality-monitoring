const initialState = {
  data: null,
};

const topReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_TOP":
      return {
        ...state,
        top: action.payload,
      };
    default:
      return state;
  }
};

export default topReducer;
