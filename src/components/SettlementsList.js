import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';

import DateRangePicker from './DateRangePicker';
import { getSettlements, fetchTimeoutController } from '../api';
import { truncateDate } from '../utils';

function SettlementsListList(props) {
  // Participant ID
  // Participant name
  // Participant country
  // Currency
  const { fspNamesById, settlements } = props;
  // const returnSmallerDate = (pv, dt) => Math.min(new Date(dt.createdDate).getTime(), pv);
  // const settlementStart = settlements
  //   .reduce((pv, s) => Math.min(pv, s.settlementWindows
  //     .reduce(returnSmallerDate, Infinity)), Infinity);
  const participantInfo = (p) => `${fspNamesById[p.id]} ${p.accounts.map((a) => a.netSettlementAmount.amount + a.netSettlementAmount.currency)}`;
  return (
    <>
      {settlements.length === 0 ? 'No settlements found' : (
        <List>
          {settlements.map((settlement) => (
            <ListItem key={settlement.id}>
              <ListItemText>
                [
                {settlement.id}
                ] |
                {settlement.state}
                {' '}
                |
                {settlement.participants.map(participantInfo).join(', ')}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

function SettlementsList(props) {
  const { fspNamesById, fsp } = props;

  const [dates, setDates] = useState({
    from: truncateDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)),
    to: truncateDate(new Date(Date.now() + 1000 * 60 * 60 * 24)),
  });
  const [settlements, setSettlements] = useState(undefined);

  useEffect(() => {
    const ftc = fetchTimeoutController();
    getSettlements(fsp, dates, { ftc })
      .then(setSettlements)
      .catch(ftc.ignoreAbort())
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Failed to get settlement list', error);
        // eslint-disable-next-line no-alert
        window.alert('Failed to get settlement list');
      }); // TODO: better error message, let user retry
    return ftc.abortFn;
  }, [dates, fsp]);

  return (
    <>
      <h2>Settlements</h2>
      <DateRangePicker defStartDate={dates.from} defEndDate={dates.to} onChange={setDates} />
      {settlements && <SettlementsListList fspNamesById={fspNamesById} settlements={settlements} />}
    </>
  );
}

SettlementsListList.propTypes = {
  fspNamesById: PropTypes.shape({ id: PropTypes.string }).isRequired,
  settlements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    state: PropTypes.string,
    participants: PropTypes.array,
  })).isRequired,
};

SettlementsList.propTypes = {
  fspNamesById: PropTypes.shape({ id: PropTypes.string }).isRequired,
  fsp: PropTypes.number.isRequired,
};

export default SettlementsList;
