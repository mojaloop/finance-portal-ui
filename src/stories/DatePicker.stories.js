import React from 'react';
import { action } from '@storybook/addon-actions';

import { DatePicker } from '../components/DatePicker';

export default {
  component: DatePicker,
  title: 'DatePicker',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// Constants
const epochFor24Jan2020 = 1579870320000;

// Props
const defDate = new Date(epochFor24Jan2020);
const desc = 'DatePicker Description';
const onChange = action('onChange');

export const Default = () => (
  <DatePicker
    defDate={defDate}
    desc={desc}
    onChange={onChange}
  />
);
