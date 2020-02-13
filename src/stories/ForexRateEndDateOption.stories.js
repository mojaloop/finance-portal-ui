import React from 'react';

import ForexRateEndDateOption from '../components/ForexRateEndDateOption';

export default {
  component: ForexRateEndDateOption,
  title: 'ForexRateEndDateOption',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// Props

export const Default = () => (
  <ForexRateEndDateOption />
);
