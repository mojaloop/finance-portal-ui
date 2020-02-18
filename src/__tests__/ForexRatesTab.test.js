import React from 'react';
import { render } from '@testing-library/react';
import 'core-js/features/array/flat';

import {
  fxpResponseToForexRates,
  ForexRatesTab,
  stringRateFromDecimalRateAndInteger,
} from '../components/ForexRatesTab';

describe('fxpResponseToForexRates(response)', () => {
  it('should return a formatted array of forex lists given an FXP API response', () => {
    const response = {
      eurusd: [
        {
          rate: 6666667,
          decimalRate: 4,
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: true,
        },
        {
          rate: 6666680,
          decimalRate: 4,
          startTime: '2019-09-04T12:00:00.000Z',
          endTime: '2019-09-05T12:00:00.000Z',
          reuse: true,
        },
      ],
      usdeur:
        [
          {
            rate: 4444430,
            decimalRate: 4,
            startTime: '2019-09-03T12:00:00.000Z',
            endTime: '2019-09-04T12:00:00.000Z',
            reuse: true,
          },
        ],
    };
    const expected = [
      {
        currencyPair: 'eurusd',
        rate: '666.6667',
        startTime: '2019-09-03T12:00:00.000Z',
        endTime: '2019-09-04T12:00:00.000Z',
        reuse: true,
      },
      {
        currencyPair: 'eurusd',
        rate: '666.6680',
        startTime: '2019-09-04T12:00:00.000Z',
        endTime: '2019-09-05T12:00:00.000Z',
        reuse: true,
      },
      {
        currencyPair: 'usdeur',
        rate: '444.4430',
        startTime: '2019-09-03T12:00:00.000Z',
        endTime: '2019-09-04T12:00:00.000Z',
        reuse: true,
      },
    ];
    const actual = fxpResponseToForexRates(response);
    expect(actual).toEqual(expected);
  });
});

describe('stringRateFromDecimalRateAndInteger(decimalRate, integer)', () => {
  it('should return a formatted rate string with proper decimal position and zero padding', () => {
    const decimalRate = 4;
    const integer = 6666680;
    const expected = '666.6680';
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
    const element = await findByText('Reuse?');
    expect(element).toBeDefined();
  });
  it('should contain a forex rate entry area', async () => {
    const { findByText } = render(<ForexRatesTab />);
    const element = await findByText('Sample Exchange Estimate');
    expect(element).toBeDefined();
  });
});
