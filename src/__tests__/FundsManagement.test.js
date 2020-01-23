import React from 'react';
import { render } from '@testing-library/react';
import FundsManagement from '../components/FundsManagement';

describe('<FundsManagement />', () => {
  it('should render without crashing', () => {
    const rendered = render(<FundsManagement />);
    expect(rendered).toBeTruthy();
  });
});
