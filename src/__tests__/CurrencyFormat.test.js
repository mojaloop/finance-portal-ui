import React from 'react';
import { render } from '@testing-library/react';
import CurrencyFormat from '../components/CurrencyFormat';

describe('<CurrencyFormat />', () => {
  it('should render without crashing', () => {
    const rendered = render(<CurrencyFormat />);
    expect(rendered).toBeTruthy();
  });
});
