import React from 'react';
import { render } from '@testing-library/react';
import ForexRatesTable, { onlyCurrency } from '../components/ForexRatesTable';

describe('onlyCurrency(currencyPair)', () => {
  it('should return an array of rates with only the selected currencyPair', () => {
    const allCurrencies = [
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
    ];
    const actual = onlyCurrency(allCurrencies, 'eurusd');
    expect(actual).toEqual(expected);
  });
  it('should return the given array of rates when supplied a falsy currencyPair', () => {
    const allCurrencies = [
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
    const actual = onlyCurrency(allCurrencies, '');
    expect(actual).toEqual(expected);
  });
});

describe('<ForexRatesTable />', () => {
  const forexRates = [
    {
      currencyPair: 'eurusd',
      rate: '666.6667',
      startTime: '2019-09-03T12:00:00.000Z',
      endTime: '2019-09-04T12:00:00.000Z',
      forexProviderInfo: {
        citi: {
          baseCurrency: 'EUR',
          bidSpotRate: '10.5777',
          citiExchangeRateId: 2515,
          createdBy: 'admin',
          createdDate: '2020-06-08T15:44:28.264Z',
          currencyPair: 'EURUSD',
          exchangeRateId: 2520,
          invRatePrecision: 1,
          isTradable: true,
          isValid: true,
          midPrice: '0',
          offerSpotRate: '0',
          ratePrecision: 4,
          rateSetId: 43,
          tenor: 'TN',
          validUntilTime: '2020-06-09T08:30:00.000Z',
          valueDate: '0000-00-00',
        },
      },
      reuse: false,
    },
    {
      currencyPair: 'eurusd',
      rate: '666.6680',
      startTime: '2019-09-04T12:00:00.000Z',
      endTime: '2019-09-05T12:00:00.000Z',
      forexProviderInfo: {
        citi: {
          baseCurrency: 'EUR',
          bidSpotRate: '11.5777',
          citiExchangeRateId: 2515,
          createdBy: 'admin',
          createdDate: '2020-06-08T15:44:28.264Z',
          currencyPair: 'EURUSD',
          exchangeRateId: 2520,
          invRatePrecision: 1,
          isTradable: true,
          isValid: true,
          midPrice: '0',
          offerSpotRate: '0',
          ratePrecision: 4,
          rateSetId: 43,
          tenor: 'TN',
          validUntilTime: '2020-06-09T08:30:00.000Z',
          valueDate: '0000-00-00',
        },
      },
      reuse: false,
    },
    {
      currencyPair: 'usdeur',
      rate: '444.4430',
      startTime: '2019-09-03T12:00:00.000Z',
      endTime: '2019-09-04T12:00:00.000Z',
      forexProviderInfo: {
        citi: {
          baseCurrency: 'USD',
          bidSpotRate: '10.5777',
          citiExchangeRateId: 2515,
          createdBy: 'admin',
          createdDate: '2020-06-08T15:44:28.264Z',
          currencyPair: 'USDEUR',
          exchangeRateId: 2520,
          invRatePrecision: 1,
          isTradable: true,
          isValid: true,
          midPrice: '0',
          offerSpotRate: '0',
          ratePrecision: 4,
          rateSetId: 43,
          tenor: 'TN',
          validUntilTime: '2020-06-09T08:30:00.000Z',
          valueDate: '0000-00-00',
        },
      },
      reuse: false,
    },
    {
      currencyPair: 'usdeur',
      rate: '444.4431',
      startTime: '2019-09-03T12:00:00.000Z',
      endTime: '2019-09-04T12:00:00.000Z',
      forexProviderInfo: {
        citi: {
          baseCurrency: 'USD',
          bidSpotRate: '10.5777',
          citiExchangeRateId: 2515,
          createdBy: 'admin',
          createdDate: '2020-06-08T15:44:28.264Z',
          currencyPair: 'USDEUR',
          exchangeRateId: 2520,
          invRatePrecision: 1,
          isTradable: true,
          isValid: true,
          midPrice: '0',
          offerSpotRate: '0',
          ratePrecision: 4,
          rateSetId: 43,
          tenor: 'TN',
          validUntilTime: '2020-06-09T08:30:00.000Z',
          valueDate: '0000-00-00',
        },
      },
      reuse: false,
    },
    {
      currencyPair: 'usdeur',
      rate: '444.4432',
      startTime: '2019-09-03T12:00:00.000Z',
      endTime: '2019-09-04T12:00:00.000Z',
      forexProviderInfo: {
        citi: {
          baseCurrency: 'USD',
          bidSpotRate: '10.5777',
          citiExchangeRateId: 2515,
          createdBy: 'admin',
          createdDate: '2020-06-08T15:44:28.264Z',
          currencyPair: 'USDEUR',
          exchangeRateId: 2520,
          invRatePrecision: 1,
          isTradable: true,
          isValid: true,
          midPrice: '0',
          offerSpotRate: '0',
          ratePrecision: 4,
          rateSetId: 43,
          tenor: 'TN',
          validUntilTime: '2020-06-09T08:30:00.000Z',
          valueDate: '0000-00-00',
        },
      },
      reuse: false,
    },
  ];

  it('should render without crashing', () => {
    const props = {
      classes: {},
      forexRates,
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<ForexRatesTable {...props} />);
    expect(rendered).toBeTruthy();
  });
  it('should have a Bid Rate column', async () => {
    const props = {
      classes: {},
      forexRates,
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { findByText } = render(<ForexRatesTable {...props} />);
    const element = await findByText('Bid Rate');
    expect(element).toBeDefined();
  });
  it('should have a Start Datetime column', async () => {
    const props = {
      classes: {},
      forexRates,
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { findByText } = render(<ForexRatesTable {...props} />);
    const element = await findByText('Start Datetime');
    expect(element).toBeDefined();
  });
  it('should have an End Datetime column', async () => {
    const props = {
      classes: {},
      forexRates,
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { findByText } = render(<ForexRatesTable {...props} />);
    const element = await findByText('End Datetime');
    expect(element).toBeDefined();
  });
  it('should have a Reuse column', async () => {
    const props = {
      classes: {},
      forexRates,
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { findByText } = render(<ForexRatesTable {...props} />);
    const element = await findByText('Reuse?');
    expect(element).toBeDefined();
  });
});
