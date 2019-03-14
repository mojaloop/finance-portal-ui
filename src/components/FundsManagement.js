
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { getAccounts, processFundsIn, processFundsOut } from '../api';


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
  const { fspName, classes, account, processFn, onChange = () => {} } = props;

  const [busy, setBusy] = useState(false);
  const [fundsInAmount, setFundsIn] = useState(0);

  const actionFundsIn = async () => {
    setBusy(true);
    try {
      const res = await processFn(fspName, account.id, fundsInAmount, account.currency);
      onChange(res);
    } catch (err) {
      window.alert('Error processing funds in');
    }
    setBusy(false);
  };

  // TODO: put a slider in, have the user move the slider to make the transfer. Have the slider
  // shift back to its original position whenever the funds in amount is changed.
  // TODO: force a currency input, currently if the user enters any text there is no problem.
  return (
    <>
      <TextField
        label='Amount'
        className={classes.textField}
        margin='normal'
        value={fundsInAmount}
        variant='outlined'
        onChange={ev => setFundsIn(Number(ev.target.value))}
      />
      <Button variant='contained' color='primary' disabled={busy} className={classes.button} onClick={actionFundsIn}>
        Process
      </Button>
    </>
  )
}

AccountFundsManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  fspName: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  processFn: PropTypes.func.isRequired
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

  useEffect(() => {
    getAccounts(fspName)
      .then(accounts => setAccounts(accounts.filter(a => a.ledgerAccountType === 'SETTLEMENT')))
      .catch(err => window.alert('Failed to get accounts')) // TODO: better error message, let user retry
  }, [fspName]);

  const updateAccount = updatedAccount => {
    setAccounts([...accounts.filter(a => updatedAccount.id !== a.id), updatedAccount]);
    // TODO: what is the diff algorithm used? The following doesn't work..
    // const ix = accounts.findIndex(a => updatedAccount.id === a.id);
    // if (ix !== -1) {
    //   accounts[ix] = updatedAccount;
    //   setAccounts(accounts);
    // }
  };

  // TODO: is the value field the balance??
  return (
    <>
    <h2>Funds Management</h2>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><h3>Account ID</h3></TableCell>
          <TableCell align="right"><h3>Currency</h3></TableCell>
          <TableCell align="right"><h3>Balance</h3></TableCell>
          <TableCell align="right"><h3>Ledger Type</h3></TableCell>
          <TableCell align="right"><h3>Funds In</h3></TableCell>
          <TableCell align="right"><h3>Funds Out</h3></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {accounts.sort((a, b) => a.currency.localeCompare(b.currency)).map(a =>
        <TableRow>
          <TableCell>{a.id}</TableCell>
          <TableCell align="right">{a.currency}</TableCell>
          <TableCell align="right">{a.value}</TableCell>
          <TableCell align="right">{a.ledgerAccountType}</TableCell>
          <TableCell align="right">
            <AccountFundsManagement
              processFn={processFundsIn}
              fspName={fspName}
              account={a}
              classes={classes}
              onChange={updateAccount}
            />
          </TableCell>
          <TableCell align="right">
            <AccountFundsManagement
              processFn={processFundsOut}
              fspName={fspName}
              account={a}
              classes={classes}
              onChange={updateAccount}
            />
          </TableCell>
        </TableRow>
      )}
      </TableBody>
    </Table>
    </>
  );
}

FundsManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  fspName: PropTypes.object.isRequired
};

export default withStyles(styles)(FundsManagement);
