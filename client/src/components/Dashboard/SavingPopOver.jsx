import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { connect } from "react-redux";
import { updaterLineItem } from "../../redux/actions/allListActions";
import { green } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  buttonGreen: {
    backgroundColor: green[500],
    color: "primary",
    marginLeft: theme.spacing(1),
  },
}));

function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  //   const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    props.updaterLineItem({
      commands: ["TOGGLE_MODAL"],
      content: {},
    });
  };

  const handleDiscardAll = () => {
    console.log("Discard All");
    props.updaterLineItem({
      commands: [
        "TOGGLE_MODAL",
        "TOGGLE_EDIT_MODE",
        "DISCARD_ALL_CHANGES_EDITABLE",
      ],
      content: {},
    });
  };
  const handleSaveAll = () => {
    console.log("Saving All");

    props.updaterLineItem({
      commands: [
        "TOGGLE_MODAL",
        "TOGGLE_EDIT_MODE",
        "SAVING_ALL_CHANGES_EDITABLE",
      ],
      content: {},
    });
  };

  return (
    <>
      <Modal
        open={props.openModal || false}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Do you want to save the changes?</h2>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleDiscardAll}
              className={classes.button}
              startIcon={<DeleteIcon />}
            >
              Discard
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSaveAll}
              className={classes.buttonGreen}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
          <SimpleModal />
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  const { openModal } = state.allPayments;
  return {
    openModal,
  };
};

export default connect(mapStateToProps, {
  updaterLineItem,
})(SimpleModal);
