import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, TextField, Typography, withStyles,
} from '@material-ui/core';
import { DateTime } from 'luxon';

import { DatePicker } from './DatePicker';
import ForexRateEndDateOption from './ForexRateEndDateOption';

export function receivedAmount(rate) {
  const amount = rate * 50;
  const amountToTwoDecimalPlaces = Math.round((amount + Number.EPSILON) * 100) / 100;
  if (amountToTwoDecimalPlaces === parseInt(amountToTwoDecimalPlaces, 10)) {
    return `${String(amountToTwoDecimalPlaces)}.00`;
  }
  if ((amountToTwoDecimalPlaces * 10) === parseInt((amountToTwoDecimalPlaces * 10), 10)) {
    return `${String(amountToTwoDecimalPlaces)}0`;
  }
  return String(amountToTwoDecimalPlaces);
}

export const floatToIntDestructive = (f) => parseInt(String(f).replace('.', ''), 10);

export const hasMax4DecimalPlaces = (number) => (number * 100000) % 10 === 0;

export function rateInputToIntAndDecimalPlacesObject(inputRate) {
  if (!hasMax4DecimalPlaces(inputRate)) {
    throw new Error('Precision only takes into account up to 4 decimal places');
  }
  const decimalRate = 4;
  const inputRateTimes10e4 = inputRate * 10000;
  const rate = floatToIntDestructive(inputRate);
  if (String(inputRateTimes10e4).length > String(rate).length) {
    return {
      rate: inputRateTimes10e4,
      decimalRate,
    };
  }
  return {
    rate,
    decimalRate,
  };
}

const styles = () => ({
  root: {},
});

function ForexRateEntry(props) {
  const { onCommit } = props;
  const today8amUTC = DateTime.utc().set({
    hour: 8, minute: 0, second: 0, millisecond: 0,
  });
  const [rate, setRate] = useState('');
  const [startDate] = useState(today8amUTC);

  return (
    <Grid container spacing={0}>
      <Grid item xs={4}>
        <TextField
          label="Rate"
          margin="normal"
          value={rate}
          variant="outlined"
          onChange={(event) => setRate(event.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography>Sample Exchange Estimate</Typography>
        <Typography>Send: 50.00 EUR</Typography>
        <Typography>
          Recv:
          {` ${receivedAmount(rate)} MAD`}
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
      <Grid item xs={3} />
      <Grid item xs={2}>
        <ForexRateEndDateOption onCommit={onCommit()} />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={2}>
        <ForexRateEndDateOption onCommit={onCommit()} weekend />
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
}

ForexRateEntry.propTypes = {
  onCommit: PropTypes.func.isRequired,
};

export default withStyles(styles)(ForexRateEntry);
