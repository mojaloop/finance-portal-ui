import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const stringRateFromDecimalRateAndInteger = (decimalRate, integer) => [
  String(integer).slice(0, String(integer).length - decimalRate),
  '.',
  String(integer).slice(String(integer).length - decimalRate),
].join('');

const fxpResponseToForexRates = (response) => Object.keys(response)
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
  return (
    <div className={classes.root}>
      <p>Forex Rates Tab</p>
    </div>
  );
}

ForexRatesTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const ForexRatesTabWrapped = withStyles(styles)(ForexRatesTab);

export {
  ForexRatesTabWrapped as ForexRatesTab,
  fxpResponseToForexRates,
  stringRateFromDecimalRateAndInteger,
};
