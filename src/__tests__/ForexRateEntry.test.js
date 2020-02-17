import React from 'react';
import { render } from '@testing-library/react';
import ForexRateEntry, { receivedAmount } from '../components/ForexRateEntry';

describe('receivedAmount(rate)', () => {
  it('should return the amount received in MAD', () => {
    const rate = 11.121;
    const expected = '556.05';
    const actual = receivedAmount(rate);
    expect(actual).toEqual(expected);
  });
  it('should round the returned amount to two decimal places', () => {
    const rate = 11.1211;
    const expected = '556.06';
    const actual = receivedAmount(rate);
    expect(actual).toEqual(expected);
  });
  it('should pad an integer returned amount to two decimal places', () => {
    const rate = 10;
    const expected = '500.00';
    const actual = receivedAmount(rate);
    expect(actual).toEqual(expected);
  });
  it('should pad a single decimal returned amount with a trailing zero', () => {
    const rate = 11.23;
    const expected = '561.50';
    const actual = receivedAmount(rate);
    expect(actual).toEqual(expected);
  });
});

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
  it('should display a sample calculation using the given rate', async () => {
    const { findByText } = render(<ForexRateEntry />);
    const element = await findByText('Sample Exchange Estimate');
    expect(element).toBeDefined();
  });
});
