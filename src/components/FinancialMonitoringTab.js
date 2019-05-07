
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// TODO: export all components from components directory in an index.js, then import them all here
// in a single statement
import SettlementsList from './SettlementsList';
import TransactionAverage from './TransactionAverage';
import CurrentSettlementWindowInfo from './CurrentSettlementWindowInfo';
import PreviousSettlementWindowInfo from './PreviousSettlementWindowInfo';
import NDCManagement from './NDCManagement';
import PositionInfo from './PositionInfo';
import FundsManagement from './FundsManagement';
import Snackbar from '@material-ui/core/Snackbar';
import Switch from '@material-ui/core/Switch';
import { SnackbarContentWrapper } from './SnackbarUtils';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { getDfsps, getPositions, getCurrentWindow, getPreviousWindow, getSettlementAccountBalance,
  getParticipantIsActiveFlag, setParticipantIsActiveFlag, fetchTimeoutController } from '../api';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  table: {
    minWidth: 800,
  }
});

function FSPDetailsImpl(props) {
  const { classes, fsp, fspNamesById, setSnackBarParams } = props;

  const [positions, setPositions] = useState(undefined);
  const [settlementAccountBalance, setSettlementAccountBalance] = useState(undefined);
  const [currentSettlementWindow, setCurrentSettlementWindow] = useState(undefined);
  const [previousSettlementWindow, setPreviousSettlementWindow] = useState(undefined);
  const [stopTransactions, setStopTransactions] = useState(undefined);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const ftc = fetchTimeoutController();
    Promise.all([
      getPositions(fsp.id, { ftc }).then(setPositions),
      getCurrentWindow(fsp.id, { ftc }).then(setCurrentSettlementWindow),
      getPreviousWindow(fsp.name, { ftc }).then(setPreviousSettlementWindow),
      getSettlementAccountBalance(fsp.id, { ftc }).then(setSettlementAccountBalance),
      getParticipantIsActiveFlag(fsp.id, { ftc }).then(setStopTransactions)
    ]).then(ftc.ignoreAbort());
    return ftc.abortFn;
  }, [fsp]);

  const updateIsActiveFlag = event => {
    let isActive = event.target.checked ? 0 : 1;
    setStopTransactions(isActive);
    setParticipantIsActiveFlag(fsp.id, fsp.name, isActive)
      .then(setStopTransactions)
      .then(() => {
        setSnackBarParams({ show: true, message: 'Update Successful!', variant: 'success', action: 'close' })
      })
      .catch(err => {
        setStopTransactions(isActive === 1 ? 0 : 1);
        setSnackBarParams({ show: true, message: 'Failed to update!', variant: 'error', action: 'close' })
      });
  };

  return (
    <>
      <AppBar position='static'>
        <Tabs value={tab} onChange={(_, val) => setTab(val)}>
          <Tab label='Current Window' />
          <Tab label='Window History' />
          <Tab label='Financial Controls' />
        </Tabs>
      </AppBar>
      {tab === 0 &&
        <>
          {currentSettlementWindow && previousSettlementWindow && settlementAccountBalance && positions &&
            <Grid container spacing={24}>
              <Grid item md={12}>
                <Paper className={classes.paper}>
                  <CurrentSettlementWindowInfo currentSettlementWindow={currentSettlementWindow} />
                </Paper>
              </Grid>
              <Grid item md={12}>
                <Paper className={classes.paper}>
                  <PositionInfo positions={positions} settlementAccountBalance={settlementAccountBalance} />
                </Paper>
              </Grid>
              <Grid item md={12}>
                <Paper className={classes.paper}>
                  <SettlementsList fsp={fsp.id} fspNamesById={fspNamesById} />
                </Paper>
              </Grid>
            </Grid>
          }
        </>
      }
      {tab === 1 &&
        <Grid container spacing={24}>
          <Grid item md={12}>
            <Paper className={classes.paper}>
              <PreviousSettlementWindowInfo previousSettlementWindow={previousSettlementWindow} />
            </Paper>
          </Grid>
          <Grid item md={12}>
            <Paper className={classes.paper}>
              <TransactionAverage fsp={fsp} />
            </Paper>
          </Grid>
        </Grid>
      }
      {tab === 2 &&
        <Grid container spacing={24}>
          {stopTransactions === undefined ? <></> :
          <Grid item md={12}>
            <Paper className={classes.paper}>
              <h3>Stop the Transactions</h3>
              <Switch
                checked={stopTransactions === 0}
                onChange={updateIsActiveFlag}
                />
            </Paper>
          </Grid>
          }
          <Grid item md={12}>
            <Paper className={classes.paper}>
              <NDCManagement fspName={fsp.name} />
            </Paper>
          </Grid>
          <Grid item md={12}>
            <Paper className={classes.paper}>
              <FundsManagement fspName={fsp.name} />
            </Paper>
          </Grid>
        </Grid>
      }
    </>
  )
}

FSPDetailsImpl.propTypes = {
  classes: PropTypes.object.isRequired,
  fspNamesById: PropTypes.object.isRequired,
  fsp: PropTypes.object.isRequired
};

const FSPDetails = withStyles(styles)(FSPDetailsImpl);

function FinancialMonitoringTab(props) {
  const { classes } = props;

  const [selectedFsp, setSelectedFsp] = useState(undefined); // TODO: remove?
  const [fspList, setFspList] = useState(undefined);
  const [snackBarParams, setSnackBarParams] = useState({ show: false, message: '', variant: 'success' });

  const handleClickFsp = fsp => {
    if (!selectedFsp) {
      setSelectedFsp(fsp);
      return;
    }
    if (fsp.name === selectedFsp.name) {
      setSelectedFsp(undefined);
      return;
    }
    setSelectedFsp(fsp);
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
    // TODO: how to cancel this request on component unload if a retry is in flight?
    function loadDfsps() {
      // TODO: change getDfsps to include the promise chain, as I think this promise chain exists
      // everywhere it's used
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
          setFspList(dfsps.sort((a, b) => a.id - b.id));
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
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableBody>
              {fspList.map(fsp => (
                <Fragment key={fsp.id}>
                  <TableRow>
                    <TableCell component='th' scope='row' onClick={() => handleClickFsp(fsp)}>
                      {fsp.name}
                    </TableCell>
                  </TableRow>
                  {selectedFsp && fsp.name === selectedFsp.name &&
                    <TableRow>
                      <TableCell>
                        <FSPDetails fsp={selectedFsp} fspNamesById={fspList.ids} setSnackBarParams={setSnackBarParams} />
                      </TableCell>
                    </TableRow>
                  }
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </Paper>
      }
    </div>
  );
}

FinancialMonitoringTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FinancialMonitoringTab);
