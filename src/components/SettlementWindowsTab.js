
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
import { truncateDate } from '../utils'

import Dialog from '@material-ui/core/Dialog';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import { getSettlementWindows, getSettlementWindowInfo } from '../api';

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
  const { settlementWindowsList, classes } = props;
  const [open, setOpen] = useState(false);
  const [settlementWindowStatus, setSettlementWindowStatus] = useState(false);
  const [settlementWindowDetails, setSettlementWindowsDetails] = useState(undefined);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value));
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, settlementWindowsList.length - page * rowsPerPage);
  const handleClose = () => {
    setOpen(false);
  };

  const getDetails = async (settlementWindowId, status) => {
    try {
      setSettlementWindowStatus(status);
      getSettlementWindowInfo(settlementWindowId).then(setSettlementWindowsDetails).then(() => setOpen(true));
    } catch (err) {
      window.alert('Error getting details');
    }
  };

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><h3>SettlementWindow Id</h3></TableCell>
              <TableCell align="right"><h3>State</h3></TableCell>
              <TableCell align="right"><h3>Created Date</h3></TableCell>
              <TableCell align="right"><h3>Changed Date</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {settlementWindowsList.sort((a, b) => b.settlementWindowId - a.settlementWindowId).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(settlementWindow => (
              <TableRow key={settlementWindow.settlementWindowId}>
                <TableCell component="th" scope="row">
                  <Button variant='contained' color='primary' disabled={false} className={classes.button} onClick={() => getDetails(settlementWindow.settlementWindowId, settlementWindow.state)}>
                    {settlementWindow.settlementWindowId}
                  </Button>
                </TableCell>
                <TableCell align="right">{settlementWindow.state}</TableCell>
                <TableCell align="right">{settlementWindow.createdDate}</TableCell>
                <TableCell align="right">{settlementWindow.changedDate}</TableCell>
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
        open={open}
      >
        <DialogTitle id="dialog-title" onClose={handleClose}>
          Settlement Window Details
          </DialogTitle>
        <DialogContent>
          {settlementWindowDetails && settlementWindowDetails.settlementWindow && settlementWindowDetails.settlementWindow.settlementWindowId != null &&
            <Grid container spacing={8}>
              <Grid container spacing={8}>
                <Grid item md={6}><Paper className={classes.paper}>Settlement Window ID</Paper></Grid>
                <Grid item md={6}><Paper className={classes.paper}>{settlementWindowDetails.settlementWindow.settlementWindowId}</Paper></Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item md={6}><Paper className={classes.paper}>Status</Paper></Grid>
                <Grid item md={6}><Paper className={classes.paper}>{settlementWindowStatus}</Paper></Grid>
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
                <Grid item md={6}><Paper className={classes.paper}>Start Date</Paper></Grid>
                <Grid item md={6}><Paper className={classes.paper}>{settlementWindowDetails.settlementWindow.settlementWindowOpen}</Paper></Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item md={6}><Paper className={classes.paper}>End Date</Paper></Grid>
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
                    <TableCell align="right">In Amount</TableCell>
                    <TableCell align="right">Out Amount</TableCell>
                    <TableCell align="right">Net Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {settlementWindowDetails.participantAmount.sort((a, b) => a.fspId > b.fspId).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="right">{row.fspId}</TableCell>
                      <TableCell align="right">{row.inAmount}</TableCell>
                      <TableCell align="right">{row.outAmount}</TableCell>
                      <TableCell align="right">{row.netAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );

}

function SettlementWindowsTab(props) {
  const { classes } = props;
  const to = truncateDate(new Date(Date.now() + 1000 * 60 * 60 * 24));
  const from = truncateDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 6));
  const [settlementWindowsList, setSettlementWindowsList] = useState(undefined);

  const updateQuery = (startDate, endDate) => {
    getSettlementWindows({ startDate, endDate })
      .then(setSettlementWindowsList)
      .catch(err => window.alert('Failed to get settlement windows')); // TODO: better error message, let user retry
  };

  useEffect(() => updateQuery(from, to), []);

  return (
    <div className={classes.root}>
      {settlementWindowsList === undefined ||
        <Grid container spacing={24}>
          <Grid item md={10}>
            <Paper className={classes.paper}>
              <DateRangePicker defStartDate={from} defEndDate={to} onChange={updateQuery} />
            </Paper>
          </Grid>

          <Grid item md={10}>
            <Paper className={classes.paper}>
              <SettlementWindowsGrid settlementWindowsList={settlementWindowsList} classes={classes} />
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
