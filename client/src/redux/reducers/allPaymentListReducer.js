// const intdata = {
//   allPaymentList: [
//     {
//       paymentLabel: "Car payment",
//       amount: 204.45,
//       paymentMethod: "visa",
//       dueDate: "string of date format",
//       isPaid: false,
//     },
//   ],
// };

const initialState = {
  allPaymentList: [],
  tempStagingList: [],
  isDirtyStaging: [],
  savedDueDate: new Date(),
  isEditMode: false,
  isStagingListEmpty: true,
  openModal: false,
  stateChanged: false,
  toDeleteRowIndex: -1,
  openModalDeleteRow: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_ALLPAYMENT_LIST": {
      const content = JSON.parse(JSON.stringify(action.payload));
      const allPaymentList = JSON.parse(JSON.stringify(state.allPaymentList));
      const tempStagingList = JSON.parse(JSON.stringify(state.tempStagingList));
      allPaymentList.push(content);
      return {
        ...state,
        isDirtyStaging: [...state.isDirtyStaging],
        tempStagingList: tempStagingList,
        allPaymentList: allPaymentList,
      };
    }
    case "UPDATE_PAYMENTNAME_LINEITEM": {
      const { paymentname, index } = action.payload;
      const newList = JSON.parse(JSON.stringify(state.allPaymentList));
      if (newList.length) {
        const itemToUpdate = newList[index];
        itemToUpdate.paymentLabel = paymentname;
        newList[index] = itemToUpdate;
      }
      return {
        ...state,
        isDirtyStaging: [...state.isDirtyStaging],
        tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        allPaymentList: newList,
      };
    }
    case "UPDATE_PAYMENTMETHOD_LINEITEM": {
      const { paymentMethod, index } = action.payload;
      const newList = JSON.parse(JSON.stringify(state.allPaymentList));
      if (newList.length) {
        const itemToUpdate = newList[index];
        itemToUpdate.paymentMethod = paymentMethod;
        newList[index] = itemToUpdate;
      }
      return {
        ...state,
        isDirtyStaging: [...state.isDirtyStaging],
        tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        allPaymentList: newList,
      };
    }
    case "UPDATE_AMOUNT_LINEITEM": {
      const { amount, index } = action.payload;
      const newList = JSON.parse(JSON.stringify(state.allPaymentList));
      if (newList.length) {
        const itemToUpdate = newList[index];
        itemToUpdate.amount = amount;
        newList[index] = itemToUpdate;
      }
      return {
        ...state,
        isDirtyStaging: [...state.isDirtyStaging],
        tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        allPaymentList: newList,
      };
    }
    case "UPDATE_DUEDATE_LINEITEM": {
      const { index } = action.payload;
      const date = JSON.parse(JSON.stringify(action.payload.date));
      const newList = JSON.parse(JSON.stringify(state.allPaymentList));
      if (newList.length) {
        const itemToUpdate = newList[index];
        itemToUpdate.dueDate = date;
        newList[index] = itemToUpdate;
      }
      return {
        ...state,
        isDirtyStaging: [...state.isDirtyStaging],
        tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        allPaymentList: newList,
      };
    }
    case "TOGGLE_ISPAID": {
      const { index } = action.payload;
      const newList = JSON.parse(JSON.stringify(state.allPaymentList));
      if (newList.length) {
        const itemToUpdate = newList[index];
        itemToUpdate.isPaid = !itemToUpdate.isPaid;
        newList[index] = itemToUpdate;
      }
      return {
        ...state,
        isDirtyStaging: [...state.isDirtyStaging],
        tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        allPaymentList: newList,
      };
    }
    case "SAVING_ALL_CHANGES_EDITABLE": {
      return {
        ...state,
        isDirtyStaging: [],
        tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        allPaymentList: JSON.parse(JSON.stringify(state.tempStagingList)),
        stateChanged: false,
        isEditMode: false,
      };
    }
    case "DISCARD_ALL_CHANGES_EDITABLE": {
      return {
        ...state,
        isDirtyStaging: [],
        tempStagingList: JSON.parse(JSON.stringify(state.allPaymentList)),
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        stateChanged: false,
        isEditMode: false,
      };
    }

    // ----------------STAGING------------

    case "ADD_TO_ISDIRTY_LIST": {
      const { index } = action.payload;
      const isDirtyStaging = [...state.isDirtyStaging];
      const allPaymentList = JSON.parse(JSON.stringify(state.allPaymentList));
      const tempStagingList = JSON.parse(JSON.stringify(state.tempStagingList));
      const isInArray = isDirtyStaging.findIndex((elem) => elem === index);

      if (isInArray === -1) {
        return {
          ...state,
          allPaymentList: allPaymentList,
          tempStagingList: tempStagingList,
          isDirtyStaging: [...isDirtyStaging, index],
          stateChanged: true,
        };
      } else {
        return {
          ...state,
          isDirtyStaging: [...state.isDirtyStaging],
          allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
          tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        };
      }
    }
    // I might not need this since I will use only the save button at the end of the editable list
    case "REMOVE_FROM_ISDIRTY_LIST": {
      const { index } = action.payload;
      const isDirtyStaging = [...state.isDirtyStaging];
      const isInArray = isDirtyStaging.findIndex((elem) => elem === index);

      if (isInArray === -1) {
        return {
          ...state,
          isDirtyStaging: isDirtyStaging,
          allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
          tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        };
      } else {
        const removed = isDirtyStaging.splice(index, 1);
        return {
          ...state,
          isDirtyStaging: isDirtyStaging,
          allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
          tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        };
      }
    }
    case "ADD_TO_STAGING_LIST": {
      const content = JSON.parse(JSON.stringify(action.payload));
      const tempStagingList = JSON.parse(JSON.stringify(state.tempStagingList));
      tempStagingList.push(content);
      return {
        ...state,
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        isDirtyStaging: [...state.isDirtyStaging],
        tempStagingList: tempStagingList,
        isStagingListEmpty: false,
      };
    }
    case "DELETING_ROW_STAGING": {
      const { index } = action.payload;
      const tempStagingList = JSON.parse(JSON.stringify(state.tempStagingList));
      const removed = tempStagingList.splice(index, 1);

      return {
        ...state,
        allPaymentList: tempStagingList.length
          ? JSON.parse(JSON.stringify(state.allPaymentList))
          : [],
        isDirtyStaging: tempStagingList.length ? [...state.isDirtyStaging] : [],
        tempStagingList: tempStagingList,
        stateChanged: tempStagingList.length ? true : false,
        isStagingListEmpty: tempStagingList.length ? false : true,
        isEditMode: tempStagingList.length ? state.isEditMode : false,
      };
    }
    case "UPDATE_PAYMENTNAME_LINEITEM_STAGING": {
      const { paymentname, index } = action.payload;
      const newList = JSON.parse(JSON.stringify(state.tempStagingList));
      if (newList.length) {
        const itemToUpdate = newList[index];
        itemToUpdate.paymentLabel = paymentname;
        newList[index] = itemToUpdate;
      }
      return {
        ...state,
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        isDirtyStaging: [...state.isDirtyStaging],
        tempStagingList: newList,
        stateChanged: true,
      };
    }
    case "UPDATE_PAYMENTMETHOD_LINEITEM_STAGING": {
      const { paymentMethod, index } = action.payload;
      const newList = JSON.parse(JSON.stringify(state.tempStagingList));
      if (newList.length) {
        const itemToUpdate = newList[index];
        itemToUpdate.paymentMethod = paymentMethod;
        newList[index] = itemToUpdate;
      }
      return {
        ...state,
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        isDirtyStaging: [...state.isDirtyStaging],
        tempStagingList: newList,
        stateChanged: true,
      };
    }
    case "UPDATE_AMOUNT_LINEITEM_STAGING": {
      const { amount, index } = action.payload;
      const newList = JSON.parse(JSON.stringify(state.tempStagingList));
      if (newList.length) {
        const itemToUpdate = newList[index];
        itemToUpdate.amount = amount;
        newList[index] = itemToUpdate;
      }
      return {
        ...state,
        isDirtyStaging: [...state.isDirtyStaging],
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        tempStagingList: newList,
        stateChanged: true,
      };
    }
    case "UPDATE_DUEDATE_LINEITEM_STAGING": {
      const { index } = action.payload;
      const date = JSON.parse(JSON.stringify(action.payload.date));
      const newList = JSON.parse(JSON.stringify(state.tempStagingList));
      if (newList.length) {
        const itemToUpdate = newList[index];
        itemToUpdate.dueDate = date;
        newList[index] = itemToUpdate;
      }
      return {
        ...state,
        isDirtyStaging: [...state.isDirtyStaging],
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        tempStagingList: newList,
        stateChanged: true,
      };
    }
    case "TOGGLE_ISPAID_STAGING": {
      const { index } = action.payload;
      const newStagingList = JSON.parse(JSON.stringify(state.tempStagingList));
      if (newStagingList.length) {
        const itemToUpdate = newStagingList[index];
        itemToUpdate.isPaid = !itemToUpdate.isPaid;
        newStagingList[index] = itemToUpdate;
      }
      return {
        ...state,
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        isDirtyStaging: [...state.isDirtyStaging],
        tempStagingList: newStagingList,
        stateChanged: true,
      };
    }

    case "SET_TODELETE_ROW_INDEX": {
      const { index } = action.payload;
      return {
        ...state,
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        isDirtyStaging: [...state.isDirtyStaging],
        tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        toDeleteRowIndex: index,
      };
    }

    case "RESET_TODELETE_ROW_INDEX": {
      return {
        ...state,
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        isDirtyStaging: [...state.isDirtyStaging],
        tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        toDeleteRowIndex: -1,
        stateChanged: false,
      };
    }
    case "TOGGLE_DELETE_ROW_MODAL": {
      return {
        ...state,
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        isDirtyStaging: [...state.isDirtyStaging],
        openModalDeleteRow: !state.openModalDeleteRow,
      };
    }
    // ----------------END STAGING--------------------------
    case "SAVING_DUE_DATE": {
      const date = JSON.parse(JSON.stringify(action.payload.date));
      return {
        ...state,
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        isDirtyStaging: [...state.isDirtyStaging],
        tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        savedDueDate: date,
      };
    }
    case "RESET_DUE_DATE": {
      return {
        ...state,
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        isDirtyStaging: [...state.isDirtyStaging],
        savedDueDate: new Date(),
      };
    }
    case "TOGGLE_EDIT_MODE": {
      return {
        ...state,
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        isDirtyStaging: [...state.isDirtyStaging],
        isEditMode: !state.isEditMode,
      };
    }
    case "TOGGLE_MODAL": {
      return {
        ...state,
        allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
        tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
        isDirtyStaging: [...state.isDirtyStaging],
        openModal: !state.openModal,
      };
    }
    // case "ENABLING_EDIT_SAVEALL_BUTTON": {
    //   return {
    //     ...state,
    //     allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
    //     tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
    //     isDirtyStaging: [...state.isDirtyStaging],
    //     isStagingListEmpty: false,
    //   };
    // }
    // case "DISABLING_EDIT_SAVEALL_BUTTON": {
    //   return {
    //     ...state,
    //     allPaymentList: JSON.parse(JSON.stringify(state.allPaymentList)),
    //     tempStagingList: JSON.parse(JSON.stringify(state.tempStagingList)),
    //     isDirtyStaging: [...state.isDirtyStaging],
    //     isStagingListEmpty: true,
    //   };
    // }
    default:
      return state;
  }
};
