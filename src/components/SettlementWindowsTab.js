
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { DateRangePicker } from './DatePicker';
import { TablePaginationActionsWrapped } from './TablePaginationActions';
import { DialogTitle, DialogContent, DialogActions } from './DialogUtils';
import Dialog from '@material-ui/core/Dialog';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContentWrapper } from './SnackbarUtils';

import { getSettlementWindows, getSettlementWindowInfo, commitSettlementWindow,
  closeSettlementWindow, fetchTimeoutController } from '../api';
import { truncateDate } from '../utils'
import { triggerDownload, downloadReport } from '../requests';

const styles = theme => ({
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
    minWidth: 100
  },
  detailsDialog: {
    minWidth: 200
  },
});


function SettlementWindowsGrid(props) {
  const { settlementWindowsList, classes, startDate, endDate, refreshGridHandler } = props;
  const [settlementWindowModalVisible, setSettlementWindowModalVisible] = useState(false);
  const [commitSettlementDialogVisible, setCommitSettlementDialogVisible] = useState(false);
  const [closeSettlementDialogOpen, setCloseSettlementDialogVisible] = useState(false);
  const [settlementWindowDetails, setSettlementWindowsDetails] = useState(undefined);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackBarParams, setSnackBarParams] = useState({ show: false, message: '', variant: 'success' });

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value));
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, settlementWindowsList.length - page * rowsPerPage);
  const handleClose = () => {
    setSettlementWindowModalVisible(false);
  };
  const handleCommitClose = () => {
    setCommitSettlementDialogVisible(false);
  };

  const handleCloseDialogClose = () => {
    setCloseSettlementDialogVisible(false);
  };

  const getDetails = async (settlementWindowId) => {
    try {
      setSettlementWindowsDetails(await getSettlementWindowInfo(settlementWindowId));
      setSettlementWindowModalVisible(true);
    } catch (err) {
      window.alert('Error getting details');
    }
  };

  const confirmCommit = async () => {
    setCommitSettlementDialogVisible(false);
    handleClose();
    try {
      const updatedSettlementWindow = await commitSettlementWindow(settlementWindowDetails.settlementWindow.settlementWindowId,
        {
          participants: settlementWindowDetails.settlement.participants || [],
          settlementId: settlementWindowDetails.settlementId,
          startDate,
          endDate
        });
      let newSettlementWindowsList = settlementWindowsList;
      if (updatedSettlementWindow && updatedSettlementWindow.settlementWindowId) {
        newSettlementWindowsList = [...settlementWindowsList.filter(a => updatedSettlementWindow.settlementWindowId !== a.settlementWindowId), updatedSettlementWindow];
      }
      refreshGridHandler(newSettlementWindowsList);
      setSnackBarParams({ show: true, message: 'Commit Successful!', variant: 'success', action: 'close' });
    } catch (err) {
      setSnackBarParams({ show: true, message: 'Failed to commit!', variant: 'error', action: 'close' })
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (snackBarParams.callback) {
      snackBarParams.callback();
    }
    setSnackBarParams({ ...snackBarParams, show: false });
  };

  const confirmClose = async () => {
    setCloseSettlementDialogVisible(false);
    handleClose();
    try {
      const updatedSettlementWindow = await closeSettlementWindow(settlementWindowDetails.settlementWindow.settlementWindowId, { startDate, endDate });
      let newSettlementWindowsList = settlementWindowsList;
      if (updatedSettlementWindow && updatedSettlementWindow.settlementWindowId) {
        newSettlementWindowsList = [...settlementWindowsList.filter(a => updatedSettlementWindow.settlementWindowId !== a.settlementWindowId), updatedSettlementWindow];
      }
      refreshGridHandler(newSettlementWindowsList);
      setSnackBarParams({ show: true, message: 'Close Window Successful!', variant: 'success', action: 'close' });
    } catch (err) {
      setSnackBarParams({ show: true, message: 'Failed to close window!', variant: 'error', action: 'close' })
    }
  };


  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
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
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><h3>SettlementWindow Id</h3></TableCell>
              <TableCell align='right'><h3>State</h3></TableCell>
              <TableCell align='right'><h3>Created Date</h3></TableCell>
              <TableCell align='right'><h3>Changed Date</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {settlementWindowsList.sort((a, b) => b.settlementWindowId - a.settlementWindowId).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(settlementWindow => (
              <TableRow key={settlementWindow.settlementWindowId}>
                <TableCell component='th' scope='row'>
                  <Button variant='contained' color='primary' disabled={false} className={classes.button} onClick={() => getDetails(settlementWindow.settlementWindowId)}>
                    {settlementWindow.settlementWindowId}
                  </Button>
                </TableCell>
                <TableCell align='right'>{settlementWindow.state}</TableCell>
                <TableCell align='right'>{settlementWindow.createdDate}</TableCell>
                <TableCell align='right'>{settlementWindow.changedDate}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                colSpan={3}
                count={settlementWindowsList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
      <Dialog
        onClose={handleClose}
        aria-labelledby='dialog-title'
        open={settlementWindowModalVisible}
        maxWidth='lg'
      >
        <DialogTitle id='dialog-title' onClose={handleClose}>
          Settlement Window Details
        </DialogTitle>
        <DialogContent>
          {settlementWindowDetails && settlementWindowDetails.settlementWindow && settlementWindowDetails.settlementWindow.settlementWindowId !== null &&
            <Grid container spacing={8}>
              <Grid container spacing={8}>
                <Grid item md={6}><Paper className={classes.paper}>Settlement Window ID</Paper></Grid>
                <Grid item md={6}><Paper className={classes.paper}>{settlementWindowDetails.settlementWindow.settlementWindowId}</Paper></Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item md={6}><Paper className={classes.paper}>Status</Paper></Grid>
                <Grid item md={6}><Paper className={classes.paper}>{settlementWindowDetails.settlementWindow.settlementWindowStateId}</Paper></Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item md={6}><Paper className={classes.paper}>Total Amount</Paper></Grid>
                <Grid item md={6}><Paper className={classes.paper}>{settlementWindowDetails.settlementWindow.amount}</Paper></Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item md={6}><Paper className={classes.paper}>Currency</Paper></Grid>
                <Grid item md={6}><Paper className={classes.paper}>{settlementWindowDetails.settlementWindow.currencyId}</Paper></Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item md={6}><Paper className={classes.paper}>Start DateTime</Paper></Grid>
                <Grid item md={6}><Paper className={classes.paper}>{settlementWindowDetails.settlementWindow.settlementWindowOpen}</Paper></Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item md={6}><Paper className={classes.paper}>End DateTime</Paper></Grid>
                <Grid item md={6}><Paper className={classes.paper}>{settlementWindowDetails.settlementWindow.settlementWindowClose}</Paper></Grid>
              </Grid>
            </Grid>
          }

          {settlementWindowDetails && settlementWindowDetails.participantAmount && settlementWindowDetails.participantAmount.length > 0 &&
            <Grid item md={10}>
              <Table className={classes.tableDetails}>
                <TableHead>
                  <TableRow>
                    <TableCell>FSP ID</TableCell>
                    <TableCell align='right'>In Amount</TableCell>
                    <TableCell align='right'>Out Amount</TableCell>
                    <TableCell align='right'>Net Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {settlementWindowDetails.participantAmount.sort((a, b) => a.fspId > b.fspId).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align='left'>{row.fspId}</TableCell>
                      <TableCell align='right'>{row.inAmount}</TableCell>
                      <TableCell align='right'>{row.outAmount}</TableCell>
                      <TableCell align='right'>{row.netAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          }
        </DialogContent>
        <DialogActions>
          {settlementWindowDetails && settlementWindowDetails.settlementWindow && settlementWindowDetails.settlementWindow.settlementWindowId !== null &&
            <Grid container spacing={8}>
              <Grid item md={2}>
                <Button color='primary' variant='contained' onClick={() => triggerDownload(`payment-file-sw/${settlementWindowDetails.settlementWindow.settlementWindowId}`)}>
                  Download PM
                </Button>
              </Grid>
              <Grid item md={2}>
                <Button onClick={() => downloadReport(`/report?reportId=312&START_DATE_TIME=${startDate}&END_DATE_TIME=${endDate}`)} color='primary' variant='contained'>
                  HUB 312 Report
                </Button>
              </Grid>
              <Grid item md={2}>
                <Button onClick={() => downloadReport(`/report?reportId=644`)} color='primary' variant='contained'>
                  HUB 644 Report
                </Button>
              </Grid>
              <Grid item md={2}>
                <Button color='primary' variant='contained' onClick={() => setCommitSettlementDialogVisible(true)} disabled={settlementWindowDetails.settlementWindow.settlementWindowStateId !== 'PENDING_SETTLEMENT'}>
                  Commit Window
                </Button>
              </Grid>
              <Grid item md={2}>
                <Button color='primary' variant='contained' onClick={() => setCloseSettlementDialogVisible(true)} disabled={settlementWindowDetails.settlementWindow.settlementWindowStateId !== 'OPEN'}>
                  Close Window
                </Button>
              </Grid>
            </Grid>
          }
          <Button onClick={handleClose} color='secondary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onClose={handleCommitClose}
        aria-labelledby='dialog-title'
        open={commitSettlementDialogVisible}
        maxWidth='xs'
      >
        <DialogTitle id='dialog-title' onClose={handleCommitClose}>
          Commit Settlement Window
        </DialogTitle>
        <DialogContent>
          Are you sure, you want to commit this settlement window?
          {settlementWindowDetails && settlementWindowDetails.relatedSettlementWindows && settlementWindowDetails.relatedSettlementWindows.length > 0 &&
            <div>
              There are following additional settlement windows involved in this settlement
            </div>
          }
          {settlementWindowDetails && settlementWindowDetails.relatedSettlementWindows && settlementWindowDetails.relatedSettlementWindows.length > 0 &&
            <Grid item md={10}>
              <Table className={classes.tableDetails}>
                <TableHead>
                  <TableRow>
                    <TableCell>SettlementWindow ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {settlementWindowDetails.relatedSettlementWindows.sort((a, b) => a.settlementWindowId > b.settlementWindowId).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align='left'>{row.settlementWindowId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmCommit} color='primary'>
            Yes
          </Button>
          <Button onClick={handleCommitClose} color='secondary' variant='contained'>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onClose={handleCommitClose}
        aria-labelledby='dialog-title'
        open={closeSettlementDialogOpen}
        maxWidth='xs'
      >
        <DialogTitle id='dialog-title' onClose={handleCloseDialogClose}>
          Close Settlement Window
        </DialogTitle>
        <DialogContent>
          Are you sure, you want to close this settlement window?
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmClose} color='primary'>
            Yes
          </Button>
          <Button onClick={handleCloseDialogClose} color='secondary' variant='contained'>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

}

function SettlementWindowsTab(props) {
  const { classes } = props;

  const [dates, setDates] = useState({
    from: truncateDate(new Date(Date.now() + 1000 * 60 * 60 * 24)),
    to: truncateDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 6))
  });
  const [settlementWindowsList, setSettlementWindowsList] = useState(undefined);

  useEffect(() => {
    const ftc = fetchTimeoutController();
    getSettlementWindows(dates, { ftc })
      .then(setSettlementWindowsList)
      .catch(ftc.ignoreAbort())
      .catch(err => window.alert('Failed to get settlement windows')); // TODO: better error message, let user retry
    return ftc.abortFn;
  }, [dates]);

  return (
    <div className={classes.root}>
      {settlementWindowsList === undefined ||
        <Grid container spacing={24}>
          <Grid item md={10}>
            <Paper className={classes.paper}>
              <DateRangePicker defStartDate={dates.from} defEndDate={dates.to} onChange={setDates} />
            </Paper>
          </Grid>

          <Grid item md={10}>
            <Paper className={classes.paper}>
              <SettlementWindowsGrid settlementWindowsList={settlementWindowsList} classes={classes} endDate={dates.to} startDate={dates.from} refreshGridHandler={setSettlementWindowsList} />
            </Paper>
          </Grid>
        </Grid>
      }
    </div>
  );
}

SettlementWindowsTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettlementWindowsTab);
