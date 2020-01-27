import React from 'react';
import { render } from '@testing-library/react';
import ForexRatesTab from '../components/ForexRatesTab';

describe('<ForexRatesTab />', () => {
  it('should render without crashing', () => {
    const rendered = render(<ForexRatesTab />);
    expect(rendered).toBeTruthy();
  });
});
