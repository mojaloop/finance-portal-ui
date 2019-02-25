
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

import { DateRangePicker } from './DatePicker';
// import { getSettlements } from '../api';
import { truncateDate } from '../utils'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

// function SettlementsListList(props) {
//   // Participant ID
//   // Participant name
//   // Participant country
//   // Currency
//   const { fspList, settlements } = props;
//   // const returnSmallerDate = (pv, dt) => Math.min(new Date(dt.createdDate).getTime(), pv);
//   // const settlementStart = settlements.reduce((pv, s) => Math.min(pv, s.settlementWindows.reduce(returnSmallerDate, Infinity)), Infinity);
//   const participantInfo = p => `${fspList.ids[p.id]} ${p.accounts.map(a => a.netSettlementAmount.amount + a.netSettlementAmount.currency)}`;
//   return (
//     <>
//       {settlements.length === 0 ? "No settlements found" :
//           <List>
//             {settlements.map(settlement =>
//               <ListItem key={settlement.id}>
//                 <ListItemText>[{settlement.id}] | {settlement.state} | {settlement.participants.map(participantInfo).join(', ')}</ListItemText>
//               </ListItem>
//             )}
//           </List>
//       }
//     </>
//   )
// }

function NetDebitCapPanel(props) {
  const { fspList, selectedFsp } = props;

  const to = truncateDate(new Date(Date.now() + 1000 * 60 * 60 * 24));
  const from = truncateDate(new Date());
  const [settlements, setSettlements] = useState(undefined);

  // const updateQuery = (startDate, endDate) => {
    // getSettlements(selectedFsp, { startDate, endDate })
    //   .then(setSettlements)
    //   .catch(err => window.alert('Failed to get FSPS')); // TODO: better error message, let user retry
  // };

  // useEffect(() => updateQuery(from, to), []);

  return (
    <>
      <h2>NetDebitCap</h2>
      <TextField
        required
        id="outlined-required"
        label="Net Debit Cap"
        defaultValue="0"
        margin="normal"
        variant="outlined" />
      {/* {settlements && <SettlementsListList fspList={fspList} settlements={settlements} />} */}
    </>
  )
}

NetDebitCapPanel.propTypes = {
  fspList: PropTypes.array.isRequired,
  selectedFsp: PropTypes.number.isRequired
};

export default withStyles(styles) (NetDebitCapPanel);
