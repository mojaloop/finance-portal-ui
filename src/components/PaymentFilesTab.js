
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DateRangePicker } from './DatePicker';

import { triggerDownload } from '../requests';
import { getPaymentFileList } from '../api';
import { truncateDate } from '../utils';


// TODO: show file sizes. Would either need to return SELECT LENGTH(settlementFile) from query, or
// store that information in another column. Note that the db _does_ know the length of the data in
// every field; but there have been bugs raised in the past relating to the performance of the
// LENGTH function, suggesting it's reading the entire field unnecessarily.
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
    endDate = moment(endDate).add(1,'days').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
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
