import React from 'react';
import { render } from '@testing-library/react';
import TablePaginationActions from '../components/TablePaginationActions';

describe('<TablePaginationActions />', () => {
  it('should render without crashing', () => {
    const rendered = render(<TablePaginationActions />);
    expect(rendered).toBeTruthy();
  });
});
