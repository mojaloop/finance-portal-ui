import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import { DatePicker } from './DatePicker';
import ForexRateEndDateOption from './ForexRateEndDateOption';

function ForexRateEntry() {
  const [rate, setRate] = useState('');
  const [startDate] = useState(new Date());

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
        disabled
      />
      <br />
      <ForexRateEndDateOption />
      <ForexRateEndDateOption />
    </>
  );
}

export default ForexRateEntry;
