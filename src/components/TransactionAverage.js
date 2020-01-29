import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';

import DateRangePicker from './DateRangePicker';
import { getHistoricalData, fetchTimeoutController } from '../api';
import { truncateDate } from '../utils';
import SnackbarContentWrapper from './SnackbarUtils';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function TransactionAverageList(props) {
  const { averages } = props;
  return (
    <>
      {Object.keys(averages).length === 0 ? 'No data found'
        : Object.entries(averages).map(([currency, avg]) => (
          <Paper key={currency}>
            <h4>{currency}</h4>
            <Grid container spacing={0}>
              <Grid item md={2}>
                <Paper>Avg. Payments</Paper>
              </Grid>
              <Grid item md={2}>
                <Paper>Avg. Payments Amt</Paper>
              </Grid>
              <Grid item md={2}>
                <Paper>Avg. Receipts</Paper>
              </Grid>
              <Grid item md={2}>
                <Paper>Avg. Receipts Amt</Paper>
              </Grid>
              <Grid item md={2}>
                <Paper>Avg. NDC</Paper>
              </Grid>
              <Grid item md={2}>
                <Paper>Avg. Position</Paper>
              </Grid>

              <Grid container>
                <Grid item md={2}><Paper>{avg.payments.num.toFixed(2)}</Paper></Grid>
                <Grid item md={2}><Paper>{avg.payments.value.toFixed(2)}</Paper></Grid>
                <Grid item md={2}><Paper>{avg.receipts.num.toFixed(2)}</Paper></Grid>
                <Grid item md={2}><Paper>{avg.receipts.value.toFixed(2)}</Paper></Grid>
                <Grid item md={2}><Paper>{avg.limit.toFixed(2)}</Paper></Grid>
                <Grid item md={2}><Paper>{avg.position.toFixed(2)}</Paper></Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
    </>
  );
}

function TransactionAverage(props) {
  const { fsp, classes } = props;

  const [dates, setDates] = useState({
    from: truncateDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)),
    to: truncateDate(new Date(Date.now() + 1000 * 60 * 60 * 24)),
  });
  const [averages, setAverages] = useState(undefined);
  const [snackBarParams, setSnackBarParams] = useState({ show: false, message: '', variant: 'success' });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (snackBarParams.callback) {
      snackBarParams.callback();
    }
    setSnackBarParams({ ...snackBarParams, show: false });
  };

  useEffect(() => {
    const ftc = fetchTimeoutController();
    getHistoricalData(fsp.name, dates, { ftc })
      .then((data) => setAverages(data.average))
      .catch(ftc.ignoreAbort())
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Failed to get averages', error);
        setAverages({});
        setSnackBarParams({
          show: true, message: 'Failed to get averages!', variant: 'error', action: 'close',
        });
      });
    return ftc.abortFn;
  }, [fsp, dates]);

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackBarParams.show}
        autoHideDuration={snackBarParams.action === 'close' ? 6000 : null}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContentWrapper
          onClose={handleCloseSnackbar}
          variant={snackBarParams.variant}
          className={classes.margin}
          message={snackBarParams.message}
          action={snackBarParams.action}
        />
      </Snackbar>
      <h2>Transaction Average</h2>
      {averages
        && (
        <>
          <DateRangePicker defStartDate={dates.from} defEndDate={dates.to} onChange={setDates} />
          <TransactionAverageList averages={averages} />
        </>
        )}
    </>
  );
}

TransactionAverageList.propTypes = {
  averages: PropTypes.arrayOf({}).isRequired,
};

TransactionAverage.propTypes = {
  fsp: PropTypes.shape({ name: PropTypes.string }).isRequired,
  classes: PropTypes.objectOf({ margin: PropTypes.string }).isRequired,
};

export default withStyles(styles)(TransactionAverage);
