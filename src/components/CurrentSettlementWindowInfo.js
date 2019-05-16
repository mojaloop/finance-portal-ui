
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


function CurrentSettlementWindowInfo(props) {
  const { classes, currentSettlementWindow: { payments, receipts } } = props;
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
        {payments.map(payment =>
          <Grid container justify="center" key={payment.currencyId}>
            <Grid item md={3}><Paper>{payment.currencyId}</Paper></Grid>
            <Grid item md={3}><Paper>{payment.numTransactions}</Paper></Grid>
            <Grid item md={3}><Paper>{payment.senderAmount}</Paper></Grid>
          </Grid>
        )}
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
        {receipts.length > 0 && receipts.map(receipt =>
          <Grid container justify="center" key={receipt.currencyId}>
            <Grid item md={3}><Paper>{receipt.currencyId}</Paper></Grid>
            <Grid item md={3}><Paper>{receipt.numTransactions}</Paper></Grid>
            <Grid item md={3}><Paper>{receipt.senderAmount}</Paper></Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

CurrentSettlementWindowInfo.propTypes = {
  currentSettlementWindow: PropTypes.object.isRequired
};

export default withStyles(styles)(CurrentSettlementWindowInfo);
