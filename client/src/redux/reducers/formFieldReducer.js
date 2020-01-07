const initialState = [["", "", ""]];

export const addFormFieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDING_NEW_FIELD":
      return [...state, ["", ""]];
    case "ADD_INFO_TO_FIELDS":
      return action.data;
    case "DELETING_ROW":
      return action.data;
    case "SAVING_DUE_DATE":
      return action.data;

    default:
      return state;
  }
};

export const isEditingReducer = (state = false, action) => {
  switch (action.type) {
    case "EDIT_ON_OFF":
      return action.data;
    default:
      return state;
  }
};
