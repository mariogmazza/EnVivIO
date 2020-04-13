import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import { connect } from "react-redux";
import {
  deleteRow,
  editingMode,
  disableButton,
} from "../../redux/actions/allListActions";

const styles = (theme) => ({
  table: {
    minWidth: 650,
  },
});

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleDeleteRow = (index) => {
    console.log("Deleting row ", index);
    if (this.props.allItems.length - 1 <= 0) {
      this.props.disableButton();
      this.props.editingMode();
    }
    this.props.deleteRow(index);
  };

  render() {
    const { classes, allItems, isEditMode } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Payment Name&nbsp;(required)</TableCell>
              <TableCell align="right">Amount&nbsp;(required)</TableCell>
              <TableCell align="right">Payment Method</TableCell>
              <TableCell align="right">Due Date</TableCell>
              <TableCell align="right">Paid&nbsp;(Yes/No)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allItems.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.paymentLabel}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.paymentMethod}</TableCell>
                <TableCell align="right">
                  {new Date(row.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">{row.isPaid ? "Yes" : "No"}</TableCell>

                {isEditMode && (
                  <React.Fragment>
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
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={this.handleSaveForm}
                      >
                        Save
                      </Button>
                    </TableCell>
                  </React.Fragment>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const allPaymentList = [...state.allPayments.allPaymentList];
  const { isEditMode } = state.allPayments;
  console.log("Table", state.allPayments.allPaymentList);
  return {
    allItems: allPaymentList,
    isEditMode: isEditMode,
  };
};

export default connect(mapStateToProps, {
  editingMode,
  deleteRow,
  disableButton,
})(withStyles(styles)(SimpleTable));
