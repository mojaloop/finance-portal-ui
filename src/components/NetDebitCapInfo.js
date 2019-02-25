
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


function NetDebitCapInfo(props) {
  const { classes, netDebitCap } = props;
  return (
    <div className={classes.root}>
      <h2>NetDebitCap</h2>
      <Grid container spacing={0}>
        <Grid item md={3}>
          <Paper>Currency</Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>NDC</Paper>
        </Grid>
        {netDebitCap.map(n =>
          <Grid container key={n.participantLimitId}>
            <Grid item md={3}><Paper>{n.currency}</Paper></Grid>
            <Grid item md={3}><Paper>{n.netDebitCap}</Paper></Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

NetDebitCapInfo.propTypes = {
  netDebitCap: PropTypes.array.isRequired
};

export default withStyles(styles)(NetDebitCapInfo);
