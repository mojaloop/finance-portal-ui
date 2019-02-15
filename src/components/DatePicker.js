
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// We deliberately lose some information (hh:mm:ss.ms) here. We're just not interested in sub-day
// granularity.
const dateToStr = dt => {
  const pad = (s => s.length > 1 ? s : '0' + s);
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate().toString())}`;
};


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});


// defDate should be a string in the format
const DatePicker = withStyles(styles)(function(props) {
  const { defDate, desc, classes, selectDate } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label={desc}
        type="date"
        defaultValue={defDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={ev => selectDate(ev.target.value)}
      />
    </form>
  )
})

export {
    DatePicker,
    dateToStr
};
