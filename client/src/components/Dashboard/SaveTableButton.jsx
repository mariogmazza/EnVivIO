import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const styles = (theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
});

class SaveTableButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, isBtnDisable } = this.props;
    return (
      <div>
        <Grid item container justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={isBtnDisable}
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={this.handleSaveForm}
          >
            Save
          </Button>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isBtnDisable } = state.allPayments;
  const allItems = [...state.allPayments.allPaymentList];
  return {
    isBtnDisable,
    allItems,
  };
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SaveTableButton));
