import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';

function SettlementWindowTransfersTab(props) {
  const { settlementWindowDetails, classes } = props;
  return settlementWindowDetails && settlementWindowDetails.participantAmount
  && settlementWindowDetails.participantAmount.length > 0 ? (
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
    )
    : null;
}

SettlementWindowTransfersTab.propTypes = {
  settlementWindowDetails: PropTypes.objectOf(PropTypes.shape).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default SettlementWindowTransfersTab;
