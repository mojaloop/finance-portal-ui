import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardHeader, withStyles,
} from '@material-ui/core';
import { DateTime } from 'luxon';

import { DatePicker } from './DatePicker';

const styles = (theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
});

function ForexRateEndDateOption(props) {
  const { classes, onCommit, weekend } = props;
  const today8amUTC = DateTime.utc().set({
    hour: 8, minute: 0, second: 0, millisecond: 0,
  });
  const initialDate = weekend
    ? today8amUTC.plus({ days: 3 })
    : today8amUTC.plus({ days: 1 });
  return (
    <Card className={classes.card}>
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
        fullWidth
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
  classes: PropTypes.shape({ card: PropTypes.object }).isRequired,
  onCommit: PropTypes.func,
  weekend: PropTypes.bool,
};

ForexRateEndDateOption.defaultProps = {
  onCommit: () => {},
  weekend: false,
};

export default withStyles(styles)(ForexRateEndDateOption);
