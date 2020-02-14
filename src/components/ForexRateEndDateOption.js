import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { DateTime } from 'luxon';

import { DatePicker } from './DatePicker';

function ForexRateEndDateOption(props) {
  const { weekend, onCommit } = props;
  const today8amUTC = DateTime.utc().set({
    hour: 8, minute: 0, second: 0, millisecond: 0,
  });
  const initialDate = weekend
    ? today8amUTC.plus({ days: 3 })
    : today8amUTC.plus({ days: 1 });
  return (
    <Card>
      {weekend
        ? (
          <>
            <CardHeader title="Weekend" />
            <DatePicker
              desc="End Date"
              onChange={() => {}}
              defDate={initialDate}
            />
          </>
        )
        : (
          <>
            <CardHeader title="1 Day" />
            <DatePicker
              disabled
              desc="End Date"
              onChange={() => {}}
              defDate={initialDate}
            />
          </>
        )}
      <Button
        variant="contained"
        color="primary"
        onClick={onCommit}
      >
        Commit
      </Button>
    </Card>
  );
}

ForexRateEndDateOption.propTypes = {
  onCommit: PropTypes.func,
  weekend: PropTypes.bool,
};

ForexRateEndDateOption.defaultProps = {
  onCommit: () => {},
  weekend: false,
};

export default ForexRateEndDateOption;
