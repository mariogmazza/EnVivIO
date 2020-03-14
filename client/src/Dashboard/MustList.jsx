import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Title from "./Title";
import { TextField, Grid, Button, Typography } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { connect } from "react-redux";
import {
  addNewFieldInput,
  savingTaskField,
  editingMode,
  deleteRow
} from "../redux/actions/formFieldAction";
import DatePickerCustom from "../components/DatePickerCustom";

const styles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  margin: {
    margin: theme.spacing(1)
  }
});

class MustList extends React.Component {
  state = {
    addedFieldArr: this.props.fieldArrayInfo,
    isEditMode: false
  };

  handleNewField() {
    this.props.addNewFieldInput(this.state.addedFieldArr);
  }

  handleChange = (e, index) => {
    const tempArr = [...this.state.addedFieldArr];
    if (e.target.name === "must-label") {
      tempArr[index][0] = e.target.value;
    } else if (e.target.name === "amount-label") {
      tempArr[index][1] = e.target.value;
    }
    // } else {
    // 	tempArr[index][2] =
    // }

    this.setState({ addedFieldArr: tempArr }, () => {
      this.props.savingTaskField(tempArr);
    });
  };

  handleEdit = () => {
    this.setState({ isEditMode: !this.state.isEditMode }, () => {
      this.props.editingMode(this.state.isEditMode);
    });
  };

  handleDeleteRow = (e, index) => {
    const filtered = this.state.addedFieldArr.filter((item, ind) => {
      return ind !== index;
    });

    this.setState({ addedFieldArr: filtered }, () => {
      this.props.deleteRow(filtered);
    });
  };

  handleSaveForm = () => {
    console.log(this.state.addedFieldArr);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.fieldArrayInfo !== prevProps.fieldArrayInfo) {
      this.setState({ addedFieldArr: [...this.props.fieldArrayInfo] });
    }
  }

  render() {
    const { classes } = this.props;
    const { addedFieldArr, isEditMode } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-start"
          >
            <Grid item>
              {/* <Fab aria-label="edit" onClick={handleEdit}> */}
              <EditIcon onClick={this.handleEdit} />
              {/* </Fab> */}
            </Grid>
          </Grid>
          <Grid item sm={12} md={12} lg={12} xl={12}>
            <Title>List Your all of your debts</Title>
            <Typography variant="subtitle1" gutterBottom>
              Use this list to "clear your mind" of all of your current debts
              whatever they may be list them here, later we'll take care of them
              and set them in thier proper category.
            </Typography>
          </Grid>

          {addedFieldArr.map((val, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item sm={6} md={6} lg={4}>
                  <TextField
                    label="Must payment"
                    value={addedFieldArr[index][0]}
                    name="must-label"
                    onChange={e => this.handleChange(e, index)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={4} md={3} lg={2}>
                  <TextField
                    label="Amount"
                    value={addedFieldArr[index][1]}
                    name="amount-label"
                    onChange={e => this.handleChange(e, index)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      )
                    }}
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item lg={4}>
                  <DatePickerCustom index={index} />
                </Grid>
                {isEditMode && (
                  <Grid item sm={1} md={1} lg={1}>
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={e => this.handleDeleteRow(e, index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                )}
              </React.Fragment>
            );
          })}

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Grid item md={10}>
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
            </Grid>

            <Grid item md={2}>
              <Fab
                color="primary"
                size="medium"
                aria-label="add"
                onClick={() => this.handleNewField()}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapState = state => ({
  fieldArrayInfo: state.addFormFieldReducer,
  isEditMode: state.isEditingReducer
});

const actions = {
  addNewFieldInput,
  savingTaskField,
  editingMode,
  deleteRow
};

export default connect(mapState, actions)(withStyles(styles)(MustList));
