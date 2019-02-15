
import React, { useState, useEffect } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DateRangePicker } from './DatePicker';

import { triggerDownload } from '../requests';
import { getPaymentFileList } from '../api';
import { truncateDate } from '../utils';


function PaymentFilesList(props) {
  const { paymentFileList } = props;

  return (
    <List>
    {paymentFileList.map(pf =>
      <ListItem key={pf.settlementFileId} button onClick={() => triggerDownload(`payment-file/${pf.settlementFileId}`)}>
        <ListItemText>[{pf.settlementFileId}] | [{pf.settlementId}] | [{pf.createdDate}]</ListItemText>
      </ListItem>
    )}
    </List>
  );
}


// TODO: show the user a spinner or something while the query is in progress
function PaymentFilesTab(props) {
  const endDate = truncateDate(new Date(Date.now() + 1000 * 60 * 60 * 24)); // tomorrow
  const startDate = truncateDate(new Date());
  const [paymentFileList, setPaymentFileList] = useState([]);

  const updateQuery = (startDate, endDate) => {
    getPaymentFileList({ startDate, endDate })
      .then(setPaymentFileList)
      .catch(err => window.alert('Failed to get payment file list')); // TODO: better error message, let user retry
  };

  useEffect(() => updateQuery(startDate, endDate), []);

  return (
    <>
      <DateRangePicker defStartDate={startDate} defEndDate={endDate} onChange={updateQuery} />
      <PaymentFilesList paymentFileList={paymentFileList} />
    </>
  );
}

export default PaymentFilesTab;
