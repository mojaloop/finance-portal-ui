import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { DateTime } from 'luxon';
import { DatePicker } from './DatePicker';
import ForexRateEndDateOption from './ForexRateEndDateOption';

function ForexRateEntry() {
  const [rate, setRate] = useState('');
  const [startDate] = useState(new Date());

  const tomorrow8amUTC = DateTime.utc()
    .plus({ days: 1 })
    .set({
      hour: 8,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

  const nextMonday8amUTC = tomorrow8amUTC.plus({ days: 3 });

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
      <ForexRateEndDateOption initialDate={tomorrow8amUTC} />
      <ForexRateEndDateOption weekend initialDate={nextMonday8amUTC} />
    </>
  );
}

export default ForexRateEntry;
