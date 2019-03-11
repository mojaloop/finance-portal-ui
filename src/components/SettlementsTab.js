
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// TODO: export all components from components directory in an index.js, then import them all here
// in a single statement
import SettlementsList from './SettlementsList';
import SettlementWindowInfo from './SettlementWindowInfo';
import PositionInfo from './PositionInfo';
import FSPSelector from './FSPSelector';
import Snackbar from '@material-ui/core/Snackbar';
import Switch from '@material-ui/core/Switch';
import { SnackbarContentWrapper } from './SnackbarUtils';

import { getDfsps, getPositions, getCurrentWindow, getSettlementAccountBalance, getParticipantIsActiveFlag, setParticipantIsActiveFlag } from '../api';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function SettlementsTab(props) {
  const { classes } = props;

  const [positions, setPositions] = useState(undefined);
  const [settlementAccountBalance, setSettlementAccountBalance] = useState(undefined);
  const [settlementWindow, setSettlementWindow] = useState(undefined);
  const [selectedFsp, setSelectedFsp] = useState(undefined); // TODO: remove?
  const [fspList, setFspList] = useState(undefined);
  const [stopTransactions, setStopTransactions] = useState(undefined);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Success');

  const selectFsp = async (dfspId) => {
    const [positions, win, balance, isActive] = await Promise.all(([
      getPositions(dfspId),
      getCurrentWindow(dfspId),
      getSettlementAccountBalance(dfspId),
      getParticipantIsActiveFlag(dfspId)
    ]));
    setSettlementAccountBalance(balance);
    setPositions(positions);
    setSettlementWindow(win);
    setStopTransactions(isActive);
    setSelectedFsp(dfspId);
  };

  const updateIsActiveFlag = event => {
    let isActive = event.target.checked ? 0 : 1;
    setStopTransactions(isActive);
    setParticipantIsActiveFlag(selectedFsp, fspList.ids[selectedFsp], isActive).then(setStopTransactions).then(() => {
      setSuccessMessage('Update Successful!');
      setShowSuccessMessage(true);
    })
      .catch(err => {
        setStopTransactions(isActive === 1 ? 0 : 1);
        setErrorMessage('Failed to update!');
        setShowErrorMessage(true);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
  };

  useEffect(() => {
    getDfsps()
      .then(dfsps => {
        // Augment fspList with a map of ids -> names and vice-versa.
        dfsps.ids = Object.assign(...dfsps.map(fsp => ({ [fsp.id]: fsp.name })));
        // Note that names are guaranteed unique by the db. We assume here that the concept of
        // string uniqueness in mysql is no more strict than the concept of string uniqueness in
        // node
        dfsps.names = Object.assign(...dfsps.map(fsp => ({ [fsp.name]: fsp.id })));
        setFspList(dfsps)
      })
      .catch(err => window.alert('Failed to get FSP list')); // TODO: better error message, let user retry
  }, []);

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={showErrorMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContentWrapper
          onClose={handleCloseSnackbar}
          variant="error"
          className={classes.margin}
          message={errorMessage}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={showSuccessMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContentWrapper
          onClose={handleCloseSnackbar}
          variant="success"
          className={classes.margin}
          message={successMessage}
        />
      </Snackbar>

      {fspList === undefined ||
        <Grid container spacing={24}>
          <Grid item md={4}>
            <Paper className={classes.paper}>
              <FSPSelector selectFsp={selectFsp} fspList={fspList} />
            </Paper>
          </Grid>
          <Grid item md={8}>
          {stopTransactions === undefined ? <></> :
            <Grid container spacing={24}>
              <Grid item md={12}>
                <Paper className={classes.paper}>
                  <h3>Stop the Transactions: </h3>
                    <Switch
                    checked={stopTransactions === 0}
                    onChange={updateIsActiveFlag}
                  />
                </Paper>
              </Grid>
            </Grid>
          }
            {settlementWindow === undefined ? <></> :
              <Grid container spacing={24}>
                <Grid item md={12}>
                  <Paper className={classes.paper}>
                    <SettlementWindowInfo settlementWindow={settlementWindow} />
                  </Paper>
                </Grid>
                <Grid item md={12}>
                  <Paper className={classes.paper}>
                    <PositionInfo positions={positions} settlementAccountBalance={settlementAccountBalance} />
                  </Paper>
                </Grid>
                {selectedFsp &&
                  <Grid item md={12}>
                    <Paper className={classes.paper}>
                      <SettlementsList selectedFsp={selectedFsp} fspList={fspList} />
                    </Paper>
                  </Grid>
                }
              </Grid>
            }
          </Grid>
        </Grid>
      }
    </div>
  );
}

SettlementsTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettlementsTab);
