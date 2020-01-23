import React from 'react';
import { render } from '@testing-library/react';
import SettlementWindowsTab from '../components/SettlementWindowsTab';

describe('<SettlementWindowsTab />', () => {
  it('should render without crashing', () => {
    const rendered = render(<SettlementWindowsTab />);
    expect(rendered).toBeTruthy();
  });
});
