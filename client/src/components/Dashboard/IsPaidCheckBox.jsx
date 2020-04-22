import React from "react";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { updaterLineItem } from "../../redux/actions/allListActions";
const useStyles = makeStyles((theme) => ({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
    checked: {},
  },
}));

const IsPaidCheckBox = (props) => {
  const classes = useStyles();
  const handleChange = (e) => {
    props.updaterLineItem({
      commands: ["TOGGLE_ISPAID_STAGING", "ADD_TO_ISDIRTY_LIST"],
      content: { index: props.index },
    });
  };
  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-end">
      <Grid item xs={6}>
        <FormControlLabel
          value="top"
          onChange={(e) => handleChange(e)}
          control={
            <Checkbox
              checked={props.isPaid}
              color="default"
              classes={{
                root: classes.root,
              }}
            />
          }
          label="Yes"
          labelPlacement="top"
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          value="top"
          onChange={(e) => handleChange(e)}
          control={<Checkbox checked={!props.isPaid} />}
          label="No"
          labelPlacement="top"
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  const tempStagingList = [...state.allPayments.tempStagingList];
  const isPaid =
    tempStagingList.length && tempStagingList[ownProps.index]
      ? tempStagingList[ownProps.index].isPaid
      : false;
  return {
    tempStagingList,
    isPaid,
  };
};

const mapDispatchToProps = { updaterLineItem };

export default connect(mapStateToProps, mapDispatchToProps)(IsPaidCheckBox);
