import React from 'react';
import { render } from '@testing-library/react';
import ForexRateEntry from '../components/ForexRateEntry';

describe('<ForexRateEntry />', () => {
  it('should render without crashing', () => {
    const rendered = render(<ForexRateEntry />);
    expect(rendered).toBeTruthy();
  });
});
