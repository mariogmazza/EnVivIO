import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import IconButton from "@material-ui/core/IconButton";
// import DeleteIcon from "@material-ui/icons/Delete";
// import SaveIcon from "@material-ui/icons/Save";
// import Fab from "@material-ui/core/Fab";
// import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";
// import DatePickerCustom from "../DatePickerCustom";
import { connect } from "react-redux";
import { updaterLineItem } from "../../redux/actions/allListActions";
// import IsPaidCheckBox from "./IsPaidCheckBox";
import isEqual from "lodash/isEqual";
import EditableTable from "./EditableTable";

const styles = (theme) => ({
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
});

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   paymentLabel: " ",
    //   amount: " ",
    //   paymentMethod: "",
    // };
  }

  // handleChange = (e, index) => {
  //   let { name, value } = e.target;

  //   this.props.updaterLineItem({
  //     commands: ["ADD_TO_ISDIRTY_LIST"],
  //     content: { index },
  //   });

  //   this.setState({
  //     [name]: value,
  //   });

  //   if (name === "paymentLabel") {
  //     if (value === "") {
  //       value = null;
  //     }
  //     this.props.updaterLineItem({
  //       commands: ["UPDATE_PAYMENTNAME_LINEITEM_STAGING"],
  //       content: {
  //         paymentname: value,
  //         index,
  //       },
  //     });
  //   }

  //   if (name === "amount") {
  //     if (value === "") {
  //       value = null;
  //     }
  //     this.props.updaterLineItem({
  //       commands: ["UPDATE_AMOUNT_LINEITEM_STAGING"],
  //       content: {
  //         amount: value,
  //         index,
  //       },
  //     });
  //   }

  //   if (name === "paymentMethod") {
  //     if (value === "") {
  //       value = null;
  //     }
  //     this.props.updaterLineItem({
  //       commands: ["UPDATE_PAYMENTMETHOD_LINEITEM_STAGING"],
  //       content: {
  //         paymentMethod: value,
  //         index,
  //       },
  //     });
  //   }
  // };

  // handleDeleteRow = (index) => {
  //   if (this.props.allPaymentList.length - 1 <= 0) {
  //     this.props.updaterLineItem({
  //       commands: ["DISABLING_EDIT_SAVEALL_BUTTON", "TOGGLE_EDIT_MODE"],
  //       content: {},
  //     });
  //   }
  //   this.props.updaterLineItem({
  //     commands: ["DELETING_ROW"],
  //     content: { index },
  //   });
  // };

  // handleSaveLineChanges = (index) => {
  //   this.props.updaterLineItem({
  //     commands: ["MERGING_CHANGES_LINE_SAVED"],
  //     content: { index },
  //   });
  // };

  // componentDidMount() {
  //   this.setState({ allPaymentList: this.props.allPaymentList });
  // }

  // shouldComponentUpdate(nextProps) {
  //   return !isEqual(this.state.allPaymentList, nextProps.allPaymentList);
  // }

  // componentDidUpdate(prevProps) {
  //   if (!isEqual(this.props.allPaymentList, prevProps.allPaymentList)) {
  //     this.setState({ allPaymentList: this.props.allPaymentList });
  //     console.log("papa");
  //   }

  //   if (this.props.isEditMode !== prevProps.isEditMode) {
  //     this.setState({ isEditMode: this.props.isEditMode });
  //     console.log("dddduuu");
  //   }
  // }

  render() {
    const { classes, isEditMode, allPaymentList } = this.props;
    // const { paymentLabel, amount } = this.state;

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Payment Name&nbsp;(required)</TableCell>
              <TableCell align="right">Amount&nbsp;(required)</TableCell>
              <TableCell align="right">Payment Method</TableCell>
              <TableCell align="right">Due Date</TableCell>
              <TableCell align="right">Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isEditMode && (
              // <EditableTable paymentLabel={paymentLabel} amount={amount} />
              <EditableTable />
            )}
            {/* {isEditMode &&
              allPaymentList.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <TextField
                      error={!paymentLabel}
                      label={!paymentLabel ? "Error" : ""}
                      name="paymentLabel"
                      onChange={(e) => this.handleChange(e, index)}
                      defaultValue={row.paymentLabel}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      error={!amount}
                      label={!amount ? "Error" : ""}
                      name="amount"
                      onChange={(e) => this.handleChange(e, index)}
                      defaultValue={row.amount}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      name="paymentMethod"
                      onChange={(e) => this.handleChange(e, index)}
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
                      onClick={() => this.handleDeleteRow(index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>

                  <TableCell align="right">
                    <Fab
                      size="small"
                      aria-label="save"
                      className={
                        isDirtyStaging.length &&
                        isDirtyStaging.findIndex((elem) => elem === index) !==
                          -1
                          ? true
                            ? classes.fabGreen
                            : ""
                          : ""
                      }
                      onClick={() => this.handleSaveLineChanges(index)}
                    >
                      <SaveIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))} */}

            {!isEditMode &&
              allPaymentList.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.paymentLabel}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.paymentMethod}</TableCell>
                  <TableCell align="right">
                    {new Date(row.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    {row.isPaid ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const allPaymentList = JSON.parse(
    JSON.stringify(state.allPayments.allPaymentList)
  );
  const { isEditMode } = state.allPayments;
  return {
    allPaymentList,
    isEditMode,
  };
};

export default connect(mapStateToProps, {
  updaterLineItem,
})(withStyles(styles)(SimpleTable));
