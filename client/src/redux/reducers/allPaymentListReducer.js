// const initialState = [["", "", ""]];

// const intdata = {
//   allPaymentList: [
//     {
//       paymentLabel: "Car payment",
//       amount: 204.45,
//       paymentMethod: "visa",
//       dueDate: "string of date format",
//       isPaid: false,
//       isSave:true
//     },
//   ],
// };

const initialState = {
  allPaymentList: [],
  dueDate: "",
  resetDueDate: false,
  isEditMode: false,
  isBtnDisable: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_ALLPAYMENT_LIST": {
      const content = { ...action.payload };
      content.isSaved = true;
      return {
        ...state,
        allPaymentList: [...state.allPaymentList, content],
        dueDate: content.dueDate,
      };
    }
    case "TOGGLE_ISPAID": {
      const { index } = action.payload;
      return {
        ...state,
        allPaymentList: [
          ...state.allPaymentList,
          {
            ...state.allPaymentList[index],
            isPaid: !state.allPaymentList[index].isPaid,
          },
        ],
      };
    }
    case "SAVING_DUE_DATE": {
      const date = action.payload;
      const newList = [...state.allPaymentList];
      if (newList.length && !newList[newList.length - 1].isSaved) {
        const itemToUpdate = newList[newList.length - 1];
        itemToUpdate.dueDate = date;
        newList[newList.length - 1] = itemToUpdate;
      }
      return {
        ...state,
        allPaymentList: newList,
        dueDate: date,
      };
    }

    case "RESET_DUE_DATE": {
      return {
        ...state,
        allPaymentList: [...state.allPaymentList],
        dueDate: "",
        resetDueDate: !state.resetDueDate,
      };
    }

    case "TOGGLE_EDIT_MODE": {
      return {
        ...state,
        allPaymentList: [...state.allPaymentList],
        isEditMode: !state.isEditMode,
      };
    }
    case "ENABLING_BUTTON": {
      return {
        ...state,
        isBtnDisable: false,
      };
    }
    case "DISABLING_BUTTON": {
      return {
        ...state,
        isBtnDisable: true,
      };
    }
    case "DELETING_ROW": {
      const toRemove = action.payload;
      return {
        ...state,
        allPaymentList: [...state.allPaymentList].filter((item, ind) => {
          return state.allPaymentList[ind] !== state.allPaymentList[toRemove];
        }),
      };
    }

    default:
      return state;
  }
};

// case "SAVING_ALL_ITEMS": {
// return { allPaymentIds: [], byIds: {}, dueDate: {} };
// }

// export const isEditingReducer = (state = false, action) => {
//   switch (action.type) {
//     case "EDIT_ON_OFF":
//       return action.data;
//     default:
//       return state;
//   }
// };

// case "SAVING_DUE_DATE": {
//   const date = action.payload;
//   return {
//     ...state,
//     allPaymentList: [
//       ...state.allPaymentList,
//       (state.allPaymentList[
//         state.allPaymentList.length - 1
//       ].dueDate = date),
//     ],
//     dueDate: date,
//   };
// }
