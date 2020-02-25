import React from 'react';
import { render } from '@testing-library/react';
import ForexRatesTable from '../components/ForexRatesTable';

describe('<ForexRatesTable />', () => {
  it('should render without crashing', () => {
    const props = {
      classes: {},
      forexRates: [
        {
          currencyPair: 'eurusd',
          rate: '666.6667',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'eurusd',
          rate: '666.6680',
          startTime: '2019-09-04T12:00:00.000Z',
          endTime: '2019-09-05T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4430',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4431',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4432',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
      ],
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<ForexRatesTable {...props} />);
    expect(rendered).toBeTruthy();
  });
  it('should have a Rate column', async () => {
    const props = {
      classes: {},
      forexRates: [
        {
          currencyPair: 'eurusd',
          rate: '666.6667',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'eurusd',
          rate: '666.6680',
          startTime: '2019-09-04T12:00:00.000Z',
          endTime: '2019-09-05T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4430',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4431',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4432',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
      ],
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { findByText } = render(<ForexRatesTable {...props} />);
    const element = await findByText('Rate');
    expect(element).toBeDefined();
  });
  it('should have a Start Datetime column', async () => {
    const props = {
      classes: {},
      forexRates: [
        {
          currencyPair: 'eurusd',
          rate: '666.6667',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'eurusd',
          rate: '666.6680',
          startTime: '2019-09-04T12:00:00.000Z',
          endTime: '2019-09-05T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4430',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4431',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4432',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
      ],
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { findByText } = render(<ForexRatesTable {...props} />);
    const element = await findByText('Start Datetime');
    expect(element).toBeDefined();
  });
  it('should have an End Datetime column', async () => {
    const props = {
      classes: {},
      forexRates: [
        {
          currencyPair: 'eurusd',
          rate: '666.6667',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'eurusd',
          rate: '666.6680',
          startTime: '2019-09-04T12:00:00.000Z',
          endTime: '2019-09-05T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4430',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4431',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4432',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
      ],
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { findByText } = render(<ForexRatesTable {...props} />);
    const element = await findByText('End Datetime');
    expect(element).toBeDefined();
  });
  it('should have a Reuse column', async () => {
    const props = {
      classes: {},
      forexRates: [
        {
          currencyPair: 'eurusd',
          rate: '666.6667',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'eurusd',
          rate: '666.6680',
          startTime: '2019-09-04T12:00:00.000Z',
          endTime: '2019-09-05T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4430',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4431',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
        {
          currencyPair: 'usdeur',
          rate: '444.4432',
          startTime: '2019-09-03T12:00:00.000Z',
          endTime: '2019-09-04T12:00:00.000Z',
          reuse: false,
        },
      ],
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { findByText } = render(<ForexRatesTable {...props} />);
    const element = await findByText('Reuse?');
    expect(element).toBeDefined();
  });
});
