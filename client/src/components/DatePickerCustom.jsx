import React, { Component, Fragment } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { connect } from "react-redux";
import { updaterLineItem } from "../redux/actions/allListActions";

class CustomDatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localDate: new Date(),
    };
  }

  handleDateChange = (date) => {
    this.setState({ localDate: date });
    const { index } = this.props;

    if (this.props.inputVariantType === "outlined") {
      this.props.updaterLineItem({
        commands: ["SAVING_DUE_DATE"],
        content: { date },
      });
    }

    if (this.props.index !== null) {
      this.props.updaterLineItem({
        commands: ["UPDATE_DUEDATE_LINEITEM_STAGING", "ADD_TO_ISDIRTY_LIST"],
        content: { date, index },
      });
    }
  };

  render() {
    const {
      index,
      inputVariantType,
      isEditMode,
      savedDueDate,
      tempStagingList,
    } = this.props;

    return (
      <Fragment>
        <KeyboardDatePicker
          autoOk
          variant="inline"
          inputVariant={inputVariantType}
          disabled={inputVariantType === "outlined" ? isEditMode : false}
          label={inputVariantType === "outlined" ? "Due Date" : ""}
          format="MM/dd/yyyy"
          value={
            inputVariantType === "outlined"
              ? savedDueDate
              : tempStagingList.length && tempStagingList[index]
              ? tempStagingList[index].dueDate
              : this.state.localDate
          }
          InputAdornmentProps={{ position: "start" }}
          onChange={(date) => this.handleDateChange(date)}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { isEditMode, savedDueDate } = state.allPayments;
  const tempStagingList = [...state.allPayments.tempStagingList];
  return {
    tempStagingList,
    savedDueDate,
    isEditMode,
  };
};

export default connect(mapStateToProps, {
  updaterLineItem,
})(CustomDatePicker);
