import React from 'react';
import { action } from '@storybook/addon-actions';

import TablePaginationActions from '../components/TablePaginationActions';

export default {
  component: TablePaginationActions,
  title: 'TablePaginationActions',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// Props
const count = 20;
const onChangePage = action('onChangePage');
const page = 1;
const rowsPerPage = 10;

export const Default = () => (
  <TablePaginationActions
    count={count}
    onChangePage={onChangePage}
    page={page}
    rowsPerPage={rowsPerPage}
  />
);
