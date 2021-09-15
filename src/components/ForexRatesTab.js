import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Snackbar, withStyles } from '@material-ui/core';

import ConfirmDialog from './ConfirmDialog';
import ForexRatesTable from './ForexRatesTable';
import SnackbarContentWrapper from './SnackbarUtils';

import { getForexRates } from '../api';

export const stringRateFromDecimalRateAndInteger = (decimalRate, integer) => {
  const forexRate = String(integer);
  let precision = forexRate.length - decimalRate;
  if (integer === 0) {
    return '0';
  } if (precision <= 0) {
    let prefix = '0.';
    for (precision; precision < 0; precision++) {
      prefix += '0';
    }
    return prefix + forexRate;
  } if (precision === forexRate.length) {
    return forexRate;
  }
  return [
    forexRate.slice(0, precision),
    '.',
    forexRate.slice(precision),
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

  // This will be re-added on near feature
  // const onCommit = (rate, startTime) => (endTime) => {
  //   setConfirmDialog({
  //     visible: true,
  //     description: 'This will set the EURMAD rate to '
  //       + `${stringRateFromDecimalRateAndInteger(4, rate)} from ${startTime} to ${endTime}. Are `
  //       + 'you sure you want to continue?',
  //     onConfirm: async () => {
  //       try {
  //         await setForexRate({
  //           rate, startTime, endTime, destinationCurrency: 'mad', sourceCurrency: 'eur',
  //         });
  //         setConfirmDialog(hiddenConfirmDialog());
  //         setSnackBarParams({
  //           show: true,
  //           message: 'The Forex rate was successfully set',
  //           variant: 'success',
  //           action: 'close',
  //         });
  //         setForexRates([{
  //           rate: stringRateFromDecimalRateAndInteger(4, rate),
  //           startTime,
  //           endTime,
  //           reuse: false,
  //         }, ...forexRates]);
  //       } catch (error) {
  //         if (error instanceof SyntaxError) {
  //           setConfirmDialog(hiddenConfirmDialog());
  //           setSnackBarParams({
  //             show: true,
  //             message: 'The Forex rate was successfully set',
  //             variant: 'success',
  //             action: 'close',
  //           });
  //           setForexRates([{
  //             rate: stringRateFromDecimalRateAndInteger(4, rate),
  //             startTime,
  //             endTime,
  //             reuse: false,
  //           }, ...forexRates]);
  //         } else {
  //           setConfirmDialog(hiddenConfirmDialog());
  //           setSnackBarParams({
  //             show: true, message: 'Error: Forex rate could not be set', variant: 'error',
  //           });
  //         }
  //       }
  //     },
  //   });
  // };

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
  }, [getRates]);

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
