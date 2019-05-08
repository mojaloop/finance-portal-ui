import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import FSPSelector from './FSPSelector';
import { getDfsps, getEmailAddresses, updateEmailAddress, fetchTimeoutController } from '../api';

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

function AdminManagement(props) {
  const { fspName, classes, emailaddress, onChange = () => { } } = props;

  const [busy, setBusy] = useState(false);
  const [newEmailAddress, setNewEmailAddress] = useState("");

  const updateEmail = async () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(String(newEmailAddress).toLowerCase());

    if (!result) {
      window.alert('Invalid email!');
      return;
    }
    setBusy(true);
    try {
      const res = await updateEmailAddress(fspName, emailaddress.type, newEmailAddress);
      setNewEmailAddress("");
      onChange(res);
    } catch (err) {
      window.alert('Error processing email address update');
    }
    setBusy(false);
  };

  return (
    <>
      <TextField
        label='New Email Address'
        className={classes.textField}
        margin='normal'
        value={newEmailAddress}
        variant='outlined'
        onChange={ev => setNewEmailAddress(ev.target.value)}
      />
      <Button variant='contained' color='primary' disabled={busy} className={classes.button} onClick={updateEmail}>
        UPDATE
      </Button>
    </>
  );
}

function EmailAddress(props) {
  const { emailAddress, classes, fsp, onChange = () => {} } = props;
  return (
    <Grid container spacing={8}>
      <Grid container spacing={8}>
        <Grid item md={6}><Paper className={classes.paper}>Notification Type</Paper></Grid>
        <Grid item md={6}><Paper className={classes.paper}>{emailAddress.type}</Paper></Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item md={6}><Paper className={classes.paper}>Email Address</Paper></Grid>
        <Grid item md={6}><Paper className={classes.paper}>{emailAddress.value}</Paper></Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item md={6}><Paper className={classes.paper}>New Email Address</Paper></Grid>
        <Grid item md={6}>
          <Paper className={classes.paper}>
            <AdminManagement
              fspName={fsp}
              classes={classes}
              emailaddress={emailAddress}
              onChange={onChange}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}


function EmailList(props) {
    const { fsp, classes } = props;
    const [emailAddresses, setEmailAddresses] = useState([]);

    useEffect(() => {
      const ftc = fetchTimeoutController();
      getEmailAddresses(fsp, { ftc })
        .then(setEmailAddresses)
        .catch(ftc.ignoreAbort())
        .catch(err => window.alert('Failed to get email addresses')) // TODO: better error message, let user retry
      return ftc.abortFn;
    }, [fsp]);

    const updateEmailAddress = updatedEmailAddress => {
      const newEmailAddress = [...emailAddresses.filter(a => updatedEmailAddress.type !== a.type), updatedEmailAddress];
      setEmailAddresses(newEmailAddress);
    };

    return (
      <Grid container spacing={0}>
        {emailAddresses.sort((a, b) => (a.type > b.type) ? 1 : ((b.type > a.type) ? -1 : 0)).map(a => <EmailAddress key={a.type} emailAddress={a} classes={classes} fsp={fsp} onChange={updateEmailAddress} />)}
      </Grid>
    );

  }

function AdminTab(props) {
    const { classes } = props;
    const [selectedFsp, setSelectedFsp] = useState(undefined);
    const [fspList, setFspList] = useState(undefined);

    useEffect(() => {
      const ftc = fetchTimeoutController();
      // TODO: change getDfsps in api.js. I think that everywhere it's used it has associated
      // promise chain
      getDfsps({ ftc })
        .then(dfsps => {
          // Augment fspList with a map of ids -> names and vice-versa.
          dfsps.ids = Object.assign(...dfsps.map(fsp => ({ [fsp.id]: fsp.name })));
          // Note that names are guaranteed unique by the db. We assume here that the concept of
          // string uniqueness in mysql is no more strict than the concept of string uniqueness in
          // node
          dfsps.names = Object.assign(...dfsps.map(fsp => ({ [fsp.name]: fsp.id })));
          setFspList(dfsps)
        })
        .catch(ftc.ignoreAbort())
        .catch(err => window.alert('Failed to get FSP list')); // TODO: better error message, let user retry
      return ftc.abortFn;
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
                <EmailList fsp={fspList.ids[selectedFsp]} classes={classes} />
              </Paper>
            </Grid>
            }
          </Grid>
        }
      </div>
    );
}

AdminTab.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminTab);

