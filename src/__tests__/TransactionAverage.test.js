import React from 'react';
import { render } from '@testing-library/react';
import TransactionAverage from '../components/TransactionAverage';

describe('<TransactionAverage />', () => {
  it('should render without crashing', () => {
    const rendered = render(<TransactionAverage />);
    expect(rendered).toBeTruthy();
  });
});
