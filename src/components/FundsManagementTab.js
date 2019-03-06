
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import FSPSelector from './FSPSelector';
import { getDfsps, getAccounts, processFundsIn, processFundsOut } from '../api';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


// Handles funds in and funds out requests
function FundsManagement(props) {
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

FundsManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  fspName: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  processFn: PropTypes.func.isRequired
};


// TODO: try a material card here?
function Account(props) {
  const { account, classes, fsp, onChange = () => {} } = props;
  return (
    <Grid container spacing={8}>
      <Grid container spacing={8}>
        <Grid item md={6}><Paper className={classes.paper}>Account ID</Paper></Grid>
        <Grid item md={6}><Paper className={classes.paper}>{account.id}</Paper></Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item md={6}><Paper className={classes.paper}>Currency</Paper></Grid>
        <Grid item md={6}><Paper className={classes.paper}>{account.currency}</Paper></Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item md={6}><Paper className={classes.paper}>Value</Paper></Grid>
        <Grid item md={6}><Paper className={classes.paper}>{account.value}</Paper></Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item md={6}><Paper className={classes.paper}>Type</Paper></Grid>
        <Grid item md={6}><Paper className={classes.paper}>{account.ledgerAccountType}</Paper></Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item md={6}><Paper className={classes.paper}>Funds In</Paper></Grid>
        <Grid item md={6}>
          <Paper className={classes.paper}>
            <FundsManagement
              processFn={processFundsIn}
              fspName={fsp}
              account={account}
              classes={classes}
              onChange={onChange}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item md={6}><Paper className={classes.paper}>Funds Out</Paper></Grid>
        <Grid item md={6}>
          <Paper className={classes.paper}>
            <FundsManagement
              processFn={processFundsOut}
              fspName={fsp}
              account={account}
              classes={classes}
              onChange={onChange}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

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
function AccountsList(props) {
  const { fsp, classes } = props;
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts(fsp)
      .then(accounts => setAccounts(accounts.filter(a => a.ledgerAccountType === 'SETTLEMENT')))
      .catch(err => window.alert('Failed to get accounts')) // TODO: better error message, let user retry
  }, [fsp]);

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
    <Grid container spacing={0}>
    {accounts.map(a => <Account key={a.id} account={a} classes={classes} fsp={fsp} onChange={updateAccount} />)}
    </Grid>
  );
}

function FundsManagementTab(props) {
  const { classes } = props;

  const [selectedFsp, setSelectedFsp] = useState(undefined); // TODO: remove?
  const [fspList, setFspList] = useState(undefined);

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
    {fspList === undefined ||
      <Grid container spacing={24}>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            <FSPSelector selectFsp={setSelectedFsp} fspList={fspList} />
          </Paper>
        </Grid>
        {selectedFsp &&
        <Grid item md={8}>
          <Paper className={classes.paper}>
            <AccountsList fsp={fspList.ids[selectedFsp]} classes={classes} />
          </Paper>
        </Grid>
        }
      </Grid>
    }
    </div>
  );
}

FundsManagementTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FundsManagementTab);
