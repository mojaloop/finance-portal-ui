import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
  it('should render without crashing', () => {
    const rendered = render(<App />);
    expect(rendered).toBeTruthy();
  });

  it('should display the Financial Monitoring tab when it is selected', async () => {
    const { getByText, findByText } = render(<App storybookMode getUserInfo={() => ({})} />);
    fireEvent.click(getByText('Financial Monitoring'));
    const element = await findByText('An error occurred trying to get the FSP list. Retry?');
    expect(element).toBeDefined();
  });

  it('should display the Settlement Windows tab when it is selected', async () => {
    const { getByText } = render(<App storybookMode getUserInfo={() => ({})} />);
    fireEvent.click(getByText('Settlement Windows'));
    const divsWithSettlementTabClass = document.querySelectorAll('div[class^=SettlementWindowsTab]');
    expect(divsWithSettlementTabClass).toHaveLength(1);
  });

  it('should display the Administration tab when it is selected', async () => {
    const { getByText } = render(<App storybookMode getUserInfo={() => ({})} />);
    fireEvent.click(getByText('Administration'));
    const divsWithAdminTabClass = document.querySelectorAll('div[class^=AdminTab]');
    expect(divsWithAdminTabClass).toHaveLength(1);
  });

  it('should display the Transfer Verification tab when it is selected', async () => {
    const { getByText, findByText } = render(<App storybookMode getUserInfo={() => ({})} />);
    fireEvent.click(getByText('Transfer Verification'));
    const element = await findByText('Validate');
    expect(element).toBeDefined();
  });

  it('should display the Forex Rates tab when it is selected', async () => {
    const { getByText, findByText } = render(<App storybookMode getUserInfo={() => ({})} />);
    fireEvent.click(getByText('Forex Rates'));
    const element = await findByText('Forex Rates Tab');
    expect(element).toBeDefined();
  });
});
