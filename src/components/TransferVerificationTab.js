import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useUIDSeed } from 'react-uid';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from './SnackbarUtils';

import {
  validateTransferId, fetchTimeoutController,
} from '../api';

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
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  table: {
    minWidth: 800,
  },
  tableDetails: {
    minWidth: 100,
  },
  detailsDialog: {
    minWidth: 200,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

function TransferDetailsGrid(props) {
  const { transferDetails, classes } = props;
  const { transfer } = transferDetails;

  const transferUIDGenerator = useUIDSeed();
  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><h3>Transfer Id</h3></TableCell>
              <TableCell align="right"><h3>Payer</h3></TableCell>
              <TableCell align="right"><h3>Payee</h3></TableCell>
              <TableCell align="right"><h3>Created Date</h3></TableCell>
              <TableCell align="right"><h3>Is Transfer Valid</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                component="th"
                id={transferUIDGenerator('transfer-verification-id')}
                scope="row"
              >
                {transfer.transferId}
              </TableCell>
              <TableCell
                id={transferUIDGenerator('transfer-verification-payer')}
                align="right"
              >
                {transfer.payer}
              </TableCell>
              <TableCell
                id={transferUIDGenerator('transfer-verification-payee')}
                align="right"
              >
                {transfer.payee}
              </TableCell>
              <TableCell
                id={transferUIDGenerator('transfer-verification-createdDate')}
                align="right"
              >
                {transfer.createdDate}
              </TableCell>
              <TableCell
                id={transferUIDGenerator('transfer-verification-isValidTransfer')}
                align="right"
              >
                {`${transferDetails.isValidTransfer}`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

function TransferVerificationTab(props) {
  const { classes } = props;

  const [transferDetails, setTransferDetails] = useState(undefined);
  const [transferId, setTransferId] = useState('');
  const [busy, setBusy] = useState(false);
  const [snackBarParams, setSnackBarParams] = useState({ show: false, message: '', variant: 'success' });

  const validateTransfer = async () => {
    setBusy(true);
    const ftc = fetchTimeoutController({ timeoutMs: 40000 });
    validateTransferId(transferId, { ftc })
      .then((transferDetail) => {
        if (!transferDetail || transferDetail.transfer == null) {
          setSnackBarParams({
            show: true, message: 'Transfer not found', variant: 'error', action: 'close',
          });
        } else if (transferDetail.isValidTransfer !== true) {
          setSnackBarParams({
            show: true, message: 'Transfer can\'t be validated', variant: 'error', action: 'close',
          });
        }
        setTransferDetails(transferDetail);
        setBusy(false);
      })
      .catch(ftc.ignoreAbort())
      .catch(() => {
        setBusy(false);
        setSnackBarParams({
          show: true, message: 'Failed to get details!', variant: 'error', action: 'close',
        });
      });
    return ftc.abortFn;
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

  const transferVerificationUIDGenerator = useUIDSeed();
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item md={10}>
          <Paper className={classes.paper}>
            <TextField
              required
              id={transferVerificationUIDGenerator('transfer-verification-input')}
              label="Transfer ID"
              className={classes.textField}
              margin="normal"
              value={transferId}
              onFocus={(ev) => ev.target.select()}
              variant="outlined"
              onChange={(ev) => setTransferId(ev.target.value)}
            />
            <Button
              variant="contained"
              id={transferVerificationUIDGenerator('transfer-verification-button')}
              color="primary"
              disabled={busy}
              className={classes.button}
              onClick={validateTransfer}
            >
              Validate
            </Button>
          </Paper>
        </Grid>
      </Grid>
      {transferDetails && transferDetails.transfer && (
        <Grid item md={10}>
          <Paper className={classes.paper}>
            <TransferDetailsGrid transferDetails={transferDetails} classes={classes} />
          </Paper>
        </Grid>
      )}

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
    </div>
  );
}

TransferVerificationTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

TransferDetailsGrid.propTypes = {
  transferDetails: PropTypes.objectOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(TransferVerificationTab);
