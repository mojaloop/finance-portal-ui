import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { DateTime } from 'luxon';

import { DatePicker } from './DatePicker';

function ForexRateEndDateOption(props) {
  const { weekend, initialDate } = props;
  return (
    <Card>
      {weekend ? null
        : (
          <DatePicker
            disabled
            desc="End Date"
            onChange={() => {}}
            defDate={initialDate}
          />
        )}
      <Button
        variant="contained"
        color="primary"
      >
        Commit
      </Button>
    </Card>
  );
}

ForexRateEndDateOption.propTypes = {
  initialDate: PropTypes.instanceOf(DateTime).isRequired,
  weekend: PropTypes.bool,
};

ForexRateEndDateOption.defaultProps = {
  weekend: false,
};

export default ForexRateEndDateOption;
