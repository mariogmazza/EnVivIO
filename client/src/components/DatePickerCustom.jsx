import "date-fns";
import React, { useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { saveDueDate } from "../redux/actions/formFieldAction";
import configureStore from "../redux/store/configureStore";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  muiFormControlMarginNormal: {
    marginTop: "0px",
    marginBottom: " 0px"
  }
}));

const store = configureStore();

function MaterialUIPickers(props) {
  const classes = useStyles();

  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const { fieldArrayInfo, index, saveDueDate } = props;

  const onLoadSave = () => {
    const formattedDate = `${new Date().getMonth()}/ ${new Date().getDate() /
      new Date()}}`;

    const tempArr = [...fieldArrayInfo];
    if (fieldArrayInfo) {
      tempArr[index][2] = JSON.stringify(new Date());
    }

    store.dispatch(saveDueDate(tempArr));
  };

  useEffect(() => {
    console.log("mounted");

    onLoadSave(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateChange = (e, dateFormatted) => {
    const tempArr = [...props.fieldArrayInfo];

    if (dateFormatted) {
      tempArr[props.index][2] = dateFormatted;
    }

    setSelectedDate(dateFormatted);
    props.saveDueDate(tempArr);
  };

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.muiFormControlMarginNormal}
          //   disableToolbar
          variant="inline"
          inputVariant="outlined"
          format="MM/dd/yyyy"
          margin="normal"
          //   id="date-picker-inline"
          label="Due date"
          value={selectedDate}
          onChange={(e, dateFormatted) => handleDateChange(e, dateFormatted)}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
}

const mapState = state => ({
  fieldArrayInfo: state.addFormFieldReducer
});

const action = {
  saveDueDate
};

export default connect(mapState, action)(MaterialUIPickers);
