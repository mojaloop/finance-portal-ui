import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Grid, Dialog, Paper, Snackbar, Table, TableBody, TableCell, TableFooter, TableHead,
  TablePagination, TableRow, Typography, withStyles,
} from '@material-ui/core';
import { useUIDSeed } from 'react-uid';

import { DialogTitle, DialogContent, DialogActions } from './DialogUtils';
import TablePaginationActionsWrapped from './TablePaginationActions';
import DateRangePicker from './DateRangePicker';
import SnackbarContentWrapper from './SnackbarUtils';
import {
  getSettlementWindows, getSettlementWindowInfo, commitSettlementWindow,
  closeSettlementWindow, fetchTimeoutController,
} from '../api';
import { truncateDate } from '../utils';
import { triggerDownload, downloadReport } from '../requests';

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
});

function SettlementWindowsGrid(props) {
  const {
    settlementWindowsList, classes, startDate, endDate, refreshGridHandler,
  } = props;
  const [settlementWindowModalVisible, setSettlementWindowModalVisible] = useState(false);
  const [commitSettlementDialogVisible, setCommitSettlementDialogVisible] = useState(false);
  const [closeSettlementDialogOpen, setCloseSettlementDialogVisible] = useState(false);
  const [settlementWindowDetails, setSettlementWindowsDetails] = useState(undefined);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackBarParams, setSnackBarParams] = useState({ show: false, message: '', variant: 'success' });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows = rowsPerPage
    - Math.min(rowsPerPage, settlementWindowsList.length - page * rowsPerPage);
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
      window.alert('Error getting details'); // eslint-disable-line
    }
  };

  const confirmCommit = async () => {
    setCommitSettlementDialogVisible(false);
    handleClose();
    try {
      const updatedSettlementWindow = await
      commitSettlementWindow(settlementWindowDetails.settlementWindow.settlementWindowId,
        {
          participants: settlementWindowDetails.settlement.participants || [],
          settlementId: settlementWindowDetails.settlementId,
          startDate,
          endDate,
        });
      let newSettlementWindowsList = settlementWindowsList;
      if (updatedSettlementWindow && updatedSettlementWindow.settlementWindowId) {
        newSettlementWindowsList = [...settlementWindowsList
          .filter((a) => updatedSettlementWindow
            .settlementWindowId !== a.settlementWindowId), updatedSettlementWindow];
      }
      refreshGridHandler(newSettlementWindowsList);
      setSnackBarParams({
        show: true, message: 'Funds processed and window settled successfully!', variant: 'success', action: 'close',
      });
    } catch (err) {
      setSnackBarParams({
        show: true, message: 'Some transactions failed - window not settled. Please contact support!', variant: 'error', action: 'close',
      });
    }
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

  const confirmClose = async () => {
    setCloseSettlementDialogVisible(false);
    handleClose();
    try {
      const newSettlementWindowsList = await
      closeSettlementWindow(settlementWindowDetails.settlementWindow
        .settlementWindowId, { startDate, endDate });
      refreshGridHandler(newSettlementWindowsList);
      setSnackBarParams({
        show: true, message: 'Close Window Successful!', variant: 'success', action: 'close',
      });
    } catch (err) {
      setSnackBarParams({
        show: true, message: 'Failed to close window!', variant: 'error', action: 'close',
      });
    }
  };

  const settlementWindowGridUIDGenerator = useUIDSeed();
  const openWindowGridUIGenerator = useUIDSeed();
  return (
    <>
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
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><h3>Settlement Window Id</h3></TableCell>
              <TableCell align="right"><h3>Amount-Currency</h3></TableCell>
              <TableCell align="right"><h3>State</h3></TableCell>
              <TableCell align="right"><h3>Start Date</h3></TableCell>
              <TableCell align="right"><h3>End Date</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {settlementWindowsList.sort((a, b) => b.settlementWindowId - a.settlementWindowId)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((settlementWindow) => (
                <TableRow key={settlementWindow.settlementWindowId}>
                  <TableCell component="th" scope="row">
                    <Button
                      variant="contained"
                      color="primary"
                      id={settlementWindowGridUIDGenerator('get-details')}
                      disabled={false}
                      className={classes.button}
                      onClick={() => getDetails(settlementWindow.settlementWindowId)}
                    >
                      {settlementWindow.settlementWindowId}
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {settlementWindow.amounts}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{settlementWindow.state}</TableCell>
                  <TableCell align="right">{settlementWindow.settlementWindowOpen}</TableCell>
                  <TableCell align="right">{settlementWindow.settlementWindowClose}</TableCell>
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
        aria-labelledby="dialog-title"
        open={settlementWindowModalVisible}
        maxWidth="lg"
      >
        <DialogTitle id="dialog-title" onClose={handleClose}>
          Settlement Window Details
        </DialogTitle>
        <DialogContent>
          {settlementWindowDetails && settlementWindowDetails
            .settlementWindow && settlementWindowDetails.settlementWindow
            .settlementWindowId !== null
            && (
            <Grid container spacing={8}>
              <Grid container spacing={8}>
                <Grid item md={6}>
                  <Paper className={classes.paper}>Settlement Window Id</Paper>
                </Grid>
                <Grid item md={6}>
                  <Paper className={classes.paper}>
                    {settlementWindowDetails.settlementWindow.settlementWindowId}
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item md={6}><Paper className={classes.paper}>Status</Paper></Grid>
                <Grid item md={6}>
                  <Paper className={classes.paper}>
                    {settlementWindowDetails.settlementWindow.settlementWindowStateId}
                  </Paper>
                </Grid>
              </Grid>
              {settlementWindowDetails.totalAmount.map((currency) => (
                <Grid container spacing={8} key={Object.keys(currency)[0]}>
                  <Grid item md={6}><Paper className={classes.paper}>Total Amount</Paper></Grid>
                  <Grid item md={6}>
                    <Paper className={classes.paper}>
                      {`${currency[Object.keys(currency)[0]]} ${Object.keys(currency)[0]}`}
                    </Paper>
                  </Grid>
                </Grid>
              ))}
              <Grid container spacing={8}>
                <Grid item md={6}>
                  <Paper className={classes.paper}>Start DateTime</Paper>
                </Grid>
                <Grid item md={6}>
                  <Paper className={classes.paper}>
                    {settlementWindowDetails.settlementWindow.settlementWindowOpen}
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item md={6}><Paper className={classes.paper}>End DateTime</Paper></Grid>
                <Grid item md={6}>
                  <Paper className={classes.paper}>
                    {settlementWindowDetails.settlementWindow.settlementWindowClose}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            )}

          {settlementWindowDetails && settlementWindowDetails
            .participantAmount && settlementWindowDetails.participantAmount.length > 0
            && (
            <Grid item md={10}>
              <Table className={classes.tableDetails}>
                <TableHead>
                  <TableRow>
                    <TableCell>FSP ID</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell align="right">In Amount</TableCell>
                    <TableCell align="right">Out Amount</TableCell>
                    <TableCell align="right">Net Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {settlementWindowDetails.participantAmount
                    .sort((a, b) => a.fspId > b.fspId).map((row, index) => (
                      // eslint-disable-next-line
                      <TableRow key={index}>
                        <TableCell align="left">{row.fspId}</TableCell>
                        <TableCell align="left">{row.currency}</TableCell>
                        <TableCell align="right">{row.inAmount}</TableCell>
                        <TableCell align="right">{row.outAmount}</TableCell>
                        <TableCell align="right">{row.netAmount}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Grid>
            )}
        </DialogContent>
        <DialogActions>
          {settlementWindowDetails && settlementWindowDetails
            .settlementWindow && settlementWindowDetails
            .settlementWindow.settlementWindowId !== null
            && (
            <Grid container spacing={8}>
              <Grid item md={2}>
                <Button
                  color="primary"
                  variant="contained"
                  id={openWindowGridUIGenerator('download-payment-matrix')}
                  onClick={() => triggerDownload(`payment-file-sw/${settlementWindowDetails.settlementWindow.settlementWindowId}`)}
                >
                  Payment Matrix
                </Button>
              </Grid>
              <Grid item md={2}>
                <Button
                  onClick={() => downloadReport(`/report?reportId=312&START_DATE_TIME=${startDate.toISOString().slice(0, -5)}&END_DATE_TIME=${endDate.toISOString().slice(0, -5)}`)}
                  id={openWindowGridUIGenerator('download-312-report')}
                  color="primary"
                  variant="contained"
                >
                  HUB 312 Report
                </Button>
              </Grid>
              <Grid item md={2}>
                <Button
                  onClick={() => downloadReport('/report?reportId=644')}
                  id={openWindowGridUIGenerator('download-644-report')}
                  color="primary"
                  variant="contained"
                >
                  HUB 644 Report
                </Button>
              </Grid>
              <Grid item md={2}>
                <Button
                  color="primary"
                  variant="contained"
                  id={openWindowGridUIGenerator(`settle-window-${settlementWindowDetails.settlementWindow.settlementWindowId}`)}
                  onClick={() => setCommitSettlementDialogVisible(true)}
                  disabled={settlementWindowDetails.settlementWindow.settlementWindowStateId !== 'PENDING_SETTLEMENT'}
                >
                  Settle Window
                </Button>
              </Grid>
              <Grid item md={2}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setCloseSettlementDialogVisible(true)}
                  disabled={settlementWindowDetails.settlementWindow.settlementWindowStateId !== 'OPEN'}
                >
                  Close Window
                </Button>
              </Grid>
            </Grid>
            )}
          <Button
            onClick={handleClose}
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onClose={handleCommitClose}
        aria-labelledby="dialog-title"
        open={commitSettlementDialogVisible}
        maxWidth="md"
      >
        <DialogTitle id="dialog-title" onClose={handleCommitClose}>
          Commit Settlement Window
        </DialogTitle>
        <DialogContent>
          You are about to process funds against the DFSP settlement accounts
          according to the payment matrix for this settlement.
          Do not proceed if the settlement bank has not processed these funds.
          Do you want to proceed?
          {settlementWindowDetails && settlementWindowDetails
            .relatedSettlementWindows && settlementWindowDetails.relatedSettlementWindows.length > 0
            && (
            <div>
              There are following additional settlement windows involved in this settlement
            </div>
            )}
          {settlementWindowDetails && settlementWindowDetails
            .relatedSettlementWindows && settlementWindowDetails.relatedSettlementWindows.length > 0
            && (
            <Grid item md={10}>
              <Table className={classes.tableDetails}>
                <TableHead>
                  <TableRow>
                    <TableCell>Settlement Window ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {settlementWindowDetails.relatedSettlementWindows
                    .sort((a, b) => a.settlementWindowId - b
                      .settlementWindowId).map((row, index) => ( // eslint-disable-next-line
                        <TableRow key={index}>
                          <TableCell align="left">{row.settlementWindowId}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Grid>
            )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={confirmCommit}
            id={openWindowGridUIGenerator('confirm-commit')}
            color="primary"
          >
            Yes
          </Button>
          <Button
            onClick={handleCommitClose}
            id={openWindowGridUIGenerator('uncorfim-commit')}
            color="secondary"
            variant="contained"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onClose={handleCommitClose}
        aria-labelledby="dialog-title"
        open={closeSettlementDialogOpen}
        maxWidth="xs"
      >
        <DialogTitle id="dialog-title" onClose={handleCloseDialogClose}>
          Close Settlement Window
        </DialogTitle>
        <DialogContent>
          Are you sure, you want to close this settlement window?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={confirmClose}
            id={openWindowGridUIGenerator('confirm-commit')}
            color="primary"
          >
            Yes
          </Button>
          <Button
            onClick={handleCloseDialogClose}
            color="secondary"
            id={openWindowGridUIGenerator('uncorfim-commit')}
            variant="contained"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

SettlementWindowsGrid.propTypes = {
  settlementWindowsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  refreshGridHandler: PropTypes.func.isRequired,
};

function SettlementWindowsTab(props) {
  const { classes } = props;

  const [dates, setDates] = useState({
    from: truncateDate(new Date(Date.now() - 1000 * 60 * 60 * 24)),
    to: truncateDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * 6)),
  });
  const [settlementWindowsList, setSettlementWindowsList] = useState(undefined);

  useEffect(() => {
    const ftc = fetchTimeoutController();
    getSettlementWindows(dates, { ftc })
      .then(setSettlementWindowsList)
      .catch(ftc.ignoreAbort())
      .catch(err => window.alert('Failed to get settlement windows')); // eslint-disable-line
    // TODO: better error message, let user retry
    return ftc.abortFn;
  }, [dates]);

  return (
    <div className={classes.root}>
      {settlementWindowsList === undefined
        || (
        <Grid container spacing={24}>
          <Grid item md={10}>
            <Paper className={classes.paper}>
              <DateRangePicker
                defStartDate={dates.from}
                defEndDate={dates.to}
                onChange={setDates}
              />
            </Paper>
          </Grid>
          <Grid item md={10}>
            <Paper className={classes.paper}>
              <SettlementWindowsGrid
                settlementWindowsList={settlementWindowsList}
                classes={classes}
                endDate={dates.to}
                startDate={dates.from}
                refreshGridHandler={setSettlementWindowsList}
              />
            </Paper>
          </Grid>
        </Grid>
        )}
    </div>
  );
}

SettlementWindowsTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(SettlementWindowsTab);
