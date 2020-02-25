import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Snackbar, Table, TableBody, TableCell, TableRow, withStyles,
} from '@material-ui/core';

import FSPDetails from './FSPDetails';
import SnackbarContentWrapper from './SnackbarUtils';
import { getDfsps } from '../api';

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

function FinancialMonitoringTab(props) {
  const { classes } = props;

  const [selectedFsp, setSelectedFsp] = useState(undefined); // TODO: remove?
  const [fspList, setFspList] = useState(undefined);
  const [snackBarParams, setSnackBarParams] = useState({ show: false, message: '', variant: 'success' });

  const handleClickFsp = (fsp) => {
    if (!selectedFsp) {
      setSelectedFsp(fsp);
      return;
    }
    if (fsp.name === selectedFsp.name) {
      setSelectedFsp(undefined);
      return;
    }
    setSelectedFsp(fsp);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (snackBarParams.callback) {
      snackBarParams.callback();
    }
    setSnackBarParams({ ...snackBarParams, show: false });
  };

  useEffect(() => {
    // TODO: how to cancel this request on component unload if a retry is in flight?
    function loadDfsps() {
      // TODO: change getDfsps to include the promise chain, as I think this promise chain exists
      // everywhere it's used
      getDfsps()
        .then((dfsps) => {
          // TODO: Change dfsps.ids to something like dfsps.nameFromId; similarly dfsps.names ->
          // dfsps.idFromName.
          // Augment fspList with a map of ids -> names and vice-versa.
          dfsps.ids = Object // eslint-disable-line
            .assign(...dfsps.map((fsp) => ({ [fsp.id]: fsp.name })));
          // Note that names are guaranteed unique by the db. We assume here that the concept of
          // string uniqueness in mysql is no more strict than the concept of string uniqueness in
          // node
          dfsps.names = Object // eslint-disable-line
            .assign(...dfsps.map((fsp) => ({ [fsp.name]: fsp.id })));
          setFspList(dfsps.sort((a, b) => a.id - b.id));
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            setSnackBarParams({
              show: true, message: 'Timeout getting FSPs. Retry?', variant: 'error', callback: loadDfsps, action: 'retry',
            });
          } else {
            setSnackBarParams({
              show: true, message: 'An error occurred trying to get the FSP list. Retry?', variant: 'error', callback: loadDfsps, action: 'retry',
            });
          }
        });
    }
    loadDfsps();
  }, []);

  return (
    <div className={classes.root}>
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

      {fspList === undefined
        || (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableBody>
              {fspList.map((fsp) => (
                <Fragment key={fsp.id}>
                  <TableRow>
                    <TableCell component="th" scope="row" onClick={() => handleClickFsp(fsp)}>
                      {fsp.name}
                    </TableCell>
                  </TableRow>
                  {selectedFsp && fsp.name === selectedFsp.name
                    && (
                    <TableRow>
                      <TableCell>
                        <FSPDetails
                          fsp={selectedFsp}
                          fspNamesById={fspList.ids}
                          setSnackBarParams={setSnackBarParams}
                        />
                      </TableCell>
                    </TableRow>
                    )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </Paper>
        )}
    </div>
  );
}

FinancialMonitoringTab.propTypes = {
  classes: PropTypes.shape({
    margin: PropTypes.string, root: PropTypes.string, table: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(FinancialMonitoringTab);
