import React, { useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import { DatePicker } from './DatePicker';
import { truncateDate } from '../utils';

const styles = (theme) => ({
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

function DateRangePicker(props) {
  const {
    classes,
    onChange = () => {},
    onStartChange,
    onEndChange,
    defStartDate = new Date(),
    defEndDate = new Date(Date.now() + 1000 * 60 * 60 * 24),
  } = props;

  const [toDate, setToDate] = useState(truncateDate(defEndDate)); // tomorrow
  const [fromDate, setFromDate] = useState(truncateDate(defStartDate));

  const updateDates = (from, to) => {
    const fromConverted = new Date(from);
    const toConverted = new Date(to);
    if (fromConverted !== fromDate) {
      onStartChange(fromConverted);
    }
    if (toConverted !== toDate) {
      onEndChange(toConverted);
    }
    setFromDate(fromConverted);
    setToDate(toConverted);
    onChange({ from: fromConverted, to: toConverted });
  };

  // TODO:
  // - when a user selects a date from the first picker, open the second picker?
  // - if a user selects a (from,to) pair where from < to, bracket the selection
  return (
    <Grid container className={classes.grid} justify="space-around">
      <DatePicker
        defDate={fromDate}
        desc="From"
        onChange={(dt) => updateDates(dt, toDate)}
      />
      <DatePicker
        defDate={toDate}
        desc="To"
        onChange={(dt) => updateDates(fromDate, dt)}
      />
    </Grid>
  );
}

DateRangePicker.defaultProps = {
  onStartChange: () => {},
  onEndChange: () => {},
};

DateRangePicker.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onStartChange: PropTypes.func,
  onEndChange: PropTypes.func,
  defStartDate: PropTypes.instanceOf(Date).isRequired,
  defEndDate: PropTypes.instanceOf(Date).isRequired,
};

export default withStyles(styles)(DateRangePicker);
