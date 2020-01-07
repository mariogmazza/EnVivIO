export const addNewFieldInput = fieldArr => ({
  type: "ADDING_NEW_FIELD",
  data: fieldArr
});

export const savingTaskField = fieldArray => ({
  type: "ADD_INFO_TO_FIELDS",
  data: fieldArray
});

export const editingMode = isEdit => ({
  type: "EDIT_ON_OFF",
  data: isEdit
});

export const deleteRow = newModdedArray => ({
  type: "DELETING_ROW",
  data: newModdedArray
});

export const saveDueDate = dueDateStrg => ({
  type: "SAVING_DUE_DATE",
  data: dueDateStrg
});

// export const savingAllFields = ({ data, value, label, index }) => {
//   const tempArr = [...data];

//   if (label === "must-label") {
//     tempArr[index][0] = value;
//   } else if (label === "amount-label") {
//     tempArr[index][1] = value;
//   } else {
//     tempArr[index][2] = value;
//   }

//   return dispatch => {
//     dispatch(savingTaskField(tempArr));
//   };
// };

// export const deletedWatchedMovie = deletedMsg => ({
//   type: DELETE_MOVIE_FROM_WATCHEDLIST,
//   deletedMsg
// });

// export const getAllWatched = () => {
//   return async dispatch => {
//     try {
//       const allWatched = await api.call("get", "watched/user");
//       dispatch(setAllWatched(allWatched));
//       dispatch(removeError());
//     } catch (err) {
//       const error = err.response.data;
//       dispatch(addError(error.message));
//     }
//   };
// };

// export const saveWatched = data => {
//   return async dispatch => {
//     try {
//       const newWatched = await api.call("post", "watched", data);
//       dispatch(setCurrentWatched(newWatched));
//       dispatch(removeError());
//     } catch (err) {
//       const error = err.response.data;
//       dispatch(addError(error.message));
//     }
//   };
// };

// export const getCurrentWatched = id => {
//   return async dispatch => {
//     try {
//       const watchedMovie = await api.call("get", `watched/${id}`);
//       dispatch(setCurrentWatched(watchedMovie));
//       dispatch(removeError());
//     } catch (err) {
//       const error = err.response.data;
//       dispatch(addError(error.message));
//     }
//   };
// };

// export const deleteWatched = id => {
//   return async dispatch => {
//     try {
//       const deleteAction = await api.call("delete", `watched/${id}`);
//       dispatch(deletedWatchedMovie(deleteAction));
//       dispatch(removeError());
//     } catch (err) {
//       const error = err.response.data;
//       dispatch(addError(error.message));
//     }
//   };
// };
