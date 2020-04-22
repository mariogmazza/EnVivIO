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
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    props.updaterLineItem({
      commands: ["TOGGLE_DELETE_ROW_MODAL"],
      content: {},
    });
  };

  const handleDeleteRow = () => {
    console.log("Deleting Row");
    if (props.toDeleteRowIndex !== -1) {
      props.updaterLineItem({
        commands: [
          "DELETING_ROW_STAGING",
          "SAVING_ALL_CHANGES_EDITABLE",
          "TOGGLE_DELETE_ROW_MODAL",
        ],
        content: { index: props.toDeleteRowIndex },
      });
    }
  };
  const handleDontDeleteRow = () => {
    console.log("Dont Delete Row ");

    props.updaterLineItem({
      commands: ["TOGGLE_DELETE_ROW_MODAL", "RESET_TODELETE_ROW_INDEX"],
      content: {},
    });
  };

  return (
    <>
      <Modal
        open={props.openModalDeleteRow || false}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Do you want to save the changes?</h2>
          <h3 id="simple-modal-subtitle">This change is permanent.</h3>
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
              onClick={handleDeleteRow}
              className={classes.button}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleDontDeleteRow}
              className={classes.buttonGreen}
              startIcon={<SaveIcon />}
            >
              Don't delete
            </Button>
          </Grid>
          <SimpleModal />
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  const { openModalDeleteRow, toDeleteRowIndex } = state.allPayments;
  return {
    openModalDeleteRow,
    toDeleteRowIndex,
  };
};

export default connect(mapStateToProps, {
  updaterLineItem,
})(SimpleModal);
