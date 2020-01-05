let initialState = [["", ""]];

const formFieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDING_NEW_FIELD":
      return {
        ...state,
        data: [...action.data, ["", ""]]
      };

    default:
      return state;
  }
};

export default formFieldReducer;
