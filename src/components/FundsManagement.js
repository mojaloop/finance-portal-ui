/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { SnackbarContentWrapper } from './SnackbarUtils';

import { sleep } from '../utils';
import {
  getAccounts, getParticipantAccountById, processFundsIn, processFundsOut,
  fetchTimeoutController, getTransfer,
} from '../api';
import { HTTPResponseError } from '../requests';
import { CurrencyFormat } from './InputControl';
import ConfirmDailog from './ConfirmDailog';
import '@reach/dialog/styles.css';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  table: {
    minWidth: 800,
  },
  input: {
    display: 'none',
  },
});


// Handles funds in and funds out requests
function AccountFundsManagement(props) {
  const {
    transferCompleteState, fspName, classes, account, processFn, setSnackBarParams, onChange = () => {},
  } = props;

  const [busy, setBusy] = useState(false);
  const [fundsInAmount, setFundsIn] = useState(0);
  const transferNotCommittedMessage = 'Transfer not committed';

  const actionFundsIn = async () => {
    setBusy(true);
    try {
      const { transferId } = await processFn(fspName, account.id, fundsInAmount, account.currency);

      // Now we'll make a couple of attempts to check the transfer status with some delays in
      // between
      const ignore404 = (err) => {
        if (err instanceof HTTPResponseError && err.getData().resp.message === 'Transfer not found') {
          return {};
        }
        throw err;
      };

      const f = res => ((res && res.transferStateId === transferCompleteState)
        ? res : sleep(500).then(() => getTransfer(transferId)).catch(ignore404));

      const transferState = await f({}).then(f).then(f).then(f)
        .then(f);

      if (transferState.transferStateId !== transferCompleteState) {
        throw new Error(transferNotCommittedMessage);
      }
      setFundsIn(0);
      onChange(await getParticipantAccountById(fspName, account.id));
    } catch (err) {
      let message = 'Error processing transaction';
      // TODO: in the following line, why getData().resp.resp.message?!
      if (err instanceof HTTPResponseError && err.getData().resp.resp.message === 'Participant is currently set inactive') {
        message = `ERROR: ${err.getData().resp.resp.message}`;
      } else if (err.message === transferNotCommittedMessage) {
        message = 'Transaction unsuccessful. Please refresh the page before trying again.';
      }

      setSnackBarParams({
        show: true,
        message,
        variant: 'error',
        action: 'close',
      });
    }
    setBusy(false);
  };

  // TODO: put a slider in, have the user move the slider to make the transfer. Have the slider
  // shift back to its original position whenever the funds in amount is changed.
  return (
    <ConfirmDailog title="Confirm" description="Are you sure you want to process this?">
      {confirm => (
        <div>
          <TextField
            label="Amount"
            className={classes.textField}
            margin="normal"
            value={fundsInAmount}
            onFocus={ev => ev.target.select()}
            InputProps={{
              inputComponent: CurrencyFormat,
              suffix: ` ${account.currency}`,
              inputProps: { suffix: ` ${account.currency}` },
            }}
            variant="outlined"
            onChange={ev => setFundsIn(ev.target.value)}
          />
          <Button variant="contained" color="primary" disabled={busy} className={classes.button} onClick={confirm(actionFundsIn)}>
            Process
          </Button>
        </div>
      )
            }
    </ConfirmDailog>
  );
}

AccountFundsManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  transferCompleteState: PropTypes.string.isRequired,
  fspName: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  processFn: PropTypes.func.isRequired,
  setSnackBarParams: PropTypes.func.isRequired,
};


// 'accounts' looks like this:
// [
//   {
//     "id": 3,
//     "ledgerAccountType": "POSITION",
//     "currency": "XOF",
//     "isActive": 1,
//     "value": 0,
//     "reservedValue": 0,
//     "changedDate": "2019-02-11T21:51:16.000Z"
//   },
//   {
//     "id": 4,
//     "ledgerAccountType": "SETTLEMENT",
//     "currency": "XOF",
//     "isActive": 1,
//     "value": -20000,
//     "reservedValue": 0,
//     "changedDate": "2019-01-31T10:59:51.000Z"
//   }
// ]
function FundsManagement(props) {
  const { fspName, classes } = props;
  const [accounts, setAccounts] = useState([]);
  const [snackBarParams, setSnackBarParams] = useState({ show: false, message: '', variant: 'success' });

  useEffect(() => {
    const ftc = fetchTimeoutController();
    getAccounts(fspName, { ftc })
      .then(accounts => setAccounts(accounts.filter(a => a.ledgerAccountType === 'SETTLEMENT')))
      .catch(ftc.ignoreAbort())
      .catch(err => window.alert('Failed to get accounts')); // TODO: better error message, let user retry
    return ftc.abortFn;
  }, [fspName]);

  const updateAccount = (updatedAccount) => {
    setAccounts([...accounts.filter(a => updatedAccount.id !== a.id), updatedAccount]);
    // TODO: what is the diff algorithm used? The following doesn't work..
    // const ix = accounts.findIndex(a => updatedAccount.id === a.id);
    // if (ix !== -1) {
    //   accounts[ix] = updatedAccount;
    //   setAccounts(accounts);
    // }
  };

  // TODO: this function is the same everywhere we use the snackbar. Can we parametrise it?
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (snackBarParams.callback) {
      snackBarParams.callback();
    }
    setSnackBarParams({ ...snackBarParams, show: false });
  };

  // TODO: is the value field the balance??
  return (
    <>
      <h2>Funds Management</h2>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><h3>Account ID</h3></TableCell>
            <TableCell align="right"><h3>Currency</h3></TableCell>
            <TableCell align="right"><h3>Value</h3></TableCell>
            <TableCell align="right"><h3> Type</h3></TableCell>
            <TableCell align="center"><h3>Funds In</h3></TableCell>
            <TableCell align="center"><h3>Funds Out</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.sort((a, b) => a.currency.localeCompare(b.currency)).map(a => (
            <TableRow key={a.id}>
              <TableCell>{a.id}</TableCell>
              <TableCell align="right">{a.currency}</TableCell>
              <TableCell align="right">{a.value}</TableCell>
              <TableCell align="right">{a.ledgerAccountType}</TableCell>
              <TableCell align="center">
                <AccountFundsManagement
                  transferCompleteState="COMMITTED"
                  processFn={processFundsIn}
                  fspName={fspName}
                  account={a}
                  classes={classes}
                  onChange={updateAccount}
                  setSnackBarParams={setSnackBarParams}
                />
              </TableCell>
              <TableCell align="center">
                <AccountFundsManagement
                  transferCompleteState="RESERVED"
                  processFn={processFundsOut}
                  fspName={fspName}
                  account={a}
                  classes={classes}
                  onChange={updateAccount}
                  setSnackBarParams={setSnackBarParams}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

FundsManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  fspName: PropTypes.string.isRequired,
};

export default withStyles(styles)(FundsManagement);
