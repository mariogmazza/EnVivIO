import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { green } from "@material-ui/core/colors";
import IsPaidCheckBox from "./IsPaidCheckBox";
import DatePickerCustom from "../DatePickerCustom";
import TextField from "@material-ui/core/TextField";
import { updaterLineItem } from "../../redux/actions/allListActions";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
}));

export const EditableTable = ({
  tempStagingList,
  isDirtyStaging,
  ...props
}) => {
  const classes = useStyles();
  const [paymentLabel, setPaymentLabel] = useState({ index: null, value: "" });
  const [amount, setAmount] = useState({ index: null, value: "" });
  const [paymentMethod, setPaymentMethod] = useState({
    index: null,
    value: "",
  });

  const handleChange = (e, index) => {
    let { name, value } = e.target;
    // const { updaterLineItem } = props;
    props.updaterLineItem({
      commands: ["ADD_TO_ISDIRTY_LIST"],
      content: { index },
    });

    if (name === "paymentLabel") {
      setPaymentLabel({ index, value });
      if (value === "") {
        value = null;
      }
      props.updaterLineItem({
        commands: ["UPDATE_PAYMENTNAME_LINEITEM_STAGING"],
        content: {
          paymentname: value,
          index,
        },
      });
    }

    if (name === "amount") {
      setAmount({ index, value });
      if (value === "") {
        value = null;
      }
      props.updaterLineItem({
        commands: ["UPDATE_AMOUNT_LINEITEM_STAGING"],
        content: {
          amount: value,
          index,
        },
      });
    }

    if (name === "paymentMethod") {
      setPaymentMethod({ index, value });
      if (value === "") {
        value = null;
      }
      props.updaterLineItem({
        commands: ["UPDATE_PAYMENTMETHOD_LINEITEM_STAGING"],
        content: {
          paymentMethod: value,
          index,
        },
      });
    }
  };

  const handleDeleteRow = (index) => {
    console.log("Deleterow edittabless");
    props.updaterLineItem({
      commands: ["SET_TODELETE_ROW_INDEX", "TOGGLE_DELETE_ROW_MODAL"],
      content: { index },
    });
  };

  return (
    <>
      {tempStagingList &&
        tempStagingList.map((row, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              <TextField
                error={!paymentLabel.value && paymentLabel.index === index}
                label={
                  !paymentLabel.value && paymentLabel.index === index
                    ? "Required"
                    : ""
                }
                name="paymentLabel"
                onChange={(e) => handleChange(e, index)}
                defaultValue={row.paymentLabel}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                error={!amount.value && amount.index === index}
                label={
                  !amount.value && amount.index === index ? "Required" : ""
                }
                name="amount"
                onChange={(e) => handleChange(e, index)}
                defaultValue={row.amount}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                name="paymentMethod"
                onChange={(e) => handleChange(e, index)}
                defaultValue={row.paymentMethod}
              />
            </TableCell>
            <TableCell align="right">
              <DatePickerCustom
                index={index}
                lineItemSavedDueDate={row.dueDate}
                inputVariantType={"standard"}
              />
            </TableCell>
            <TableCell align="right">
              <IsPaidCheckBox index={index} />
            </TableCell>
            <TableCell align="right">
              <IconButton
                aria-label="delete"
                className={classes.margin}
                onClick={() => handleDeleteRow(index)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </TableCell>

            {/* <TableCell align="right">
              <Fab
                size="small"
                aria-label="save"
                className={
                  isDirtyStaging.length &&
                  isDirtyStaging.findIndex((elem) => elem === index) !== -1
                    ? true
                      ? classes.fabGreen
                      : ""
                    : ""
                }
                onClick={() => handleSaveLineChanges(index)}
              >
                <SaveIcon />
              </Fab>
            </TableCell> */}
          </TableRow>
        ))}
    </>
  );
};

const mapStateToProps = (state) => {
  const tempStagingList = JSON.parse(
    JSON.stringify(state.allPayments.tempStagingList)
  );
  const isDirtyStaging = [...state.allPayments.isDirtyStaging];
  const { isEditMode } = state.allPayments;

  return {
    tempStagingList,
    isEditMode,
    isDirtyStaging,
  };
};

const mapActionToProps = {
  updaterLineItem,
};

export default connect(mapStateToProps, mapActionToProps)(EditableTable);
