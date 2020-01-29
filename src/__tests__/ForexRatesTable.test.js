import React from 'react';
import { render } from '@testing-library/react';
import ForexRatesTable from '../components/ForexRatesTable';

describe('<ForexRatesTable />', () => {
  it('should render without crashing', () => {
    const rendered = render(<ForexRatesTable />);
    expect(rendered).toBeTruthy();
  });
});
