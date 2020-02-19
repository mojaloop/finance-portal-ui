import React from 'react';

import ForexRatesTab from '../components/ForexRatesTab';

export default {
  component: ForexRatesTab,
  title: 'ForexRatesTab',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <ForexRatesTab />
);
