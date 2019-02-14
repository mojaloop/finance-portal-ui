
import React, { useState, useEffect } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { get, triggerDownload } from '../requests';


function PaymentFilesTab(props) {

  const [paymentFileList, setPaymentFileList] = useState([]);

  useEffect(() => {
    get('payment-file-list')
      .then(setPaymentFileList)
      .catch(err => window.alert('Failed to get FSPS')); // TODO: better error message, let user retry
  }, []);

  const downloadFile = settlementFileId => {
    triggerDownload(`payment-file/${settlementFileId}`);
  };

  return (
    <List>
    {paymentFileList.map(pf =>
      <ListItem key={pf.settlementFileId} button onClick={() => downloadFile(pf.settlementFileId)}>
        <ListItemText>[{pf.settlementFileId}] | [{pf.settlementId}] | [{pf.createdDate}]</ListItemText>
      </ListItem>
    )}
    </List>
  );
}

export default PaymentFilesTab;
