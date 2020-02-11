import React from 'react';
import { render } from '@testing-library/react';
import TablePaginationActions from '../components/TablePaginationActions';

describe('<TablePaginationActions />', () => {
  it('should render without crashing', () => {
    const props = {
      classes: {},
      count: 10,
      onChangePage: () => {},
      page: 1,
      rowsPerPage: 5,
      theme: { direction: '', palette: {}, spacing: {} },
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<TablePaginationActions {...props} />);
    expect(rendered).toBeTruthy();
  });
});
