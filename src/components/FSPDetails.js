import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Grid, Paper, Switch, Tab, Tabs, withStyles,
} from '@material-ui/core';
import { useUIDSeed } from 'react-uid';

import CurrentSettlementWindowInfo from './CurrentSettlementWindowInfo';
import PositionInfo from './PositionInfo';
import SettlementsList from './SettlementsList';
import PreviousSettlementWindowInfo from './PreviousSettlementWindowInfo';
import TransactionAverage from './TransactionAverage';
import NDCManagement from './NDCManagement';
import FundsManagement from './FundsManagement';
import { fetchTimeoutController } from '../requests';
import {
  getCurrentWindow, getParticipantIsActiveFlag,
  getPositions,
  getPreviousWindow,
  getSettlementAccountBalance, setParticipantIsActiveFlag,
} from '../api';

const styles = (theme) => ({
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
  },
});

function FSPDetails(props) {
  const {
    classes, fsp, fspNamesById, setSnackBarParams,
  } = props;

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
      getParticipantIsActiveFlag(fsp.id, { ftc }).then(setStopTransactions),
    ]).then(ftc.ignoreAbort());
    return ftc.abortFn;
  }, [fsp]);

  const updateIsActiveFlag = (event) => {
    const isActive = event.target.checked ? 0 : 1;
    setStopTransactions(isActive);
    setParticipantIsActiveFlag(fsp.id, fsp.name, isActive)
      .then(setStopTransactions)
      .then(() => {
        setSnackBarParams({
          show: true, message: 'Update Successful!', variant: 'success', action: 'close',
        });
      })
      .catch(() => {
        setStopTransactions(isActive === 1 ? 0 : 1);
        setSnackBarParams({
          show: true, message: 'Failed to update!', variant: 'error', action: 'close',
        });
      });
  };

  const financialControlsUIDGenerator = useUIDSeed();

  return (
    <>
      <AppBar position="static">
        <Tabs value={tab} onChange={(_, val) => setTab(val)}>
          <Tab label="Current Window" />
          <Tab label="Window History" />
          <Tab label="Financial Controls" />
        </Tabs>
      </AppBar>
      {tab === 0
      && (
        <>
          {currentSettlementWindow
          && previousSettlementWindow && settlementAccountBalance && positions
          && (
            <Grid container spacing={24}>
              <Grid item md={12}>
                <Paper className={classes.paper}>
                  <CurrentSettlementWindowInfo currentSettlementWindow={currentSettlementWindow} />
                </Paper>
              </Grid>
              <Grid item md={12}>
                <Paper className={classes.paper}>
                  <PositionInfo
                    positions={positions}
                    settlementAccountBalance={settlementAccountBalance}
                  />
                </Paper>
              </Grid>
              <Grid item md={12}>
                <Paper className={classes.paper}>
                  <SettlementsList fsp={fsp.id} fspNamesById={fspNamesById} />
                </Paper>
              </Grid>
            </Grid>
          )}
        </>
      )}
      {tab === 1 && previousSettlementWindow
      && (
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
      )}
      {tab === 2
      && (
        <Grid container spacing={24}>
          {stopTransactions === undefined ? <></>
            : (
              <Grid item md={12}>
                <Paper className={classes.paper}>
                  <h3>Disable transactions for DFSP</h3>
                  <Switch
                    id={
                      financialControlsUIDGenerator(`stop-transacions-${fsp.name}`)
                    }
                    checked={stopTransactions === 0}
                    onChange={updateIsActiveFlag}
                  />
                </Paper>
              </Grid>
            )}
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
      )}
    </>
  );
}

FSPDetails.propTypes = {
  classes: PropTypes.shape({ paper: PropTypes.string }).isRequired,
  fsp: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }).isRequired,
  fspNamesById: PropTypes.shape({ id: PropTypes.string }).isRequired,
  setSnackBarParams: PropTypes.func.isRequired,
};

export default withStyles(styles)(FSPDetails);
