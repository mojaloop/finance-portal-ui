import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, withStyles,
} from '@material-ui/core';
import { uid } from 'react-uid';

import TablePaginationActions from './TablePaginationActions';

export const onlyCurrency = (forexRates, currencyPair) => {
  if (!currencyPair) {
    return forexRates;
  }
  return forexRates.filter((rate) => rate.currencyPair === currencyPair);
};

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

function ForexRatesTable(props) {
  const { classes, forexRates, currencyChannelFilter } = props;
  const singleChannelForexRates = onlyCurrency(forexRates, currencyChannelFilter);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows = rowsPerPage
    - Math.min(rowsPerPage, singleChannelForexRates.length - page * rowsPerPage);
  console.log(singleChannelForexRates)
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell><h3>currencyPair</h3></TableCell>
            <TableCell><h3>rateSetId</h3></TableCell>
            <TableCell><h3>Bid Rate</h3></TableCell>
            <TableCell><h3>Offer Rate</h3></TableCell>
            <TableCell><h3>Start Datetime</h3></TableCell>
            <TableCell><h3>End Datetime</h3></TableCell>
            <TableCell><h3>RateID</h3></TableCell>
            <TableCell><h3>Reuse?</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {singleChannelForexRates
            // Sort by most recent endTime descending
            .sort((a, b) => (new Date(b.endTime)) - (new Date(a.endTime)))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((forexRate) => (
              <TableRow key={uid(forexRate)}>
                <TableCell>{forexRate.forexProviderInfo.citi.currencyPair}</TableCell>
                <TableCell>{forexRate.forexProviderInfo.citi.rateSetId}</TableCell>
                <TableCell>{forexRate.forexProviderInfo.citi.offerSpotRate}</TableCell>
                <TableCell>{forexRate.rate}</TableCell>
                <TableCell>{forexRate.startTime}</TableCell>
                <TableCell>{forexRate.endTime}</TableCell>
                <TableCell>{forexRate.id}</TableCell>
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
              count={singleChannelForexRates.length}
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
  currencyChannelFilter: PropTypes.string,
};

ForexRatesTable.defaultProps = {
  currencyChannelFilter: '',
};

export default withStyles(styles)(ForexRatesTable);
