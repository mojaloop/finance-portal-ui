import React from 'react';
import { render } from '@testing-library/react';
import AdminTab from '../components/AdminTab';

describe('<AdminTab />', () => {
  it('should render without crashing', () => {
    const rendered = render(<AdminTab />);
    expect(rendered).toBeTruthy();
  });
});
