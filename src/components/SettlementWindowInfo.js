
import React from 'react';
import PropTypes from 'prop-types';

function SettlementWindowInfo(props) {
  const { positions, settlementWindow: { payments, receipts } } = props;
  return (
    <div className='current-window'>
      <div>Payments: {payments.numTransactions}</div>
      <div>Amount: {payments.senderAmount}</div>
      <div>Receipts: {receipts.numTransactions}</div>
      <div>Amount: {receipts.senderAmount}</div>
      {positions.map(p =>
        <div key={p.participantLimitId} className='position'>
          <div>Currency: {p.currency}</div>
          <div>Limit: {p.limit}</div>
          <div>Position: {p.position}</div>
        </div>
      )}
    </div>
  );
}

SettlementWindowInfo.propTypes = {
  positions: PropTypes.array.isRequired,
  settlementWindow: PropTypes.object.isRequired
};

export default SettlementWindowInfo;
