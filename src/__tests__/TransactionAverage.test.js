import React from 'react';
import { render } from '@testing-library/react';
import TransactionAverage from '../components/TransactionAverage';

describe('<TransactionAverage />', () => {
  it('should render without crashing', () => {
    const props = {
      fsp: {},
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<TransactionAverage {...props} />);
    expect(rendered).toBeTruthy();
  });
});
