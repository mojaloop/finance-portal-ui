import React from 'react';

import ForexRateEntry from '../components/ForexRateEntry';

export default {
  component: ForexRateEntry,
  title: 'ForexRateEntry',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// Props

export const Default = () => (
  <ForexRateEntry />
);
