import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Title from "./Title";
import { TextField, Grid, Typography } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { green } from "@material-ui/core/colors";
import { connect } from "react-redux";
import {
  addToAllList,
  updaterLineItem,
} from "../../redux/actions/allListActions";
import DatePickerCustom from "../DatePickerCustom";

const styles = (theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
});

class AllPaymentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentLabel: "",
      amount: "",
      paymentMethod: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleEdit = () => {
    console.log("Editing");
    if (this.props.stateChanged) {
      this.props.updaterLineItem({
        commands: ["TOGGLE_MODAL"],
        content: {},
      });
    } else {
      this.props.updaterLineItem({
        commands: ["TOGGLE_EDIT_MODE"],
        content: {},
      });
    }
  };

  handleAddToList = () => {
    const { savedDueDate, addToAllList, allPaymentList } = this.props;
    let { paymentLabel, amount, paymentMethod } = this.state;
    const toDays = new Date();
    let alreadySaved = false;

    allPaymentList.forEach((item) => {
      if (item.paymentLabel && paymentLabel) {
        item.paymentLabel = item.paymentLabel.toLowerCase();
        paymentLabel = paymentLabel.toLowerCase();
        if (item.paymentLabel === paymentLabel) {
          alreadySaved = true;
          return;
        }
      }
    });

    if (alreadySaved) console.log("Payment Label Already exist");

    if (paymentLabel && amount && !alreadySaved) {
      addToAllList({
        commands: ["ADD_TO_ALLPAYMENT_LIST", "ADD_TO_STAGING_LIST"],
        content: {
          paymentLabel: paymentLabel,
          amount: amount,
          paymentMethod: paymentMethod,
          dueDate: savedDueDate ? savedDueDate : toDays,
          isPaid: false,
        },
      });
    }

    this.setState({
      paymentLabel: "",
      amount: "",
      paymentMethod: "",
    });
  };

  render() {
    const { paymentLabel, amount, paymentMethod } = this.state;
    const {
      isStagingListEmpty,
      isEditMode,
      savedDueDate,
      classes,
    } = this.props;

    return (
      <Grid container spacing={2}>
        <Grid
          item
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item container direction="row">
            <Grid item md xs lg>
              <Title>ALL PAYMENTS</Title>
            </Grid>
            <Grid item>
              <Fab
                disabled={isStagingListEmpty}
                color="primary"
                // className={isEditMode ? classes.fabGreen : ""}
                aria-label="edit"
                size="small"
                onClick={this.handleEdit}
              >
                <EditIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" gutterBottom>
              Use this list to "clear your mind" of all your current debts
              whatever they may be list them here, later we'll take care of them
              and set them in their proper categories.
            </Typography>
          </Grid>
          <Grid item container direction="row" spacing={2}>
            <Grid item>
              <TextField
                label="Payment Name"
                value={paymentLabel}
                disabled={isEditMode}
                name="paymentLabel"
                onChange={(e) => this.handleChange(e)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Amount"
                value={amount}
                disabled={isEditMode}
                name="amount"
                onChange={(e) => this.handleChange(e)}
                InputProps={{
                  placeholder: "0.0",
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                type="number"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Payment Method"
                value={paymentMethod}
                disabled={isEditMode}
                name="paymentMethod"
                onChange={(e) => this.handleChange(e)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item>
              <DatePickerCustom
                index={null}
                lineItemSavedDueDate={savedDueDate}
                inputVariantType={"outlined"}
              />
            </Grid>
            <Grid item>
              <Fab
                color="primary"
                size="medium"
                aria-label="add"
                disabled={isEditMode}
                onClick={this.handleAddToList}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    savedDueDate,
    isStagingListEmpty,
    isEditMode,
    stateChanged,
  } = state.allPayments;
  const allPaymentList = JSON.parse(
    JSON.stringify(state.allPayments.allPaymentList)
  );
  return {
    savedDueDate,
    allPaymentList,
    isStagingListEmpty,
    isEditMode,
    stateChanged,
  };
};

const mapActionsToProps = {
  addToAllList,
  updaterLineItem,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(AllPaymentList));
