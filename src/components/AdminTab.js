import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import FSPSelector from './FSPSelector';
import { getDfsps, getEmailAddresses, updateEmailAddress} from '../api';

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
    setBusy(true);
    try {
      const res = await updateEmailAddress(fspName, emailaddress.type, newEmailAddress);
      window.alert("ggb" + JSON.stringify(res));
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
  window.alert(JSON.stringify(props));
  const { emailAddress, classes, fsp, onChange = () => { } } = props;
  window.alert("ggb5" + emailAddress.type);
  window.alert("ggb6 " + emailAddress.value);
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
      getEmailAddresses(fsp)
        .then(setEmailAddresses)
        .catch(err => window.alert('Failed to get email addresses')) // TODO: better error message, let user retry
    }, [fsp]);
  
    const updateEmailAddress = updatedEmailAddress => {
      window.alert("ggb2 " + JSON.stringify(updatedEmailAddress));
      const newEmailAddress = [...emailAddresses.filter(a => updatedEmailAddress.type === a.type), updatedEmailAddress];
      window.alert("ggb3 " + JSON.stringify(newEmailAddress));
      setEmailAddresses(newEmailAddress);
    };

    return (
        <Grid container spacing={0}>
        {emailAddresses.map(a => <EmailAddress key={a.type} emailAddress={a} classes={classes} fsp={fsp} onChange={updateEmailAddress} />)}
        </Grid>
      );
      
  }

function AdminTab(props) {
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

