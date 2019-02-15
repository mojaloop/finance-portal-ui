
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


function PositionInfo(props) {
  const { classes, positions } = props;
  return (
    <div className={classes.root}>
      <h2>Positions</h2>
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

PositionInfo.propTypes = {
  positions: PropTypes.array.isRequired
};

export default withStyles(styles)(PositionInfo);
