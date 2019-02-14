
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// TODO: export all components from components directory in an index.js, then import them all here
// in a single statement
import SettlementsList from './components/SettlementsList';
import SettlementWindowInfo from './components/SettlementWindowInfo';
import FSPSelector from './components/FSPSelector';
import Login from './components/Login';
import { get } from './requests';
import { getUserInfo, setUserInfo } from './user';

// TODO: consider adding an error boundary?
//       https://reactjs.org/docs/error-boundaries.html
// TODO: do we need to add styling to all the components? (Or should we get rid of this material
//       thing?)

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

  const [selectedFsp, setSelectedFsp] = useState(undefined); // TODO: remove?
  const [settlementWindowState, setSettlementWindowState] = useState(undefined);
  const [settlements, setSettlements] = useState(undefined);
  const [user, setUser] = useState(getUserInfo());

  const selectFsp = async (dfspId) => {
    const [win, settlements] = await Promise.all(([
      get(`current-window/${dfspId}`),
      get(`settlements/${dfspId}`)
    ]));
    setSettlementWindowState(win);
    setSettlements(settlements);
    setSelectedFsp(dfspId);
  };

  const loginSuccessful = result => {
    setUserInfo(result);
    setUser(result);
  };

  // TODO: what are the md (and xs, etc.) props on Grid?
  return (
    <div className={classes.root}>
      {user === undefined ?
        <Login loginSuccessful={loginSuccessful} /> :
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
      }
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  fspList: PropTypes.array.isRequired
};

export default withStyles(styles)(App);
