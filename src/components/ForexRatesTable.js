import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import TablePaginationActions from './TablePaginationActions';

function ForexRatesTable(props) {
  const { classes, forexRates } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows = rowsPerPage
    - Math.min(rowsPerPage, forexRates.length - page * rowsPerPage);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell><h3>Rate</h3></TableCell>
            <TableCell><h3>Start Time</h3></TableCell>
            <TableCell><h3>End Time</h3></TableCell>
            <TableCell><h3>Reuse?</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forexRates
            // Sort by most recent endTime descending
            .sort((a, b) => (new Date(b.endTime)) - (new Date(a.endTime)))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((forexRate) => (
              <TableRow key={uid(forexRate)}>
                <TableCell>{forexRate.rate}</TableCell>
                <TableCell>{forexRate.startTime}</TableCell>
                <TableCell>{forexRate.endTime}</TableCell>
                <TableCell>
                  {String(forexRate.reuse).charAt(0).toUpperCase()
                  + String(forexRate.reuse).slice(1)}
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
              count={forexRates.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}

ForexRatesTable.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string, root: PropTypes.string, table: PropTypes.string,
  }).isRequired,
  forexRates: PropTypes.arrayOf(PropTypes.shape({
    currencyPair: PropTypes.string,
    rate: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    reuse: PropTypes.bool,
  })).isRequired,
};

export default ForexRatesTable;
