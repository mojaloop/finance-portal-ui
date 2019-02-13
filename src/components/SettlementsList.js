import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function SettlementsList(props) {
  // Participant ID
  // Participant name
  // Participant country
  // Currency
  const { fspList, settlements, selectedFsp } = props;
  const returnSmallerDate = (pv, dt) => Math.min(new Date(dt.createdDate).getTime(), pv);
  const settlementStart = settlements.reduce((pv, s) => Math.min(pv, s.settlementWindows.reduce(returnSmallerDate, Infinity)), Infinity);
  const participantInfo = p => `${fspList.ids[p.id]} ${p.accounts.map(a => a.netSettlementAmount.amount + a.netSettlementAmount.currency)}`;
  return (
    <>
    <List>
      {settlements.map(settlement =>
        <ListItem key={settlement.id}>
          <ListItemText>[{settlement.id}] | {settlement.state} | {settlement.participants.map(participantInfo).join(', ')}</ListItemText>
        </ListItem>
      )}
    </List>
    </>
  )
}

// TODO: material withstyles?
export default SettlementsList;
