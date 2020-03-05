import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, TextField, Typography, withStyles,
} from '@material-ui/core';
import { DateTime } from 'luxon';

import RateFormat from './RateFormat';
import DatePicker from './DatePicker';
import ForexRateEndDateOption from './ForexRateEndDateOption';

export function receivedAmount(strRate) {
  return (Number(strRate) * 50).toFixed(2);
}

export const floatToIntDestructive = (f) => parseInt(String(f).replace('.', ''), 10);

export const hasMax4DecimalPlaces = (strNum) => {
  const [, frac] = Number(strNum).toString().split('.');
  return (frac === undefined || frac.length < 5);
};

export function rateInputToInt(inputRate) {
  if (!inputRate) {
    return 0;
  }
  if (!hasMax4DecimalPlaces(inputRate)) {
    throw new Error('Precision only takes into account up to 4 decimal places');
  }
  // Coerce the input to a number, turn it into a string with exactly four decimal places, remove
  // the decimal and any leading zeroes, and return it as a number.
  return Number(Number(inputRate).toFixed(4).replace('.', '').replace(/^0*/,''));
}

export const hiddenConfirmDialog = () => ({ visible: false, description: '', onConfirm: () => {} });

const styles = () => ({
  root: {},
});

function ForexRateEntry(props) {
  const { onCommit } = props;
  const today830amUTC = DateTime.utc().set({
    hour: 8, minute: 30, second: 0, millisecond: 0,
  });
  const [rate, setRate] = useState('');
  const [startDate] = useState(today830amUTC);

  return (
    <Grid container spacing={0}>
      <Grid item xs={4}>
        <TextField
          label="Rate"
          margin="normal"
          value={rate}
          variant="outlined"
          InputProps={{
            inputComponent: RateFormat,
          }}
          onChange={(event) => setRate(Number(event.target.value))}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Sample Exchange Estimate</Typography>
        <Typography>
          Send:
          {' '}
          <strong>50.00</strong>
          {' '}
          EUR
        </Typography>
        <Typography>
          Recv:
          {' '}
          <strong>{`${receivedAmount(rate)}`}</strong>
          {' '}
          MAD
        </Typography>
      </Grid>
      <Grid item xs={4} />
      {/* Row Break */}
      <Grid item xs={4}>
        <DatePicker
          desc="Start Date"
          defDate={startDate}
          onChange={() => {}}
          disabled
        />
      </Grid>
      <Grid item xs={8} />
      {/* Row Break */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" align="center">
          All times below are&nbsp;
          <strong>8:30AM UTC</strong>
        </Typography>
      </Grid>
      {/* Row Break */}
      <Grid item xs={3} />
      <Grid item xs={2}>
        <ForexRateEndDateOption
          onCommit={onCommit(rateInputToInt(rate) || 0, startDate.toISO())}
        />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={2}>
        <ForexRateEndDateOption
          onCommit={onCommit(rateInputToInt(rate) || 0, startDate.toISO())}
          weekend
        />
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
}

ForexRateEntry.propTypes = {
  onCommit: PropTypes.func.isRequired,
};

export default withStyles(styles)(ForexRateEntry);
