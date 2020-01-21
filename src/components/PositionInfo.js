import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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

function PositionInfo(props) {
  const { classes, positions, settlementAccountBalance } = props;
  return (
    <div className={classes.root}>
      <h2>Accounts</h2>
      <h4>Settlement</h4>
      <Grid container spacing={0}>
        <Grid item md={3}>
          <Paper>Currency</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>Balance</Paper>
        </Grid>
        {settlementAccountBalance.map((p) => (
          <Grid container key={p.currency}>
            <Grid item md={3}><Paper>{p.currency}</Paper></Grid>
            <Grid item md={3}><Paper>{p.settlementBalance}</Paper></Grid>
          </Grid>
        ))}
      </Grid>
      <h4>Position</h4>
      <Grid container spacing={0}>
        <Grid item md={3}>
          <Paper>Currency</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>Position</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>NDC</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>Percentage of NDC Used</Paper>
        </Grid>
        {positions.map((p) => (
          <Grid container key={p.participantLimitId}>
            <Grid item md={3}><Paper>{p.currency}</Paper></Grid>
            <Grid item md={3}><Paper>{p.position}</Paper></Grid>
            <Grid item md={3}><Paper>{p.limit}</Paper></Grid>
            <Grid item md={3}>
              <Paper>
                {((100.0 * p.position) / p.limit).toFixed(2)}
%
              </Paper>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

PositionInfo.propTypes = {
  classes: PropTypes.objectOf({ root: PropTypes.string }).isRequired,
  positions: PropTypes.arrayOf({
    currency: PropTypes.string,
    position: PropTypes.string,
    limit: PropTypes.string,
  }).isRequired,
  settlementAccountBalance: PropTypes.arrayOf({
    currency: PropTypes.string,
    settlementBalance: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(PositionInfo);
