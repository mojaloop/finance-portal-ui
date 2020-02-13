import React from 'react';
import { render } from '@testing-library/react';
import ForexRateEntry from '../components/ForexRateEntry';

describe('<ForexRateEntry />', () => {
  it('should render without crashing', () => {
    const rendered = render(<ForexRateEntry />);
    expect(rendered).toBeTruthy();
  });
  it('should have a rate input field', async () => {
    const { findByText } = render(<ForexRateEntry />);
    const element = await findByText('Rate');
    expect(element).toBeDefined();
  });
  it('should have a start date input field', async () => {
    const { findByText } = render(<ForexRateEntry />);
    const element = await findByText('Start Date');
    expect(element).toBeDefined();
  });
  it('should display two end date options', async () => {
    const { findAllByText } = render(<ForexRateEntry />);
    const commitButtons = await findAllByText('Commit');
    expect(commitButtons).toHaveLength(2);
  });
});
