import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Snackbar, withStyles } from '@material-ui/core';

import ConfirmDialog from './ConfirmDialog';
import ForexRatesTable from './ForexRatesTable';
import SnackbarContentWrapper from './SnackbarUtils';

import { getForexRates } from '../api';

export const stringRateFromDecimalRateAndInteger = (decimalRate, integer) => {
  if (integer === 0) {
    return '0';
  }
  if (integer < 10000 && integer >= 1000) {
    return `0.${String(integer)}`;
  }
  if (integer < 1000 && integer >= 100) {
    return `0.0${String(integer)}`;
  }
  if (integer < 100 && integer >= 10) {
    return `0.00${String(integer)}`;
  }
  if (integer < 10) {
    return `0.000${String(integer)}`;
  }
  return [
    String(integer).slice(0, String(integer).length - decimalRate),
    '.',
    String(integer).slice(String(integer).length - decimalRate),
  ].join('');
};

export const fxpResponseToForexRates = (response) => Object.keys(response)
  .map((currencyChannel) => response[currencyChannel]
    .map((rate) => ({
      ...rate,
      rate: stringRateFromDecimalRateAndInteger(rate.decimalRate, rate.rate),
    })))
  .flat();

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  table: {
    minWidth: 800,
  },
});

function ForexRatesTab(props) {
  const { classes, getRates, showConfirmDialog } = props;

  const [forexRates, setForexRates] = useState([]);
  const [snackBarParams, setSnackBarParams] = useState({
    show: false, message: '', variant: 'success',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    visible: showConfirmDialog,
    description: '',
    onConfirm: () => {},
  });

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (snackBarParams.callback) {
      snackBarParams.callback();
    }
    setSnackBarParams({ ...snackBarParams, show: false });
  };

  useEffect(() => {
    async function fetchForexRates() {
      try {
        const fxpResponse = await getRates();
        setForexRates(fxpResponseToForexRates(fxpResponse));
      } catch (error) {
        if (error.name === 'AbortError') {
          setSnackBarParams({
            show: true,
            message: 'Timeout getting Forex rates. Retry?',
            variant: 'error',
            callback: fetchForexRates,
            action: 'retry',
          });
        } else {
          setSnackBarParams({
            show: true,
            message: 'An error occurred trying to get the Forex rates. Retry?',
            variant: 'error',
            callback: fetchForexRates,
            action: 'retry',
          });
        }
      }
    }
    fetchForexRates();
  }, []);

  // Forex Rates get transformed into this:
  // [
  //   {
  //     currencyPair: 'eurusd',
  //     rate: '666.6667',
  //     startTime: '2019-09-03T12:00:00.000Z',
  //     endTime: '2019-09-04T12:00:00.000Z',
  //     reuse: false,
  //   },
  //   {
  //     currencyPair: 'eurusd',
  //     rate: '666.6680',
  //     startTime: '2019-09-04T12:00:00.000Z',
  //     endTime: '2019-09-05T12:00:00.000Z',
  //     reuse: false,
  //   },
  //   {
  //     currencyPair: 'usdeur',
  //     rate: '444.4430',
  //     startTime: '2019-09-03T12:00:00.000Z',
  //     endTime: '2019-09-04T12:00:00.000Z',
  //     reuse: false,
  //   },
  // ]

  return (
    <>
      {confirmDialog.visible
      && (
      <ConfirmDialog
        title="Warning"
        description={confirmDialog.description}
        onReject={() => setConfirmDialog({
          visible: showConfirmDialog,
          description: '',
          onConfirm: () => {},
        })}
        onConfirm={confirmDialog.onConfirm}
      />
      )}
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
      <Grid className={classes.root} container spacing={0}>
        <Grid item xs={12}>
          <ForexRatesTable forexRates={forexRates} />
        </Grid>
      </Grid>
    </>
  );
}

ForexRatesTab.propTypes = {
  classes: PropTypes.shape({ root: PropTypes.string, margin: PropTypes.string }).isRequired,
  getRates: PropTypes.func,
  showConfirmDialog: PropTypes.bool,
};

ForexRatesTab.defaultProps = {
  getRates: getForexRates,
  showConfirmDialog: false,
};

export default withStyles(styles)(ForexRatesTab);
