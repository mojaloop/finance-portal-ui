import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

function ForexRateEntry(props) {
  const { classes } = props;

  const [rate, setRate] = useState('');
  const [startDate, setStartDate] = useState(new Date());

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
      <TextField
        label="Start Date"
        margin="normal"
        value={startDate}
        variant="outlined"
        onChange={() => {}}
      />
    </>
  );
}

export default ForexRateEntry;
