import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';

import ForexRateEntry from './ForexRateEntry';
import ForexRatesTable from './ForexRatesTable';

export const stringRateFromDecimalRateAndInteger = (decimalRate, integer) => [
  String(integer).slice(0, String(integer).length - decimalRate),
  '.',
  String(integer).slice(String(integer).length - decimalRate),
].join('');

export const fxpResponseToForexRates = (response) => Object.keys(response)
  .map((currencyChannel) => response[currencyChannel]
    .map((rate) => ({
      currencyPair: currencyChannel,
      rate: stringRateFromDecimalRateAndInteger(rate.decimalRate, rate.rate),
      startTime: rate.startTime,
      endTime: rate.endTime,
      reuse: rate.reuse,
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
  const { classes } = props;
  const dummyForexRates = [
    {
      currencyPair: 'eurusd',
      rate: '666.6667',
      startTime: '2019-09-03T12:00:00.000Z',
      endTime: '2019-09-04T12:00:00.000Z',
      reuse: true,
    },
    {
      currencyPair: 'eurusd',
      rate: '666.6680',
      startTime: '2019-09-04T12:00:00.000Z',
      endTime: '2019-09-05T12:00:00.000Z',
      reuse: true,
    },
    {
      currencyPair: 'usdeur',
      rate: '444.4430',
      startTime: '2019-09-03T12:00:00.000Z',
      endTime: '2019-09-04T12:00:00.000Z',
      reuse: true,
    },
  ];
  return (
    <Grid className={classes.root} container spacing={2}>
      <Grid item xs={12}>
        <ForexRateEntry />
      </Grid>
      <Grid item xs={12}>
        <ForexRatesTable forexRates={dummyForexRates} />
      </Grid>
    </Grid>
  );
}

ForexRatesTab.propTypes = {
  classes: PropTypes.shape({ root: PropTypes.string }).isRequired,
};

export default withStyles(styles)(ForexRatesTab);
