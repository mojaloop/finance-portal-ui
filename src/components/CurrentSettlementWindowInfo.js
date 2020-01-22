import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

function consolidateTransactionsByCurrency(transactions) {
  return transactions.reduce((totalPayments, payment) => {
    if (totalPayments.length > 0) {
      const currencies = totalPayments.map((transaction) => transaction.currencyId);
      if (currencies.includes(payment.currencyId)) {
        const currencyIndex = currencies.indexOf(payment.currencyId);
        totalPayments[currencyIndex].numTransactions // eslint-disable-line no-param-reassign
        += payment.numTransactions;
        totalPayments[currencyIndex] // eslint-disable-line no-param-reassign
          .senderAmount = (parseFloat(totalPayments[currencyIndex].senderAmount)
          + parseFloat(payment.senderAmount)).toFixed(4);
      } else {
        totalPayments.push(payment);
      }
      return totalPayments;
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
