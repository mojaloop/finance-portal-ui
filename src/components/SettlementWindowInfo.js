import React from 'react';

function SettlementWindowInfo(props) {
  return (
    <div className="current-window">
      <div>Payments: {props.settlementWindow.payments.numTransactions}</div>
      <div>Amount: {props.settlementWindow.payments.senderAmount}</div>
      <div>Receipts: {props.settlementWindow.receipts.numTransactions}</div>
      <div>Amount: {props.settlementWindow.receipts.senderAmount}</div>
      {props.positions.map(p =>
        <div key={p.participantLimitId} className="position">
          <div>Currency: {p.currency}</div>
          <div>Limit: {p.limit}</div>
          <div>Position: {p.position}</div>
        </div>
      )}
    </div>
  );
}

export default SettlementWindowInfo;
