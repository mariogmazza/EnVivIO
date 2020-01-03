import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import { TextField, Grid, Divider } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function MustList() {
  const classes = useStyles();

  const [addedFieldArr, setAddedFieldArr] = React.useState([[]]);

  const handleChange = (e, index, label) => {
    const tempArr = [...addedFieldArr];
    if (label === "must-label") {
      tempArr[index][0] = e.target.value;
    } else {
      tempArr[index][1] = e.target.value;
    }
    setAddedFieldArr(tempArr);
  };

  const addNewField = e => {
    console.log(addedFieldArr);
    setAddedFieldArr([...addedFieldArr, []]);
  };

  const handleEdit = () => {
    console.log(addedFieldArr);
  };

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
            <EditIcon onClick={handleEdit} />
            {/* </Fab> */}
          </Grid>
        </Grid>
        <Grid item sm={12} md={12} lg={12} xl={12}>
          <Title>List Your "Must" Payments</Title>
        </Grid>

        {addedFieldArr.map((val, index) => {
          return (
            <React.Fragment key={index}>
              <Grid item sm={6} md={8} lg={8}>
                <TextField
                  label="Must payment"
                  id="filled-start-adornment"
                  onChange={e => handleChange(e, index, "must-label")}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item sm={4} md={4} lg={4}>
                <TextField
                  label="Amount"
                  id="outlined-adornment-amount"
                  onChange={e => handleChange(e, index, "amount-label")}
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
              <Divider />
            </React.Fragment>
          );
        })}

        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
        >
          <Grid item>
            <Fab color="primary" aria-label="add" onClick={e => addNewField(e)}>
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
