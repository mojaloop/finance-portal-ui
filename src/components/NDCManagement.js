
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

import { getNetDebitCap, updateNetDebitCap } from '../api';
import { CurrencyFormat } from './InputControl';


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


function AccountNDCManagement(props) {
  const { fspName, classes, account, onChange = () => { } } = props;

  const [busy, setBusy] = useState(false);
  const [newNDC, setNewNDC] = useState(0);

  const updateNDC = async () => {
    setBusy(true);
    try {
      const res = await updateNetDebitCap(fspName, account.currency, newNDC, account.id);
      setNewNDC(0);
      onChange(res);
    } catch (err) {
      window.alert('Error processing updating NDC');
    }
    setBusy(false);
  };

  return (
    <>
      <TextField
        label='NetDebitCap'
        className={classes.textField}
        margin='normal'
        value={newNDC}
        onFocus={ev => ev.target.select()}
        InputProps={{
          inputComponent: CurrencyFormat, suffix: ` ${account.currency}`,
          inputProps: { suffix: ` ${account.currency}` }
        }}
        variant='outlined'
        onChange={ev => setNewNDC(ev.target.value)}
      />
      <Button variant='contained' color='primary' disabled={busy} className={classes.button} onClick={updateNDC}>
        Apply
      </Button>
    </>
  );
}

AccountNDCManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  fspName: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired
};


function NDCManagement(props) {
  const { fspName, classes } = props;
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getNetDebitCap(fspName)
      .then(setAccounts)
      .catch(err => window.alert('Failed to get NDC')) // TODO: better error message, let user retry
  }, [fspName]);

  const updateAccount = updatedAccount => {
    const newAccounts = [...accounts.filter(a => updatedAccount.id !== a.id), updatedAccount];
    setAccounts(newAccounts);
  };

  return (
    <>
      <h2>Net Debit Cap Management</h2>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell><h3>Account ID</h3></TableCell>
            <TableCell align="right"><h3>Currency</h3></TableCell>
            <TableCell align="right"><h3>Position</h3></TableCell>
            <TableCell align="right"><h3>NDC</h3></TableCell>
            <TableCell align="center"><h3>New NDC</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.sort((a, b) => a.currency.localeCompare(b.currency)).map(a =>
            <TableRow key={a.id}>
              <TableCell>{a.id}</TableCell>
              <TableCell align="right">{a.currency}</TableCell>
              <TableCell align="right">{a.value}</TableCell>
              <TableCell align="right">{a.netDebitCap}</TableCell>
              <TableCell align="center">
                <AccountNDCManagement
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

NDCManagement.propTypes = {
  fspName: PropTypes.string.isRequired
};

export default withStyles(styles)(NDCManagement);
