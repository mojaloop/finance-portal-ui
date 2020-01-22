import React from 'react';
import { render } from '@testing-library/react';
import FinancialMonitoringTab from '../components/FinancialMonitoringTab';

describe('<FinancialMonitoringTab />', () => {
  it('should render without crashing', () => {
    const rendered = render(<FinancialMonitoringTab />);
    expect(rendered).toBeTruthy();
  });
});
