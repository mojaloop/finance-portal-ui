import React from 'react';
import { render } from '@testing-library/react';
import 'core-js/features/array/flat';

import ForexRatesTab, {
  stringRateFromDecimalRateAndInteger,
} from '../components/ForexRatesTab';


describe('stringRateFromDecimalRateAndInteger(decimalRate, integer)', () => {
  it('should return a formatted rate string with proper decimal position and zero padding', () => {
    const decimalRate = 4;
    const integer = 6666680;
    const expected = '666.6680';
    const actual = stringRateFromDecimalRateAndInteger(decimalRate, integer);
    expect(actual).toEqual(expected);
  });
  it('should return a formatted rate string given 0.0001', () => {
    const decimalRate = 4;
    const integer = 1;
    const expected = '0.0001';
    const actual = stringRateFromDecimalRateAndInteger(decimalRate, integer);
    expect(actual).toEqual(expected);
  });
  it('should return a formatted rate string given 0.0123', () => {
      const decimalRate = 4;
      const integer = 0123;
      const expected = '0.0123';
      const actual = stringRateFromDecimalRateAndInteger(decimalRate, integer);
      expect(actual).toEqual(expected);
  });
  it('should return a formatted rate string given 0.1234', () => {
    const decimalRate = 4;
    const integer = 1234;
    const expected = '0.1234';
    const actual = stringRateFromDecimalRateAndInteger(decimalRate, integer);
    expect(actual).toEqual(expected);
  });
  it('should return a formatted rate string given 0.0099', () => {
    const decimalRate = 4;
    const integer = 99;
    const expected = '0.0099';
    const actual = stringRateFromDecimalRateAndInteger(decimalRate, integer);
    expect(actual).toEqual(expected);
  });
  it('should return a formatted rate string given 0.0999', () => {
    const decimalRate = 4;
    const integer = 999;
    const expected = '0.0999';
    const actual = stringRateFromDecimalRateAndInteger(decimalRate, integer);
    expect(actual).toEqual(expected);
  });
  it('should return a formatted rate string given 0.9999', () => {
    const decimalRate = 4;
    const integer = 9999;
    const expected = '0.9999';
    const actual = stringRateFromDecimalRateAndInteger(decimalRate, integer);
    expect(actual).toEqual(expected);
  });
  it('should return a formatted rate string given 0.99999', () => {
    const decimalRate = 5;
    const integer = 99999;
    const expected = '0.99999';
    const actual = stringRateFromDecimalRateAndInteger(decimalRate, integer);
    expect(actual).toEqual(expected);
  });
  it('should return a formatted rate string given 0.001', () => {
    const decimalRate = 4;
    const integer = 10;
    const expected = '0.0010';
    const actual = stringRateFromDecimalRateAndInteger(decimalRate, integer);
    expect(actual).toEqual(expected);
  });
  it('should return a formatted rate string given 0.01', () => {
    const decimalRate = 4;
    const integer = 100;
    const expected = '0.0100';
    const actual = stringRateFromDecimalRateAndInteger(decimalRate, integer);
    expect(actual).toEqual(expected);
  });
  it('should return a formatted rate string given 0.1', () => {
    const decimalRate = 4;
    const integer = 1000;
    const expected = '0.1000';
    const actual = stringRateFromDecimalRateAndInteger(decimalRate, integer);
    expect(actual).toEqual(expected);
  });
  it('should return a formatted rate string given 1', () => {
    const decimalRate = 4;
    const integer = 10000;
    const expected = '1.0000';
    const actual = stringRateFromDecimalRateAndInteger(decimalRate, integer);
    expect(actual).toEqual(expected);
  });
  it('should return a formatted rate string given 0', () => {
    const decimalRate = 4;
    const integer = 0;
    const expected = '0';
    const actual = stringRateFromDecimalRateAndInteger(decimalRate, integer);
    expect(actual).toEqual(expected);
  });
});

describe('<ForexRatesTab />', () => {
  it('should render without crashing', () => {
    const rendered = render(<ForexRatesTab />);
    expect(rendered).toBeTruthy();
  });
  it('should contain a forex rates table', async () => {
    const { findByText } = render(<ForexRatesTab />);
    const element = await findByText('Enabled');
    expect(element).toBeDefined();
  });
  // it('should contain a forex rate entry area', async () => {
  //   const { findByText } = render(<ForexRatesTab />);
  //   const element = await findByText('Sample Exchange Estimate');
  //   expect(element).toBeDefined();
  // });
  it('should fetch forex rates from the server', () => {
    const getRatesMock = jest.fn();
    render(<ForexRatesTab getRates={getRatesMock} />);
    expect(getRatesMock).toHaveBeenCalled();
  });
  it('should be show the confirm dialog when necessary', async () => {
    const { getByText } = render(<ForexRatesTab showConfirmDialog />);
    const element = await getByText('Warning');
    expect(element).toBeDefined();
  });
});
