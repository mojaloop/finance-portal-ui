import React from 'react';

import ForexRatesTable from '../components/ForexRatesTable';

export default {
  component: ForexRatesTable,
  title: 'ForexRatesTable',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <ForexRatesTable />
);
