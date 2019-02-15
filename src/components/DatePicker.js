
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
    defStartDate = new Date(),
    defEndDate = new Date(Date.now() + 1000 * 60 * 60 * 24)
  } = props;

  const [endDate, setEndDate] = useState(truncateDate(defEndDate)); // tomorrow
  const [startDate, setStartDate] = useState(truncateDate(defStartDate));

  const updateDates = (start, end) => {
    start = new Date(start);
    end = new Date(end);
    setStartDate(start);
    setEndDate(end);
    onChange(start, end);
  };

  // TODO:
  // - when a user selects a date from the first picker, open the second picker?
  // - if a user selects a (from,to) pair where from < to, bracket the selection
  return (
    <Grid container className={classes.grid} justify="space-around">
      <DatePicker defDate={startDate} desc="From" onChange={dt => updateDates(dt, endDate)} />
      <DatePicker defDate={endDate} desc="To" onChange={dt => updateDates(startDate, dt)} />
    </Grid>
  )
}

const DateRangePicker = withStyles(styles)(DateRangePickerImpl);

export {
    DatePicker,
    DateRangePicker,
    dateToStr
};
