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
      ],
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<ForexRatesTable {...props} />);
    expect(rendered).toBeTruthy();
  });
});
