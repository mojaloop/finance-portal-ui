
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// TODO: export all components from components directory in an index.js, then import them all here
// in a single statement
import SettlementsList from './SettlementsList';
import SettlementWindowInfo from './SettlementWindowInfo';
import FSPSelector from './FSPSelector';
import { get } from '../requests';

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

function SettlementsTab(props) {
  const { classes } = props;

  const [settlements, setSettlements] = useState(undefined);
  const [settlementWindowState, setSettlementWindowState] = useState(undefined);
  const [selectedFsp, setSelectedFsp] = useState(undefined); // TODO: remove?
  const [fspList, setFspList] = useState(undefined);

  const selectFsp = async (dfspId) => {
    const [win, settlements] = await Promise.all(([
      get(`current-window/${dfspId}`),
      get(`settlements/${dfspId}`)
    ]));
    setSettlementWindowState(win);
    setSettlements(settlements);
    setSelectedFsp(dfspId);
  };

  const getFspList = () => {
    get('dfsps')
      .then(dfsps => {
        // Augment fspList with a map of ids -> names and vice-versa.
        dfsps.ids = Object.assign(...dfsps.map(fsp => ({ [fsp.id]: fsp.name })));
        // Note that names are guaranteed unique by the db. We assume here that the concept of
        // string uniqueness in mysql is no more strict than the concept of string uniqueness in
        // node
        dfsps.names = Object.assign(...dfsps.map(fsp => ({ [fsp.name]: fsp.id })));
        setFspList(dfsps)
      })
      .catch(err => window.alert('Failed to get FSPS')); // TODO: better error message, let user retry
  };

  useEffect(() => {
    getFspList();
  }, []);

  return (
    <div className={classes.root}>
    {fspList === undefined ||
      <Grid container spacing={24}>
        <Grid item md={12} />
        <Grid item md={4}>
          <Paper className={classes.paper}>
            <FSPSelector selectFsp={selectFsp} fspList={fspList} />
          </Paper>
        </Grid>
        {settlementWindowState === undefined || settlements === undefined ? <></> :
        <Grid item md={8}>
          <Grid container spacing={24}>
            <Grid item md={12}>
              <Paper className={classes.paper}>
                <SettlementWindowInfo settlementWindow={settlementWindowState.window} positions={settlementWindowState.positions} />
              </Paper>
            </Grid>
            <Grid item md={12}>
              <Paper className={classes.paper}>
                <SettlementsList selectedFsp={selectedFsp} settlements={settlements} fspList={fspList} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        }
      </Grid>
    }
    </div>
  );
}

SettlementsTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettlementsTab);
