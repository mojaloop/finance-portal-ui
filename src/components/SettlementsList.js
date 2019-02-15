
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { DatePicker, dateToStr } from './DatePicker';
import { get } from '../requests';


function SettlementsListList(props) {
  // Participant ID
  // Participant name
  // Participant country
  // Currency
  const { fspList, settlements } = props;
  // const returnSmallerDate = (pv, dt) => Math.min(new Date(dt.createdDate).getTime(), pv);
  // const settlementStart = settlements.reduce((pv, s) => Math.min(pv, s.settlementWindows.reduce(returnSmallerDate, Infinity)), Infinity);
  const participantInfo = p => `${fspList.ids[p.id]} ${p.accounts.map(a => a.netSettlementAmount.amount + a.netSettlementAmount.currency)}`;
  return (
    <>
      {settlements.length === 0 ? "No settlements found" :
          <List>
            {settlements.map(settlement =>
              <ListItem key={settlement.id}>
                <ListItemText>[{settlement.id}] | {settlement.state} | {settlement.participants.map(participantInfo).join(', ')}</ListItemText>
              </ListItem>
            )}
          </List>
      }
    </>
  )
}

function SettlementsList(props) {
  const { fspList, selectedFsp } = props;

  const [endDate, setEndDate] = useState(dateToStr(new Date(Date.now() + 1000 * 60 * 60 * 24))); // tomorrow
  const [startDate, setStartDate] = useState(dateToStr(new Date()));
  const [settlements, setSettlements] = useState(undefined);

  const updateQuery = (startDate, endDate) => {
    // get(`payment-file-list?startDate=${startDate}&endDate=${endDate}`)
    get(`settlements/${selectedFsp}?fromDateTime=${startDate}&toDateTime=${endDate}`)
      .then(setSettlements)
      .catch(err => window.alert('Failed to get FSPS')); // TODO: better error message, let user retry
  };

  useEffect(() => updateQuery(startDate, endDate), []);

  return(
    <>
      <h2>Settlements</h2>
      <DatePicker defDate={startDate} selectDate={dt => { setStartDate(dt); updateQuery(dt, endDate); }} />
      <DatePicker defDate={endDate} selectDate={dt => { setEndDate(dt); updateQuery(startDate, dt); }} />
      {settlements && <SettlementsListList fspList={fspList} settlements={settlements} />}
    </>
  )
}

SettlementsList.propTypes = {
  fspList: PropTypes.array.isRequired,
  selectedFsp: PropTypes.number.isRequired
};

// TODO: material withstyles?
export default SettlementsList;
