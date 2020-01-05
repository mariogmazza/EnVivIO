export const addNewField = fieldArr => ({
  type: "ADDING_NEW_FIELD",
  data: fieldArr
});

export const handleChange = (e, index) => {
  const tempArr = [...this.state.addedFieldArr];
  if (e.target.name === "must-label") {
    tempArr[index][0] = e.target.value;
  } else {
    tempArr[index][1] = e.target.value;
  }
  this.setState({ addedFieldArr: tempArr });
};

// export const setAllWatched = watched => ({
//   type: SET_ALL_WATCHED_MOVIES,
//   data: watched
// });

// export const setCurrentWatched = watched => ({
//   type: SET_CURRENT_WATCHED_MOVIE,
//   data: watched
// });

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
