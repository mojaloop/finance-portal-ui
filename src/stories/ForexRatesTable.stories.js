import React from 'react';

import ForexRatesTable from '../components/ForexRatesTable';

export default {
  component: ForexRatesTable,
  title: 'ForexRatesTable',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// Props
const classes = {
  root: '',
};
const forexRates = [
  {
    currencyPair: 'eurusd',
    rate: '666.6667',
    startTime: '2019-09-03T12:00:00.000Z',
    endTime: '2019-09-04T12:00:00.000Z',
    reuse: true,
  },
  {
    currencyPair: 'eurusd',
    rate: '666.6680',
    startTime: '2019-09-04T12:00:00.000Z',
    endTime: '2019-09-05T12:00:00.000Z',
    reuse: true,
  },
  {
    currencyPair: 'usdeur',
    rate: '444.4430',
    startTime: '2019-09-03T12:00:00.000Z',
    endTime: '2019-09-04T12:00:00.000Z',
    reuse: true,
  },
];

export const Default = () => (
  <ForexRatesTable classes={classes} forexRates={forexRates} />
);
