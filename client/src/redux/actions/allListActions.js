function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export const addToAllList = (newItem) => {
  const { commands, content } = newItem;
  return (dispatch) => {
    commands.forEach((command) => {
      dispatch({
        type: command,
        payload: content,
      });
      if (command === "ADD_TO_ALLPAYMENT_LIST") {
        dispatch({
          type: "ENABLING_EDIT_SAVEALL_BUTTON",
        });
        dispatch({
          type: "RESET_DUE_DATE",
        });
      }
    });
  };
};

export const updaterLineItem = (newObj) => {
  const commands = [...newObj.commands];
  const content = JSON.parse(JSON.stringify(newObj.content));

  return (dispatch) => {
    if (isEmpty(content)) {
      commands.forEach((command) => {
        dispatch({
          type: command,
        });
      });
    } else {
      commands.forEach((command) => {
        dispatch({
          type: command,
          payload: content,
        });
      });
    }
  };
};

// export const savingDueDate = (newDate) => {
//   return {
//     type: "SAVING_DUE_DATE",
//     payload: newDate,
//   };
// };

// export const restDueDate = () => {
//   return {
//     type: "RESET_DUE_DATE",
//   };
// };

// export const editingMode = () => ({
//   type: "TOGGLE_EDIT_MODE",
// });

// export const enableButton = () => ({
//   type: "ENABLING_BUTTON",
// });

// export const disableButton = () => ({
//   type: "DISABLING_BUTTON",
// });

// export const deleteRow = (index) => ({
//   type: "DELETING_ROW",
//   payload: index,
// });
