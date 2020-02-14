import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, withStyles } from '@material-ui/core';
import { useUIDSeed } from 'react-uid';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

// TODO: Optimize function so it's human readable.
function consolidateTransactionsByCurrency(transactions) {
  // Iterate through all the transactions and sum the ones that have the same currency.
  return transactions.reduce((totalPayments, payment) => {
    // Total number of transactions with the current currency
    const totalTransactionsForCurrentCurrency = transactions
      .filter((transaction) => transaction.currencyId === payment.currencyId).length;
    if (totalPayments.length > 0) {
      // Get a list of all the currencies in the transactions
      const currencies = totalPayments.map((transaction) => transaction.currencyId);
      // Check if the currency is repeated. if it is, then sum and
      // return the total transactions-amount/tranfers for that currency;
      // else, add the new currency and it's values to the array.
      if (currencies.includes(payment.currencyId)) {
        const currencyIndex = currencies.indexOf(payment.currencyId);
        // skip sum if it's already being done
        if (totalPayments[currencyIndex]
          .transactionCounter === totalTransactionsForCurrentCurrency) {
          return totalPayments;
        }
        totalPayments[currencyIndex].numTransactions // eslint-disable-line no-param-reassign
        += payment.numTransactions;
        totalPayments[currencyIndex] // eslint-disable-line no-param-reassign
          .senderAmount = (parseFloat(totalPayments[currencyIndex].senderAmount)
          + parseFloat(payment.senderAmount)).toFixed(4);

        if (totalPayments[currencyIndex].transactionCounter) {
          totalPayments[currencyIndex] // eslint-disable-line no-param-reassign
            .transactionCounter += 1;
        } else {
          totalPayments[currencyIndex] // eslint-disable-line no-param-reassign
            .transactionCounter = 1; // eslint-disable-line no-param-reassign
        }
      } else {
        totalPayments.push(payment);
      }
      return totalPayments;
    }
    if (!payment.transactionCounter) {
      payment.transactionCounter = 1; // eslint-disable-line no-param-reassign
    }
    return totalPayments.concat(payment);
  }, []);
}

function CurrentSettlementWindowInfo(props) {
  const { classes, currentSettlementWindow: { payments, receipts } } = props;
  const paymentsUIDGenerator = useUIDSeed();
  const receiptsUIDGenerator = useUIDSeed();
  return (
    <div className={classes.root}>
      <h2>Current Settlement Window</h2>
      <h4>Outgoing Transactions</h4>
      <Grid container justify="center" spacing={0}>
        <Grid item md={3}>
          <Paper>Currency</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>Number of transactions</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>Amount</Paper>
        </Grid>
        {payments.length > 0
        && consolidateTransactionsByCurrency(payments).map((payment, index) => (
          <Grid container justify="center" key={payment.currencyId}>
            <Grid item md={3}>
              <Paper id={paymentsUIDGenerator(`payment-${index}-currencyId`)}>
                {payment.currencyId}
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper
                id={paymentsUIDGenerator(`payment-${index}-numTransactions`)}
              >
                {payment.numTransactions}
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper
                id={paymentsUIDGenerator(`payment-${index}-senderAmount`)}
              >
                {payment.senderAmount}
              </Paper>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <h4>Incoming Transactions</h4>
      <Grid container justify="center" spacing={0}>
        <Grid item md={3}>
          <Paper>Currency</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>Number of transactions</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>Amount</Paper>
        </Grid>
        {receipts.length > 0
        && consolidateTransactionsByCurrency(receipts).map((receipt, index) => (
          <Grid container justify="center" key={receipt.currencyId}>
            <Grid item md={3}>
              <Paper id={receiptsUIDGenerator(`receipt-${index}-currencyId`)}>
                {receipt.currencyId}
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper
                id={receiptsUIDGenerator(`receipt-${index}-numTransactions`)}
              >
                {receipt.numTransactions}
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper
                id={receiptsUIDGenerator(`receipt-${index}-senderAmount`)}
              >
                {receipt.senderAmount}
              </Paper>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

CurrentSettlementWindowInfo.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  currentSettlementWindow: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default withStyles(styles)(CurrentSettlementWindowInfo);
