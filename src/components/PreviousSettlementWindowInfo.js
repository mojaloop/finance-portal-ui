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


function PreviousSettlementWindowInfo(props) {
  const { classes, previousSettlementWindow: { payments, receipts, limits, positions } } = props;
  return (
    <div className={classes.root}>
      <h2>Previous Settlement Window</h2>
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
        {Object.keys(payments).map(key =>
          <Grid container justify="center" key={key}>
            <Grid item md={3}><Paper>{key}</Paper></Grid>
            <Grid item md={3}><Paper>{payments[key].num}</Paper></Grid>
            <Grid item md={3}><Paper>{payments[key].value}</Paper></Grid>
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
        {Object.keys(receipts).map(key =>
          <Grid container justify="center" key={key}>
            <Grid item md={3}><Paper>{key}</Paper></Grid>
            <Grid item md={3}><Paper>{receipts[key].num}</Paper></Grid>
            <Grid item md={3}><Paper>{receipts[key].value}</Paper></Grid>
          </Grid>
        )}
      </Grid>
      <h4>Limits</h4>
      <Grid container justify="center" spacing={0}>
        <Grid item md={3}>
          <Paper>Currency</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>Amount</Paper>
        </Grid>
        {Object.keys(limits).map(key =>
          <Grid container justify="center" key={key}>
            <Grid item md={3}><Paper>{key}</Paper></Grid>
            <Grid item md={3}><Paper>{limits[key].value}</Paper></Grid>
          </Grid>
        )}
      </Grid>
      <h4>Positions</h4>
      <Grid container justify="center" spacing={0}>
        <Grid item md={3}>
          <Paper>Currency</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>Amount</Paper>
        </Grid>
        {Object.keys(positions).map(key =>
          <Grid container justify="center" key={key}>
            <Grid item md={3}><Paper>{key}</Paper></Grid>
            <Grid item md={3}><Paper>{positions[key].value}</Paper></Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

PreviousSettlementWindowInfo.propTypes = {
  previousSettlementWindow: PropTypes.object.isRequired
};

export default withStyles(styles)(PreviousSettlementWindowInfo);
