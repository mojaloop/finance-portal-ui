import React from 'react';
import { DateTime } from 'luxon';

import ForexRateEndDateOption from '../components/ForexRateEndDateOption';

export default {
  component: ForexRateEndDateOption,
  title: 'ForexRateEndDateOption',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// Props
const initialDate = DateTime.utc();

export const OneDay = () => (
  <ForexRateEndDateOption initialDate={initialDate} />
);

export const Weekend = () => (
  <ForexRateEndDateOption weekend initialDate={initialDate} />
);
