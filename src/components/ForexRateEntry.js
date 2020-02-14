import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { DateTime } from 'luxon';
import { DatePicker } from './DatePicker';
import ForexRateEndDateOption from './ForexRateEndDateOption';

function ForexRateEntry() {
  const today8amUTC = DateTime.utc().set({
    hour: 8, minute: 0, second: 0, millisecond: 0,
  });
  const [rate, setRate] = useState('');
  const [startDate] = useState(today8amUTC);

  return (
    <>
      <TextField
        label="Rate"
        margin="normal"
        value={rate}
        variant="outlined"
        onChange={(event) => setRate(event.target.value)}
      />
      <br />
      <DatePicker
        desc="Start Date"
        defDate={startDate}
        onChange={() => {}}
        disabled
      />
      <br />
      <ForexRateEndDateOption />
      <ForexRateEndDateOption weekend />
    </>
  );
}

export default ForexRateEntry;
