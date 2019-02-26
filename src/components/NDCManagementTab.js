
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import FSPSelector from './FSPSelector';
import { getDfsps, getNetDebitCap, updateNetDebitCap } from '../api';

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


function NDCManagement(props) {
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
        variant='outlined'
        onChange={ev => setNewNDC(Number(ev.target.value))}
      />
      <Button variant='contained' color='primary' disabled={busy} className={classes.button} onClick={updateNDC}>
        UPDATE
      </Button>
    </>
  );
}

NDCManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  fspName: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired
};


// TODO: try a material card here?
// TODO: this Account component is duplicated in the FundsManagementTab. We could factor it out.
function Account(props) {
  const { account, classes, fsp, onChange = () => { } } = props;
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
        <Grid item md={6}><Paper className={classes.paper}>Position</Paper></Grid>
        <Grid item md={6}><Paper className={classes.paper}>{account.value}</Paper></Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item md={6}><Paper className={classes.paper}>NDC</Paper></Grid>
        <Grid item md={6}><Paper className={classes.paper}>{account.netDebitCap}</Paper></Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item md={6}><Paper className={classes.paper}>New NDC</Paper></Grid>
        <Grid item md={6}>
          <Paper className={classes.paper}>
            <NDCManagement
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

function NDCAccountList(props) {
  const { fsp, classes } = props;
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getNetDebitCap(fsp)
      .then(setAccounts)
      .catch(err => window.alert('Failed to get NDC')) // TODO: better error message, let user retry
  }, []);

  const updateAccount = updatedAccount => {
    const newAccounts = [...accounts.filter(a => updatedAccount.id !== a.id), updatedAccount];
    setAccounts(newAccounts);
  };

  return (
    <Grid container spacing={0}>
      {accounts.sort((a, b) => a.currency > b.currency).map(a => <Account key={a.id} account={a} classes={classes} fsp={fsp} onChange={updateAccount} />)}
    </Grid>
  );
}

function NDCManagementTab(props) {
  const { classes } = props;

  const [selectedFsp, setSelectedFsp] = useState(undefined);
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
        setFspList(dfsps);
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
                <NDCAccountList fsp={fspList.ids[selectedFsp]} classes={classes} />
              </Paper>
            </Grid>
          }
        </Grid>
      }
    </div>
  );
}

NDCManagementTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NDCManagementTab);
