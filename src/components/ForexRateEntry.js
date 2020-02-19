import React, { useState } from 'react';
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

const styles = () => ({
  root: {},
});

function ForexRateEntry() {
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
        <ForexRateEndDateOption />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={2}>
        <ForexRateEndDateOption weekend />
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
}

export default withStyles(styles)(ForexRateEntry);
