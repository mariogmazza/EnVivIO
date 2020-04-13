import React, { Fragment } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { connect } from "react-redux";
import { saveDueDate } from "../redux/actions/allListActions";

class CustomDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
    };
  }

  handleDateChange(date) {
    this.setState({ selectedDate: date });
    this.props.saveDueDate(date);
  }

  componentDidUpdate(prevProps) {
    if (this.props.resetDueDate !== prevProps.resetDueDate) {
      this.setState({ selectedDate: new Date() });
    }
  }

  render() {
    const { selectedDate } = this.state;
    return (
      <Fragment>
        <KeyboardDatePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          label="Due Date"
          format="MM/dd/yyyy"
          value={selectedDate}
          InputAdornmentProps={{ position: "start" }}
          onChange={(date) => this.handleDateChange(date)}
        />
      </Fragment>
    );
  }
}

// const mapStateToProps = (state) => {
//   const { byIds, allPaymentIds } = state.allPayments || {};
//   const allPayments =
//     allPaymentIds && state.allPayments.allPaymentIds.length
//       ? allPaymentIds.map((id) => (byIds ? { ...byIds[id], id } : null))
//       : null;
//   return { allPayments };
// };

const mapStateToProps = (state) => {
  const { resetDueDate } = state.allPayments;
  return {
    resetDueDate: resetDueDate,
  };
};

export default connect(mapStateToProps, { saveDueDate })(CustomDatePicker);
