import React, { useState, useEffect } from 'react';
import './App.css';

function SettlementWindowInfo(props) {
  return (
    <div className="current-window">
      <div>Payments: {props.settlementWindow.payments.numTransactions}</div>
      <div>Amount: {props.settlementWindow.payments.senderAmount}</div>
      <div>Receipts: {props.settlementWindow.receipts.numTransactions}</div>
      <div>Amount: {props.settlementWindow.receipts.senderAmount}</div>
      {props.positions.map(p =>
        <div key={p.currency} className="position">
          <div>Currency: {p.currency}</div>
          <div>Limit: {p.limit}</div>
          <div>Position: {p.position}</div>
        </div>
      )}
    </div>
  );
}

const fetchOpts = {
  headers: {
    'accept': 'application/json'
  }
};

function App() {
  const [state, setState] = useState(undefined);
  // const [state, setState] = useState({
  //   window: {
  //     payments: { numTransactions: 5, senderAmount: 100 }, receipts: { numTransactions: 4, senderAmount: 200 }
  //   },
  //   positions: [{
  //     position: "1.00",
  //     limit: "10000.00",
  //     currency: "XOF",
  //     participantId: 4
  //   }]
  // });
  const fetchCurrentWindow = async () => {
    const newState = await fetch('http://localhost:3002/current-window/34', fetchOpts).then(res => res.json());
    console.log(newState);
    setState(newState);
  };
  useEffect(() => fetchCurrentWindow, []);
  return (
    <>
      <button onClick={fetchCurrentWindow}>Refresh</button>
      {state === undefined ? <></> : <SettlementWindowInfo settlementWindow={state.window} positions={state.positions} />}
    </>
  );
}

export default App;
