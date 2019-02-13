import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SettlementsList from './components/SettlementsList';
import SettlementWindowInfo from './components/SettlementWindowInfo';
import FSPSelector from './components/FSPSelector';

// TODO: consider adding an error boundary?
// https://reactjs.org/docs/error-boundaries.html
// TODO: what exactly is a react fragment, and when should or shouldn't they be used?

const endpoint = 'http://localhost:3002';
const fetchOpts = { headers: { 'accept': 'application/json' } };

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

function App(props) {
  const { classes, fspList } = props;
  const [selectedFsp, setSelectedFsp] = useState(undefined);
  const [settlementWindowState, setSettlementWindowState] = useState(undefined);
  const [settlements, setSettlements] = useState(undefined);
  const selectFsp = async (dfspId) => {
    const [win, settlements] = await Promise.all(([
      fetch(`${endpoint}/current-window/${dfspId}`, fetchOpts).then(res => res.json()),
      fetch(`${endpoint}/settlements/${dfspId}`, fetchOpts).then(res => res.json()),
    ]));
    setSettlementWindowState(win);
    setSettlements(settlements);
    setSelectedFsp(dfspId);
  };
  // TODO: what are the md (and xs, etc.) props on Grid?
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item md={12} />
        <Grid item md={4}>
          <Paper className={classes.paper}>
            <FSPSelector selectFsp={selectFsp} fspList={fspList} />
          </Paper>
        </Grid>
        {settlementWindowState === undefined || settlements === undefined ? <></> :
        <Grid item md={8}>
          <Grid container spacing={24}>
            <Grid item md={12}>
              <Paper className={classes.paper}>
                <SettlementWindowInfo settlementWindow={settlementWindowState.window} positions={settlementWindowState.positions} />
              </Paper>
            </Grid>
            <Grid item md={12}>
              <Paper className={classes.paper}>
                <SettlementsList selectedFsp={selectedFsp} settlements={settlements} fspList={fspList} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        }
      </Grid>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
