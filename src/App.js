import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const endpoint = 'http://localhost:3002';
const fetchOpts = { headers: { 'accept': 'application/json' } };

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function SettlementWindowInfo(props) {
  return (
    <div className="current-window">
      <div>Payments: {props.settlementWindow.payments.numTransactions}</div>
      <div>Amount: {props.settlementWindow.payments.senderAmount}</div>
      <div>Receipts: {props.settlementWindow.receipts.numTransactions}</div>
      <div>Amount: {props.settlementWindow.receipts.senderAmount}</div>
      {props.positions.map(p =>
        <div key={p.participantLimitId} className="position">
          <div>Currency: {p.currency}</div>
          <div>Limit: {p.limit}</div>
          <div>Position: {p.position}</div>
        </div>
      )}
    </div>
  );
}

function FSPSelector(props) {
  return (
    <List>
      {props.fspList.sort((a, b) => a.id > b.id).map(fsp =>
        <ListItem key={fsp.id} button onClick={props.selectFsp.bind(null, fsp.id)}>
          <ListItemText>[{fsp.id}] | {fsp.name}</ListItemText>
        </ListItem>
      )}
    </List>
  );
}

function App(props) {
  const { classes, fspList } = props;
  const [settlementWindowState, setSettlementWindowState] = useState(undefined);
  const [selectedFsp, setSelectedFsp] = useState(undefined);
  const fetchCurrentWindow = async (dfspId) => {
    const newState = await fetch(`${endpoint}/current-window/${dfspId}`, fetchOpts).then(res => res.json());
    console.log(newState);
    setSettlementWindowState(newState);
  };
  const selectFsp = async (dfspId) => {
    await fetchCurrentWindow(dfspId);
    setSelectedFsp(dfspId); // TODO: necessary?
  };
  useEffect(() => fetchCurrentWindow, []);
  // TODO: what are the md props on Grid?
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item md={12} />
        <Grid item md={4}>
          <Paper className={classes.paper}>
            <FSPSelector selectedFsp={selectedFsp} selectFsp={selectFsp} fspList={fspList} />
          </Paper>
        </Grid>
        <Grid item md={8}>
          <Paper className={classes.paper}>
            {settlementWindowState === undefined ? <></> : <SettlementWindowInfo settlementWindow={settlementWindowState.window} positions={settlementWindowState.positions} />}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
