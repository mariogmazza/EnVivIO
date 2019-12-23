import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500
  }
});

function MustItemForm() {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Let's start here! Now list all your **Must** monthly payments!
      </Typography>
    </div>
  );
}

export default MustItemForm;
