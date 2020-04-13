// import { v4 as uuidv4 } from "uuid";

// export const getAllItems = () => ({
//   type: "GET_ALL_ITEMS",
// });

// export const savingAllPayments = (itemList) => ({
//   type: "SAVING_ALL_ITEMS",
//   payload: itemList,
// });

// export const saveAllPaymentListToDB = (itemList) => {
//   return async (dispatch) => {
//     try {
//       // const allWatched = await api.call("get", "watched/user");
//       console.log(JSON.stringify(itemList));
//       dispatch(savingAllPayments(itemList));
//     } catch (err) {
//       const error = err.response.data;
//       // dispatch(addError(error.message));
//       console.log("Saving error ", error);
//     }
//   };
// };

export const addToAllList = (content) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_TO_ALLPAYMENT_LIST",
      payload: content,
    });
    dispatch(enableButton());
    dispatch(restDueDate());
  };
};

export const saveDueDate = (date) => {
  return {
    type: "SAVING_DUE_DATE",
    payload: date,
  };
};

export const restDueDate = () => {
  return {
    type: "RESET_DUE_DATE",
    payload: true,
  };
};

export const editingMode = () => ({
  type: "TOGGLE_EDIT_MODE",
});

export const enableButton = () => ({
  type: "ENABLING_BUTTON",
});

export const disableButton = () => ({
  type: "DISABLING_BUTTON",
});

export const deleteRow = (index) => ({
  type: "DELETING_ROW",
  payload: index,
});
