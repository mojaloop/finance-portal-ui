
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// TODO: export all components from components directory in an index.js, then import them all here
// in a single statement
import SettlementsList from './SettlementsList';
import SettlementWindowInfo from './SettlementWindowInfo';
import NDCManagement from './NDCManagement';
import PositionInfo from './PositionInfo';
import FundsManagement from './FundsManagement';
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

function FinancialMonitoringTab(props) {
  const { classes } = props;

  const [positions, setPositions] = useState(undefined);
  const [settlementAccountBalance, setSettlementAccountBalance] = useState(undefined);
  const [settlementWindow, setSettlementWindow] = useState(undefined);
  const [selectedFsp, setSelectedFsp] = useState(undefined); // TODO: remove?
  const [fspList, setFspList] = useState(undefined);
  const [stopTransactions, setStopTransactions] = useState(undefined);
  const [snackBarParams, setSnackBarParams] = useState({ show: false, message: '', variant: 'success' });

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
    setParticipantIsActiveFlag(selectedFsp, fspList.ids[selectedFsp], isActive)
      .then(setStopTransactions)
      .then(() => {
        setSnackBarParams({ show: true, message: 'Update Successful!', variant: 'success', action: 'close' })
      })
      .catch(err => {
        setStopTransactions(isActive === 1 ? 0 : 1);
        setSnackBarParams({ show: true, message: 'Failed to update!', variant: 'error', action: 'close' })
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (snackBarParams.callback) {
      snackBarParams.callback();
    }
    setSnackBarParams({ ...snackBarParams, show: false });
  };

  useEffect(() => {
    function loadDfsps() {
      getDfsps()
        .then(dfsps => {
          // TODO: Change dfsps.ids to something like dfsps.nameFromId; similarly dfsps.names ->
          // dfsps.idFromName.
          // Augment fspList with a map of ids -> names and vice-versa.
          dfsps.ids = Object.assign(...dfsps.map(fsp => ({ [fsp.id]: fsp.name })));
          // Note that names are guaranteed unique by the db. We assume here that the concept of
          // string uniqueness in mysql is no more strict than the concept of string uniqueness in
          // node
          dfsps.names = Object.assign(...dfsps.map(fsp => ({ [fsp.name]: fsp.id })));
          setFspList(dfsps)
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            setSnackBarParams({ show: true, message: 'Timeout getting FSPs. Retry?', variant: 'error', callback: loadDfsps, action: 'retry' })
          }
          else {
            setSnackBarParams({ show: true, message: 'An error occurred trying to get the FSP list. Retry?', variant: 'error', callback: loadDfsps, action: 'retry' })
          }
        });
    }
    loadDfsps();
  }, []);

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={snackBarParams.show}
        autoHideDuration={snackBarParams.action === 'close' ? 6000 : null}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContentWrapper
          onClose={handleCloseSnackbar}
          variant={snackBarParams.variant}
          className={classes.margin}
          message={snackBarParams.message}
          action={snackBarParams.action}
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
                  <h3>Disable transactions for this DFSP</h3>
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
          {selectedFsp === undefined  ? <></> :
            <Grid container spacing={24}>
              <Grid item md={12}>
                <Paper className={classes.paper}>
                  <NDCManagement fspName={fspList.ids[selectedFsp]} />
                </Paper>
              </Grid>
              <Grid item md={12}>
                <Paper className={classes.paper}>
                  <FundsManagement fspName={fspList.ids[selectedFsp]} />
                </Paper>
              </Grid>
            </Grid>
          }
          </Grid>
        </Grid>
      }
    </div>
  );
}

FinancialMonitoringTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FinancialMonitoringTab);
