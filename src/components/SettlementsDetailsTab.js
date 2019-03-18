
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
import { getSettlementList, commitSettlement } from '../api';

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
  paperDetails: {
    padding: theme.spacing.unit * 3,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: 500
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
    minWidth: 500
  },
  detailsDialog: {
    minWidth: 500
  },
});


function SettlementsGrid(props) {
  const { settlementsList, classes, startDate, endDate, refreshGridHandler } = props;
  const [open, setOpen] = useState(false);
  const [settlementDetails, setSettlementsDetails] = useState(undefined);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value));
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, settlementsList.length - page * rowsPerPage);
  const handleClose = () => {
    setOpen(false);
  };

  const handleCommit = async (params) => {
    setOpen(false);
    try {
      const updatedSettlement = await commitSettlement(params.settlementId, { participants: params.participants, startDate, endDate });
      let newSettlementList = settlementsList;
      if (updatedSettlement && updatedSettlement.id) {
        newSettlementList = [...settlementsList.filter(a => updatedSettlement.id !== a.id), updatedSettlement];
      }
      refreshGridHandler(newSettlementList);
    } catch (err) {
      window.alert('error while committing settlement')
    }
  };

  const showDetails = async (settlementId, participants) => {
    try {
      const settlementDetails = {
        settlementId, participants
      }
      setSettlementsDetails(settlementDetails);
      setOpen(true);
    } catch (err) {
      window.alert(`Error getting details: ${err}`);
    }
  };

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><h3>Settlement Id</h3></TableCell>
              <TableCell align="right"><h3>State</h3></TableCell>
              <TableCell align="right"><h3>Action</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {settlementsList.sort((a, b) => b.id - a.id).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(settlement => (
              <TableRow key={settlement.id}>
                <TableCell component="th" scope="row">
                  {settlement.id}
                </TableCell>
                <TableCell align="right">{settlement.state}</TableCell>
                <TableCell align="right" scope="row">
                  <Button variant='contained' color='primary' disabled={settlement.state !== 'PENDING_SETTLEMENT'} className={classes.button} onClick={() => showDetails(settlement.id, settlement.participants)}>
                    Commit
                  </Button>
                </TableCell>
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
                count={settlementsList.length}
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
        disableBackdropClick
        disableEscapeKeyDown
        onClose={handleClose}
        aria-labelledby="dialog-title"
        open={open}
      >
        <DialogTitle id="dialog-title" onClose={handleClose}>
          Commit Settlement
          </DialogTitle>
        <DialogContent>
          {settlementDetails && settlementDetails.participants && settlementDetails.participants.length > 0 &&
            <Grid item md={10}>
              <h2>Settlement ID: {settlementDetails.settlementId}</h2>
              {settlementDetails.participants.sort((a, b) => a.id > b.id).map((row, index) => (
                <Paper className={classes.paperDetails} key={row.id}>
                  <h3>Participant ID: {row.id}</h3>
                  <Table className={classes.tableDetails}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Account ID</TableCell>
                        <TableCell align="right">Currency</TableCell>
                        <TableCell align="right">Net Settlement Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.accounts.sort((a, b) => a.id > b.id).map((account, index) => (
                        <TableRow key={index}>
                          <TableCell align="left">{account.id}</TableCell>
                          <TableCell align="right">{account.netSettlementAmount.currency}</TableCell>
                          <TableCell align="right">{account.netSettlementAmount.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              ))}
            </Grid>
          }
          {!settlementDetails &&
            <Grid item md={12} > <Paper className={classes.detailsDialog} > <h2>No Details Found </h2></Paper></Grid>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCommit(settlementDetails)} >
            Commit
          </Button>
          <Button variant='contained' className={classes.button} onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

}

function SettlementsTab(props) {
  const { classes } = props;
  const to = truncateDate(new Date(Date.now() + 1000 * 60 * 60 * 24));
  const from = truncateDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 6));
  const [settlementsList, setSettlementsList] = useState(undefined);
  const [startDate, setStartDate] = useState(from);
  const [endDate, setEndDate] = useState(to);

  const updateQuery = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    getSettlementList({ startDate, endDate })
      .then(setSettlementsList)
      .catch(err => window.alert('Failed to get settlement list')); // TODO: better error message, let user retry
  };

  useEffect(() => updateQuery(from, to), []);

  return (
    <div className={classes.root}>
      {settlementsList === undefined ||
        <Grid container spacing={24}>
          <Grid item md={10}>
            <Paper className={classes.paper}>
              <DateRangePicker defStartDate={from} defEndDate={to} onChange={updateQuery} />
            </Paper>
          </Grid>
          <Grid item md={10}>
            <Paper className={classes.paper}>
              <SettlementsGrid settlementsList={settlementsList} classes={classes} endDate={endDate} startDate={startDate} refreshGridHandler={setSettlementsList} />
            </Paper>
          </Grid>
        </Grid>
      }
    </div>
  );
}

SettlementsTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettlementsTab);