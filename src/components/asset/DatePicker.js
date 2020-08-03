import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize:20
  },
  textField: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    width:250
  },
}));

export default function DateAndTimePickers() {
  const classes = useStyles();

  return (
    <h1>
    gd
</h1>
    // <form className={classes.container} noValidate>
    //   <TextField
    //     id="datetime-local"
    //     type="datetime-local"
    //     defaultValue="2017-05-24T10:30"
    //     className={classes.textField}
    //     InputLabelProps={{
    //       shrink: true,
    //     }}
    //   />
    // </form>
  );
}
