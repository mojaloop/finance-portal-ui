
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


function SettlementWindowInfo(props) {
  const { classes, positions, settlementWindow: { payments, receipts } } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>

        <Grid item md={4} />
        <Grid item md={4}>
          <Paper>Number of transactions</Paper>
        </Grid>
        <Grid item md={4}>
          <Paper>Amount</Paper>
        </Grid>

        <Grid item md={4}>
          <Paper>Payments</Paper>
        </Grid>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            {payments.numTransactions}
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            {payments.senderAmount}
          </Paper>
        </Grid>

        <Grid item md={4}>
          <Paper>Receipts</Paper>
        </Grid>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            {receipts.numTransactions}
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            {receipts.senderAmount}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item md={3}>
          <Paper>Currency</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>Position</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>Limit</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>Position/Limit</Paper>
        </Grid>
        {positions.map(p =>
          <Grid container key={p.id}>
            <Grid item md={3}><Paper>{p.currency}</Paper></Grid>
            <Grid item md={3}><Paper>{p.position}</Paper></Grid>
            <Grid item md={3}><Paper>{p.limit}</Paper></Grid>
            <Grid item md={3}><Paper>{Math.round(p.position / p.limit).toFixed(2)}%</Paper></Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

SettlementWindowInfo.propTypes = {
  positions: PropTypes.array.isRequired,
  settlementWindow: PropTypes.object.isRequired
};

export default withStyles(styles)(SettlementWindowInfo);
