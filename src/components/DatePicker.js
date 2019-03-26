
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { truncateDate } from '../utils';

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
  grid: {
    width: '60%',
  },
});


function DatePickerImpl(props) {
  const { defDate, desc, classes, onChange } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label={desc}
        type="date"
        defaultValue={dateToStr(defDate)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={ev => onChange(ev.target.value)}
      />
    </form>
  )
}

DatePickerImpl.propTypes = {
  classes: PropTypes.object.isRequired
};

// defDate should be a string in the format
const DatePicker = withStyles(styles)(DatePickerImpl);

function DateRangePickerImpl(props) {
  const {
    classes,
    onChange = () => {},
    onStartChange = () => {},
    onEndChange = () => {},
    defStartDate = new Date(),
    defEndDate = new Date(Date.now() + 1000 * 60 * 60 * 24)
  } = props;

  const [toDate, setToDate] = useState(truncateDate(defEndDate)); // tomorrow
  const [fromDate, setFromDate] = useState(truncateDate(defStartDate));

  const updateDates = (from, to) => {
    from = new Date(from);
    to = new Date(to);
    if (from !== fromDate) {
      onStartChange(from);
    }
    if (to !== toDate) {
      onEndChange(to);
    }
    setFromDate(from);
    setToDate(to);
    onChange({ from, to });
  };

  // TODO:
  // - when a user selects a date from the first picker, open the second picker?
  // - if a user selects a (from,to) pair where from < to, bracket the selection
  return (
    <Grid container className={classes.grid} justify="space-around">
      <DatePicker defDate={fromDate} desc="From" onChange={dt => updateDates(dt, toDate)} />
      <DatePicker defDate={toDate} desc="To" onChange={dt => updateDates(fromDate, dt)} />
    </Grid>
  )
}

const DateRangePicker = withStyles(styles)(DateRangePickerImpl);

export {
    DatePicker,
    DateRangePicker,
    dateToStr
};
