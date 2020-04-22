import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { green } from "@material-ui/core/colors";
import { updaterLineItem } from "../../redux/actions/allListActions";

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

class SaveTableButton extends Component {
  constructor(props) {
    super(props);
  }

  handleSaveAllChanges = () => {
    if (!this.props.isStagingListEmpty && this.props.stateChanged) {
      this.props.updaterLineItem({
        commands: ["TOGGLE_MODAL"],
        content: {},
      });
    }
  };
  render() {
    const { classes, isStagingListEmpty, stateChanged } = this.props;
    return (
      <>
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={isStagingListEmpty}
            className={stateChanged ? classes.fabGreen : ""}
            startIcon={<SaveIcon />}
            onClick={this.handleSaveAllChanges}
          >
            Save
          </Button>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { isStagingListEmpty, stateChanged } = state.allPayments;
  return {
    isStagingListEmpty,
    stateChanged,
  };
};

const mapActionsToProps = {
  updaterLineItem,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SaveTableButton));
