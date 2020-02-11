import React from 'react';
import { render } from '@testing-library/react';
import CurrencyFormat from '../components/CurrencyFormat';

describe('<CurrencyFormat />', () => {
  it('should render without crashing', () => {
    const props = {
      inputRef: () => {},
      onChange: () => {},
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<CurrencyFormat {...props} />);
    expect(rendered).toBeTruthy();
  });
});
